import AjaxScore = require('./../data/Ajax');
import ScoreDTO = require('./../dto/ScoreDTO')
import ScoreChords = require('./../model/ScoreChords')
import StaffSettings = require('./../model/StaffSettings')
import StaffManager = require('./../model/StaffManager')
import D3Model = require('./../model/D3Model')
import SvgStaffDef = require('./../model/SvgStaffDef')
import ViewScale = require('./../viewmodel/ViewScale')
import SvgDrawer = require('./../viewmodel/SvgDefDrawer')
import StaffDrawer = require('./../viewmodel/StaffDrawer')

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
}

export = ScoreController;
