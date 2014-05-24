define(['model/chords',
  'model/staffSettings',
  'model/staffHeight',
  'model/staffWidth',
  'model/staffPointManager',
  'model/svgClefDef',
  'model/svgStaffDef',
  'viewmodel/svgDef'
], function(Chords, StaffSettings, Height, Width, StaffPointer, ClefDef, StaffDef, SvgDef) {
  'use strict';

  var songId = 20; // urlからsongIdを取得する
  var settings = new StaffSettings(); //nownow

  var chords = new Chords(songId);

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

  var staffPointer = new StaffPointer(height, width);
  var clefDef = new ClefDef();
  var staffDef = new StaffDef(settings.lineSpace, width.firstBarWidth, width.barWidth, settings.staffType);
  var svgDef = new SvgDef();
  svgDef.Init(settings, clefDef, staffDef);

  return false;

});
