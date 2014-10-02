import ScoreDTO = require('./../dto/ScoreDTO')
import ScoreChords = require('./../model/ScoreChords')
import StaffSettings = require('./../model/StaffSettings')
import StaffHeight = require('./../model/StaffHeight')
import StaffWidth = require('./../model/StaffWidth')
import StaffManager = require('./../model/StaffManager')
import D3Model = require('./../model/D3Model')
import Clef = require('./../model/Clef')
import SvgStaffDef = require('./../model/SvgStaffDef')
import ViewScale = require('./../viewmodel/ViewScale')
import SvgDef = require('./../viewmodel/SvgDefDrawer')
import StaffDrawer = require('./../viewmodel/StaffDrawer')
import Scale = require('./../util/Scale')

class ScoreController {

  public static draw(data:ScoreDTO) {

    var settings:StaffSettings = new StaffSettings(data.option);

    var height:StaffHeight = new StaffHeight(
      settings.HEIGHT,
      settings.staffSpace,
      settings.lineSpace,
      settings.underlineSpace,
      true, //printMode,
      settings.hasPageNo,
      settings.staffType);

    var width:StaffWidth = new StaffWidth(
      settings.WIDTH,
      settings.BASE_CLEF_WIDTH,
      settings.barCount,
      settings.musicalTime,
      settings.hasClef,
      settings.hasKey,
      settings.hasBarNo);

    var viewScale:ViewScale = new ViewScale(settings);
    var scale:Scale = new Scale(settings.WIDTH, viewScale.viewWidth);
    var clef = Clef.GClef;
    var staffDef = new SvgStaffDef(settings.lineSpace, width.firstBarWidth, width.barWidth, settings.staffType);
    SvgDef.append(settings, scale, clef, staffDef);

    var chords = ScoreChords.factory(data.chords);
    var staffManager = new StaffManager(height, width);
    var d3Model = new D3Model(chords, staffManager);
    StaffDrawer.draw(scale, d3Model);
  }
}

export = ScoreController;
