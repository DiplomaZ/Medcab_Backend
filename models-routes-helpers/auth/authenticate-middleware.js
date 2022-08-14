const jwt = require("jsonwebtoken");
const secrets = require("../../secrets/secret");
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "No token provided" });
  }

  const [directive, token] = req.headers.authorization.split(" ");
  if (!directive || directive != "bearer") {
    res.status(401).json({
      message: "your prime directive is to fix your directive",
      hint:
        "add 'bearer ' (include the space) in the string preceding your token query (i.e. 'bearer eyJhbGciOiJIUzI...')",
    });
  }
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: `You sent us a bad token`,
          err: err,
          errmessage: err.message,
        });
      } else {
        req.decodedJwt = decodedToken;
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ message: `you dont have the token to access this` });
  }
};
