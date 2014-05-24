define(['model/chords',
  'model/staffSettings',
  'model/staffHeight',
  'model/staffWidth',
  'model/staffPointManager',
  'model/svgClefDef',
  'model/svgStaffDef',
  'viewmodel/viewScale',
  'viewmodel/svgDef',
  'viewmodel/staffDrawer',
  'util/scale'
], function(Chords, Settings, Height, Width, Pointer, ClefDef, StaffDef, ViewScale, SvgDef, StaffDrawer, Scale) {
  'use strict';

  var songId = 20; // urlからsongIdを取得する
  var settings = new Settings(); //nownow

  var height = new Height(
    settings.height,
    settings.staffSpace,
    settings.lineSpace,
    settings.underlineSpace,
    true, //printMode,
    settings.hasPageNo,
    settings.staffType);

  var width = new Width(
    settings.width,
    settings.clefWidth,
    settings.barCount,
    settings.musicalTime,
    settings.hasClef,
    settings.hasKey,
    settings.hasBarNo);

  var viewScale = new ViewScale(settings);
  var scale = new Scale(settings.width, viewScale.viewWidth);
  var clefDef = new ClefDef();
  var staffDef = new StaffDef(settings.lineSpace, width.firstBarWidth, width.barWidth, settings.staffType);
  var svgDef = new SvgDef();
  svgDef.Init(settings, scale, clefDef, staffDef);

  var chords = new Chords(songId);
  var pointer = new Pointer(height, width);

  var drawer = new StaffDrawer(scale, chords, pointer);
  drawer.draw();

  return false;

});
