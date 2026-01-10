const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,       
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },


    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔐 never return password by default
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      select: false,
    },

    otpExpires: {
      type: Date,
      select: false,
    },
    
    address: {
        type: String,
        required: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    addresses: [
      {
        name: String,
        lastName: String,
        email: String,
        contact: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    lastLoginAt: {
      type: Date,
    },
    
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Expires in 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);