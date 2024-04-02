// const User = require("../Models/userModel");
// const jwt = require("jsonwebtoken");

// module.exports.checkUser = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     try {
//       const decodedToken = jwt.verify(token, "JobBoard 2024 key");
//       const user = await User.findById(decodedToken.id);

//       if (user) {
//         res.json({ status: true, user: user.email });
//       } else {
//         res.json({ status: false });
//       }
//     } catch (err) {
//       res.json({ status: false });
//     }
//   } else {
//     res.json({ status: false });
//   }
// };
