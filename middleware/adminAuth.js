// middleware/adminAuth.js

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// Middleware function to authenticate admin actions
exports.adminAuth = (req, res, next) => {
  console.log(req.body);
  const { adminPassword } = req.body

  if (adminPassword === ADMIN_PASSWORD) next()
  else res.redirect('back')
}