const http = require('http');

const makeRequest = (path, method, body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: `/api/auth${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
            console.log("Raw response:", data);
          resolve({ success: false, message: "Response parsing failed" });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const runTest = async () => {
  try {
      console.log("Starting Reset Password Test...");
    // 1. Signup
    const signupData = {
      username: `resetuser_${Date.now()}`,
      email: `reset${Date.now()}@example.com`,
      password: 'passwordOld123',
      phone: '1234567890'
    };
    
    console.log("1. Creating User (Signup & Verify)...");
    const signupRes = await makeRequest('/signup', 'POST', signupData);
    
    if (!signupRes.success) {
        console.error("Signup failed", signupRes);
        return;
    }

    const verificationToken = signupRes.data.verificationToken;
    await makeRequest(`/verify/${verificationToken}`, 'GET');
    console.log("User verified.");

    // 2. Forgot Password
    console.log("\n2. Testing Forgot Password...");
    const forgotRes = await makeRequest('/forget-password', 'POST', {
        email: signupData.email
    });
    console.log("Forgot Password Response:", forgotRes);

    if (!forgotRes.success) {
        console.error("Forgot Password failed");
        return;
    }

    const resetToken = forgotRes.data.resetToken;
    if (!resetToken) {
        console.error("No reset token returned");
        return;
    }

    // 3. Reset Password
    console.log("\n3. Testing Reset Password...");
    const newPassword = "passwordNew456";
    const resetRes = await makeRequest(`/reset-password/${resetToken}`, 'POST', {
        password: newPassword
    });
    console.log("Reset Password Response:", resetRes);

    if (!resetRes.success) {
        console.error("Reset Password failed");
        return;
    }

    // 4. Login with OLD password
    console.log("\n4. Testing Login with OLD password (should fail)...");
    const loginOldRes = await makeRequest('/login', 'POST', {
        email: signupData.email,
        password: signupData.password
    });
    
    if (loginOldRes.success) {
        console.error("Login with OLD password SUCCEEDED (Should have failed!)");
        return;
    } else {
        console.log("Login with OLD password failed as expected.");
    }

    // 5. Login with NEW password
    console.log("\n5. Testing Login with NEW password (should succeed)...");
    const loginNewRes = await makeRequest('/login', 'POST', {
        email: signupData.email,
        password: newPassword
    });
    
    if (loginNewRes.success) {
        console.log("Login with NEW password SUCCEEDED!");
        console.log("\nSUCCESS: Reset Password flow verified!");
    } else {
        console.error("Login with NEW password FAILED", loginNewRes);
    }

  } catch (err) {
    console.error("Test Error:", err);
  }
};

runTest();
