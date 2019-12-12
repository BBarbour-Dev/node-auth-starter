module.exports = function(req, res, title) {
  console.log(req.body);
  return res.render("pages/login", title);
};
