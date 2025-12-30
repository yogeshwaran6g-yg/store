const { Cashfree } = require("cashfree-pg");
require("dotenv").config();
console.log("Checking Cashfree SDK initialization...");
try {
  // Test SDK object
  // For v5.x, we instantiate to use PG methods on the instance
  const cashfree = new Cashfree(Cashfree.SANDBOX, "test", "test");
  if (typeof cashfree.PGCreateOrder === "function") {
    console.log("SUCCESS: Cashfree SDK is correctly imported and instance has PGCreateOrder method.");
  } else {
    console.error("FAILURE: Cashfree SDK instance does not have expected methods. Check version.");
  }
  // Check required ENV variables
  const requiredEnv = ["CASHFREE_CLIENT_ID", "CASHFREE_CLIENT_SECRET", "FRONTEND_URL"];
  requiredEnv.forEach((env) => {
    if (!process.env[env]) {
      console.warn(`WARNING: ${env} is not defined in .env`);
    } else {
      console.log(`OK: ${env} is defined.`);
    }
  });
  console.log("\nVerification complete. If SDK methods are present, the integration is ready for use with valid credentials.");
} catch (error) {
  console.error("ERROR during verification:", error.message);
}
