import ScoreDTO = require('./dto.score')
import ScoreChords = require('./model.scoreChords')
import StaffSettings = require('./model.staffSettings')
import StaffHeight = require('./model.staffHeight')
import StaffWidth = require('./model.staffWidth')
import StaffManager = require('./model.staffManager')
import D3Model = require('./model.d3model')
import Clef = require('./model.clef')
import SvgStaffDef = require('./model.svgStaffDef')
import ViewScale = require('./vm.viewScale')
import SvgDef = require('./vm.svgDef')
import StaffDrawer = require('./vm.staffDrawer')
import Scale = require('./util.scale')

export function draw(data:ScoreDTO):void {

  var settings:StaffSettings = new StaffSettings(); //nownow

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
  var svgDef = new SvgDef();
  svgDef.init(settings, scale, clef, staffDef);

  var chords = ScoreChords.factory(data.chords);
  var staffManager = new StaffManager(height, width);
  var d3Model = new D3Model(chords, staffManager);

  var drawer = new StaffDrawer(scale, d3Model);
  drawer.draw();
}
