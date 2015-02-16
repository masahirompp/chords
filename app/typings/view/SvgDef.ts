/// <reference path="../../../tsd/d3/d3.d.ts" />

import Util = require('../util/Util');
import SvgGClef = require('../data/SvgGClef');
import SvgFClef = require('../data/SvgFClef');
import SvgSharp = require('../data/SvgSharp');
import SvgFlat = require('../data/SvgFlat');
import SvgScale = require('./SvgScale');
import Staff = require('../model/Staff');

function useClefs(settings: Staff.IStaffSetting) {
  return _.map(Staff.useClefs(settings), clef => Util.plucker(clef)({
    G: SvgGClef,
    F: SvgFClef
  }));
}

/**
 * SVG定義の更新処理
 * @param $defs
 * @param browserWidth
 * @return {function(Staff.IStaffSetting, Staff.ITrackInfo): {force: (function(): undefined), updateBar: (function(IStaffSetting, ITrackInfo): undefined), updateClefDef: (function(IStaffSetting): undefined)}}
 */
export function update($defs: D3.Selection, browserWidth: number) {

  var calc = SvgScale.floor(browserWidth, Staff.A4.WIDTH, 2);

  return function(settings: Staff.IStaffSetting, trackInfo: Staff.ITrackInfo) {
    var clefs = useClefs(settings);

    /**
     * 音記号の定義の更新処理
     * @param settings
     */
    function updateClefDef(settings: Staff.IStaffSetting) {
      var $selection = $defs.selectAll('g.clef')
        .data(clefs);

      // enter
      $selection
        .enter()
        .append('g')
        .attr({
          class: 'clef'
        })
        .append('path')
        .attr({
          fill: 'black',
          stroke: 'none'
        });

      // enter + update
      $selection.selectAll('g')
        .attr({
          id: d => d.id,
          transform: d => 'translate(0,' + calc(d.offset) + '),scale(' + calc(d.scale) + ')'
        })
        .selectAll('path')
        .attr({
          d: d => d.path
        });

      // exit(不要なDefは消す)
      $selection.exit()
        .remove();
    }

    /**
     * 小節の定義の更新処理
     * @param settings
     * @param trackInfo
     */
    function updateBar(settings: Staff.IStaffSetting, trackInfo: Staff.ITrackInfo) {

      var firstBarWidth = Staff.firstBarWidth(settings, trackInfo)(_.first(clefs));
      var barWidth = Staff.barWidth(settings, trackInfo)(_.first(clefs));
      var lineYs = Staff.defLineYs(settings);

      /* ---------------- first bar ---------------- */
      var $firstBar = $defs.selectAll('#firstBar')
        .data(['firstBar']);
      updateLine($firstBar, lineYs, firstBarWidth);

      /* ---------------- clef ---------------- */
      var $clefs = $firstBar.selectAll('use')
        .data(clefs);
      // enter
      $clefs.enter()
        .append('use')
        .attr('class', 'clef');
      // exit
      $clefs.exit()
        .remove();
      // enter + update
      $clefs.attr({
        'xlink:href': d => '#' + d.id
      });

      /* ---------------- signatures ---------------- */
      // TODO

      /* ---------------- musicalTime ---------------- */
      // TODO

      /* ---------------- bar ---------------- */
      var $bar = $defs.selectAll('#bar')
        .data(['bar']);
      updateLine($bar, lineYs, barWidth);
    }

    return {
      force: function() {
        updateClefDef(settings);
        updateBar(settings, trackInfo);
      },
      updateBar: updateBar,
      updateClefDef: updateClefDef
    };
  };

  /**
   * 音線の定義の更新処理
   * @param $bar 小節のD3オブジェクト
   * @param lineYs 音線のY座標の一覧
   * @param lineWidth 音線の幅
   */
  function updateLine($bar: D3.UpdateSelection, lineYs: number[], lineWidth: number) {

    // bar enter
    $bar.enter()
      .append('g')
      .attr({
        id: _.identity
      });

    // line data
    var $lines = $bar.selectAll('line.staff_line')
      .data(lineYs);

    // line enter
    $lines.enter()
      .append('line')
      .attr({
        stroke: 'black',
        class: 'staff_line'
      });

    // line exit
    $lines.exit()
      .remove();

    // line enter + update
    $lines.attr({
      x1: d => calc(0),
      x2: d => calc(lineWidth),
      y1: d => calc(d.y),
      y2: d => calc(d.y)
    });
  }
}