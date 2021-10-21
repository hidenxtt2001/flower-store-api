const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("./role");

const staffSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
    trim: true,
    lowercase: true,
    validate(value) {
      return validator.isEmail(value);
    },
  },
  role: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      return validator.isStrongPassword(value, {
        minSymbols: 0,
      });
    },
  },
  url: {
    type: String,
    require: false,
    default: "",
  },
  accessTokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  refreshTokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

/**
 * Remove password and token from User model
 * before send it back
 *
 */
staffSchema.methods.toJSON = function () {
  const staffObject = this.toObject();
  delete staffObject.pincode;
  delete staffObject.accessTokens;
  delete staffObject.refreshTokens;
  delete staffObject.password;
  return staffObject;
};

/**
 * @param {String} email
 * @param {String} password
 * @returns {Staff} staff - staff object if there is an staff correspond deviceCode
 */
staffSchema.statics.findByCredentials = async function (email, password) {
  const staff = await Staff.findOne({ email: email });
  if (!staff) {
    throw new Error("The Staff does not exist");
  }
  const isMatchPassword = await bcrypt.compare(password, staff.password);
  if (!isMatchPassword) {
    throw new Error("Password is not correct");
  }
  return staff;
};

/**
 * Generate new token auth for staff
 *  @returns {String} token - the token auth
 */
staffSchema.methods.getNewAccessToken = async function () {
  const staff = this;
  const newToken = jwt.sign(
    { _id: staff._id.toString() },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30m",
    }
  );
  staff.accessTokens.push({ token: newToken });
  await staff.save();
  return newToken;
};

/**
 * Generate new token refresh for staff
 *  @returns {String} token - the token auth
 */
staffSchema.methods.getNewRefreshToken = async function () {
  const staff = this;
  const newToken = jwt.sign(
    { _id: staff._id.toString() },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  staff.refreshTokens.push({ token: newToken });
  await staff.save();
  return newToken;
};

staffSchema.statics.isRefreshTokenValid = async function (refreshToken) {
  try {
    const data = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const staff = await Staff.findOne({ _id: data._id }).exec();
    if (!staff) throw new Error("The Staff does not exist");
    const match = await Staff.find({
      _id: staff._id,
      refreshTokens: {
        $elemMatch: {
          token: refreshToken,
        },
      },
    }).exec();
    if (match.length === 0) throw new Error("Token is expire");
    return staff;
  } catch (e) {
    throw new Error(e.message);
  }
};

/**
 * Hash the password before save
 * only hash if password is modified
 */
staffSchema.pre("save", async function (next) {
  const staff = this;
  if (staff.isModified("password")) {
    staff.password = await bcrypt.hash(staff.password, 8);
  }
  next();
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
