const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");

async function auth(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const staff = await Staff.findOne({
      _id: decodedToken._id,
      "accessTokens.token": token,
    }).exec();
    if (!staff) {
      throw new Error("Invalid token");
    }
    req.token = token;
    req.staff = staff;
    next();
  } catch (e) {
    res.status(401).send({
      error: true,
      message: "Please authentication",
    });
  }
}
module.exports = auth;
