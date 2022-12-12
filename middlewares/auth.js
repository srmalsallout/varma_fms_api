const { verify } = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  // Parse REQ-HEADER
  // deletes checking otp hust check the [1 hour] token and update the password
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "unauthorized access" }); // Not Provided Token In header;
  }

  const [, token] = authHeader.split(" ");

  // Verify Token
  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "user is not authenticated" });
    }
    let { id, role } = decoded;

    req.user_id = id;
    req.role = role;
    next();
  });
};
