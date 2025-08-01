const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token, role: user.role });
};
