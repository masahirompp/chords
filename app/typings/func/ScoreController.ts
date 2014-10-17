import AjaxScore = require('./../data/AjaxScore');
import ScoreDTO = require('./../dto/ScoreDTO')
import ScoreChords = require('./../model/ScoreChords')
import StaffSettings = require('./../model/StaffSettings')
import StaffManager = require('./../model/StaffManager')
import D3Model = require('./../model/D3Model')
import SvgStaffDef = require('./../model/SvgStaffDef')
import ViewScale = require('./../viewmodel/ViewScale')
import SvgDrawer = require('./../viewmodel/SvgDefDrawer')
import StaffDrawer = require('./../viewmodel/StaffDrawer')
import SearchView = require('./../viewmodel/SearchView')

class ScoreController {

  public static draw(data:ScoreDTO) {

    var settings:StaffSettings = new StaffSettings(data.option);
    var viewScale:ViewScale = new ViewScale();
    var staffManager = new StaffManager(settings);
    var chords = ScoreChords.factory(data.chords);
    var d3Model = new D3Model(chords, staffManager);

    var staffDef = new SvgStaffDef(settings);
    SvgDrawer.append(viewScale, staffDef);
    StaffDrawer.draw(viewScale, d3Model);
  }

  public static search(keyword:string) {

    if(!keyword.match(/\S/)) {
      return;
    }

    AjaxScore.search(keyword)
      .then((data)=> {
        SearchView.drawResult(data);
        history.pushState(data, null, '/search/?q=' + encodeURI(keyword));
      })

  }
}

export = ScoreController;
