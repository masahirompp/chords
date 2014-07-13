define(["require", "exports", 'express'], function(require, exports, express) {
  function index() {
    var router = new express.Router();

    router.get('/', function (req, res) {
      res.render('index.jade');
    });
    return router;
  }
  
  return index;
});
