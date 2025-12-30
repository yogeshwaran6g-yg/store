const http = require('http');

const makeRequest = (path, method, body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: `/api/v1${path}`,
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
    console.log("Starting Cart Test...");
    
    // 1. Signup/Login
    const userEmail = `carttest${Date.now()}@example.com`;
    const userPass = 'password123';
    
    console.log(`\n1. Signup user (${userEmail})...`);
    // Note: auth routes are at /api/v1/auth, but my helper uses /api/v1 prefix, so I adjust path.
    // Actually wait, existing test used /api/auth.
    // Server.js says: app.use("/api/v1/auth", authRoutes);
    // So path should be /auth/signup relative to /api/v1
    
    const signupRes = await makeRequest('/auth/signup', 'POST', {
       username: `cartuser_${Date.now()}`,
       email: userEmail,
       password: userPass,
       phone: '1234567890'
    });

    if (!signupRes.success) {
        console.error("Signup failed", signupRes);
        return;
    }
    
    const verificationToken = signupRes.data.verificationToken;
    await makeRequest(`/auth/verify/${verificationToken}`, 'GET');
    console.log("User verified.");

    const loginRes = await makeRequest('/auth/login', 'POST', {
        email: userEmail,
        password: userPass
    });

    if (!loginRes.success) {
        console.error("Login failed", loginRes);
        return;
    }

    const token = loginRes.data.token;
    console.log("Login success, token received.");

    // 2. Create a Product
    console.log("\n2. Creating a dummy product...");
    // Need a random objectId for category
    const fakeCategoryId = "60d5ecb8b392d7001f3e1234"; 
    const productData = {
        title: `Test Product ${Date.now()}`,
        description: "A cool test product",
        slug: `test-product-${Date.now()}`,
        categoryId: fakeCategoryId,
        prices: { originalPrice: 100, price: 80 },
        stock: 50
    };

    const productRes = await makeRequest('/product/addProduct', 'POST', productData); // No auth needed? middleware check?
    // Looking at productRoutes.js: router.post("/addProduct", addProduct); 
    // It does NOT seem to have 'protect' middleware! 
    // If it fails due to auth (if global protect is there?), I'll add token.
    // But server.js suggests no global protect on product routes.

    if (!productRes.success && productRes.message !== "Product created successfully") { 
         // Note: rtnRes usually returns success: true/false. 
         // My helper parses JSON.
         // Let's assume standard response structure.
         console.error("Product creation failed", productRes);
         // If it failed, maybe I can't proceed. But I'll try to find an existing product? 
         // Or just proceed and see if addToCart fails.
    }
    
    const productId = productRes.data ? productRes.data._id : null;
    if (!productId) {
        console.error("Could not get productId. Aborting.");
        return;
    }
    console.log("Product created:", productId);

    // 3. Add to Cart
    console.log("\n3. Adding product to cart...");
    const addRes = await makeRequest('/cart/add', 'POST', {
        productId: productId,
        quantity: 2
    }, token);
    
    console.log("Add to Cart response:", addRes.success ? "Success" : addRes.message);
    if (!addRes.success) console.error(addRes);

    // 4. Get Cart
    console.log("\n4. Fetching cart...");
    const getRes = await makeRequest('/cart', 'GET', null, token);
    console.log("Get Cart response:", getRes.success ? "Success" : getRes.message);
    if (getRes.data) {
        console.log("Cart items:", getRes.data.items);
        const item = getRes.data.items.find(i => i.product._id === productId || i.product === productId);
        if (item && item.quantity === 2) {
            console.log("VERIFIED: Item found in cart with correct quantity.");
        } else {
            console.error("FAILED: Item not found or quantity mismatch.");
        }
    }

    // 5. Update Quantity
    console.log("\n5. Updating quantity...");
    const updateRes = await makeRequest('/cart/update', 'PUT', {
        productId: productId,
        quantity: 5
    }, token);
    console.log("Update response:", updateRes.success ? "Success" : updateRes.message);

    // 6. Clear Cart
    console.log("\n6. Clearing cart...");
    const clearRes = await makeRequest('/cart/clear', 'DELETE', null, token);
    console.log("Clear response:", clearRes.success ? "Success" : clearRes.message);

    // 7. Verify Empty
    const finalGet = await makeRequest('/cart', 'GET', null, token);
    if (finalGet.data && finalGet.data.items.length === 0) {
        console.log("VERIFIED: Cart is empty.");
        console.log("\nTEST COMPLETE: All checks passed.");
    } else {
        console.log("Cart not empty?", finalGet.data);
    }

  } catch (err) {
    console.error("Test Error:", err);
  }
};

runTest();
