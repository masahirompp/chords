define(["require", "exports", 'express', '../db/model'], function(require, exports, express, model) {
  function song() {
    var router = new express.Router();
    var Model = model.getIncetance();
    var Song = Model.createSong();

    router.get('/', function (req, res) {
      res.render('songlist.jade');
    });
    router.get('/list', function (req, res) {
      Song.find({}, function (err, result) {
        if (err) {
          res.send({
            'error': 'An error has occurred'
          });
        } else {
          console.log('Success');
          res.json(result);
        }
      });
    });
    router.get('/:id', function (req, res) {
      Song.find({
        songID: req.params.id
      }, function (err, result) {
        if (err) {
          res.send({
            'error': 'An error has occurred'
          });
        } else {
          console.log('Success: ' + result);
          res.json(result);
        }
      });
    });
    router.post('/', function (req, res) {
      res.send('new song');
    });
    router.put('/:id', function (req, res) {
      res.send('update ' + req.params.id);
    });
    router.del('/:id', function (req, res) {
      res.send('delete ' + req.params.id);
    });

    return router;
  }
  
  return song;
});
