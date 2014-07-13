define(["require", "exports", 'express'], function(require, exports, express) {
  function user() {
    var router = new express.Router();

    router.get('/', function (req, res) {
      res.send('respond with a resource');
    });

    return router;
  }
  
  return user;
});
