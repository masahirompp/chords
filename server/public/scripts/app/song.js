(function() {
  'use strict';

  require.config({
    baseUrl: '/scripts'
  });

  require(['model/chords',
    'model/staffSettings',
    'model/staffHeight',
    'model/staffWidth',
    'model/staffPoint',
    'model/d3model',
    'model/svgClefDef',
    'model/svgStaffDef',
    'viewmodel/viewScale',
    'viewmodel/svgDef',
    'viewmodel/staffDrawer',
    'util/scale'
  ], function(Chords, Settings, Height, Width, Point, D3Model, ClefDef, StaffDef, ViewScale, SvgDef, StaffDrawer, Scale) {

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
    var point = new Point(height, width);
    var d3Model = new D3Model(chords, point);

    var drawer = new StaffDrawer(scale, d3Model);
    drawer.draw();

    return false;

  });

})();
