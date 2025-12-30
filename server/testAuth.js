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
      console.log("Starting Auth Test...");
    // 1. Signup
    const signupData = {
      username: `testuser_${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      phone: '1234567890'
    };
    
    console.log("1. Testing Signup...");
    const signupRes = await makeRequest('/signup', 'POST', signupData);
    console.log("Signup Response:", signupRes);

    if (!signupRes.success) {
        console.error("Signup failed");
        return;
    }

    const verificationToken = signupRes.data.verificationToken;
    if(!verificationToken) {
        console.error("No verification token returned (check controller logic)");
        return;
    }

    // 2. Verify
    console.log("\n2. Testing Verification...");
    const verifyRes = await makeRequest(`/verify/${verificationToken}`, 'GET');
    console.log("Verification Response:", verifyRes);

    if (!verifyRes.success) {
        console.error("Verification failed");
        return;
    }

    // 3. Login
    console.log("\n3. Testing Login...");
    const loginRes = await makeRequest('/login', 'POST', {
        email: signupData.email,
        password: signupData.password
    });
    console.log("Login Response:", loginRes);

    if (!loginRes.success) {
        console.error("Login failed");
        return;
    }

    const token = loginRes.data.token;
    
    // 4. Protected Route
    console.log("\n4. Testing Protected Route (/me)...");
    const meRes = await makeRequest('/me', 'GET', null, token);
    console.log("Me Response:", meRes);

    if (meRes.success) {
        console.log("\nSUCCESS: All auth flows verified!");
    } else {
        console.error("\nProtected route access failed");
    }

  } catch (err) {
    console.error("Test Error:", err);
  }
};

runTest();
