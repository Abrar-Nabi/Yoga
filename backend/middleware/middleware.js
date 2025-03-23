const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};

exports.verifyAdmin = (req, res, next) => {
  this.verifyUser(req, res, () => {
    if (req.user.role === "admin") next();
    else res.status(403).json({ error: "Admin access required" });
  });
};
