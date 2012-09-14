
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log("req.query : ", req.query);
  var user = req.query.user;
  res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
  res.cookie('user', user);
  res.render('index', { title: 'fake client' });
};
