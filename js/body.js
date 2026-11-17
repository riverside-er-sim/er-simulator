/* Anatomical body diagram: skin, organ and bone layers + clickable exam regions. Schematic, faceless. */
(function () {
'use strict';
const W = 240, CX = 120;
const mx = x => W - x;
function smooth(pts) { // closed Catmull-Rom → cubic Bézier
  const n = pts.length; let d = 'M' + pts[0][0] + ' ' + pts[0][1];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ' C' + c1.map(v => v.toFixed(1)).join(' ') + ' ' + c2.map(v => v.toFixed(1)).join(' ') + ' ' + p2[0] + ' ' + p2[1];
  }
  return d + 'Z';
}
// Viewer-left half (= patient's RIGHT side), neck to crotch
const HALF = [[111, 74], [109, 90], [96, 96], [80, 101], [69, 110], [64, 128], [61, 158], [57, 190], [52, 216], [48, 244], [44, 256], [40, 272], [45, 286], [54, 282], [58, 266], [62, 250], [68, 222], [73, 194], [77, 166], [81, 142], [82, 168], [84, 198], [82, 226], [80, 256], [82, 298], [87, 338], [90, 368], [89, 400], [93, 440], [96, 468], [88, 486], [92, 497], [113, 497], [112, 482], [110, 466], [110, 438], [112, 400], [112, 372], [116, 330], [118, 294]];
const OUTLINE = smooth(HALF.concat([[CX, 286]], HALF.slice().reverse().map(p => [mx(p[0]), p[1]])));
const HEAD = '<ellipse cx="120" cy="46" rx="23" ry="28"/>';
const both = (fn) => fn(x => x) + fn(mx);

function skinLayer() {
  return '<g class="ly-skin">' +
    '<path d="' + OUTLINE + '" class="skin"/>' + HEAD.replace('/>', ' class="skin"/>') +
    // ears and hairline (no facial features)
    '<ellipse cx="96" cy="48" rx="4" ry="8" class="skin"/><ellipse cx="144" cy="48" rx="4" ry="8" class="skin"/>' +
    '<path d="M97 38 Q100 16 120 17 Q140 16 143 38 Q134 26 120 27 Q106 26 97 38 Z" class="hair"/>' +
    both(m => '<path class="contour" d="M' + m(117) + ' 103 Q' + m(104) + ' 98 ' + m(88) + ' 104"/>' +   // collarbone
      '<path class="contour" d="M' + m(90) + ' 132 Q' + m(100) + ' 152 ' + m(117) + ' 146"/>' +          // chest
      '<path class="contour" d="M' + m(98) + ' 238 Q' + m(108) + ' 262 ' + m(118) + ' 278"/>' +          // groin crease
      '<path class="contour" d="M' + m(93) + ' 366 Q' + m(100) + ' 374 ' + m(108) + ' 366"/>' +          // knee
      '<path class="contour" d="M' + m(66) + ' 188 Q' + m(70) + ' 194 ' + m(74) + ' 190"/>') +            // elbow
    '<path class="contour" d="M120 150 L120 210"/><circle cx="120" cy="216" r="2" class="navel"/>' +
    '</g>';
}
function organLayer() {
  return '<g class="ly-org">' +
    '<path d="' + OUTLINE + '" class="ghost"/>' + HEAD.replace('/>', ' class="ghost"/>') +
    '<ellipse cx="120" cy="40" rx="18" ry="17" class="o-brain"/>' +
    '<path class="o-line" d="M120 24 L120 56 M108 32 q6 6 0 12 q-6 6 0 12 M132 32 q-6 6 0 12 q6 6 0 12"/>' +
    '<rect x="117" y="72" width="6" height="36" rx="3" class="o-trachea"/>' +
    '<path class="o-lung" d="M116 106 C98 100 86 124 86 154 C86 170 98 174 116 166 Z"/>' +
    '<path class="o-lung" d="M124 106 C142 100 154 124 154 154 C154 170 142 174 124 166 Z"/>' +
    '<ellipse cx="100" cy="208" rx="6" ry="11" class="o-kidney"/><ellipse cx="140" cy="208" rx="6" ry="11" class="o-kidney"/>' +
    '<path class="o-liver" d="M84 172 Q112 162 132 174 Q124 194 98 194 Q84 190 84 172 Z"/>' +
    '<path class="o-stomach" d="M130 176 Q154 170 156 188 Q154 206 136 204 Q126 196 132 186 Z"/>' +
    '<rect x="92" y="198" width="56" height="44" rx="16" class="o-gut"/>' +
    '<path class="o-line" d="M100 208 q10 -8 20 0 t20 0 M98 220 q11 -8 22 0 t22 0 M100 232 q10 -8 20 0 t20 0"/>' +
    '<ellipse cx="120" cy="260" rx="10" ry="8" class="o-bladder"/>' +
    '<path class="o-heart" d="M127 160 C114 151 109 144 109 137 C109 130 116 126 121 131 L127 136 L132 131 C137 126 144 130 144 137 C144 144 139 151 127 160 Z"/>' +
    '</g>';
}
function boneLayer() {
  let ribs = '', spine = '';
  for (let k = 0; k < 7; k++) { const y = 112 + k * 8; ribs += both(m => '<path class="b-rib" d="M' + m(118) + ' ' + y + ' C' + m(100) + ' ' + (y - 6) + ' ' + m(86) + ' ' + (y + 2) + ' ' + m(88) + ' ' + (y + 15) + '"/>'); }
  for (let y = 78; y < 268; y += 8) spine += '<rect x="116" y="' + y + '" width="8" height="6" rx="2" class="b-bone"/>';
  return '<g class="ly-bone">' +
    '<path d="' + OUTLINE + '" class="ghost"/>' + HEAD.replace('/>', ' class="ghost"/>') +
    '<ellipse cx="120" cy="42" rx="19" ry="22" class="b-bone"/><path class="b-bone" d="M107 56 Q120 76 133 56 Q120 64 107 56 Z"/>' +
    '<ellipse cx="112" cy="44" rx="4.5" ry="5" class="b-hole"/><ellipse cx="128" cy="44" rx="4.5" ry="5" class="b-hole"/>' +
    spine + ribs +
    '<rect x="116" y="104" width="8" height="52" rx="3" class="b-bone"/>' +
    both(m => '<path class="b-long" d="M' + m(117) + ' 101 Q' + m(102) + ' 96 ' + m(80) + ' 104"/>' +          // clavicle
      '<path class="b-long" d="M' + m(74) + ' 110 L' + m(68) + ' 186"/>' +                                       // humerus
      '<path class="b-thin" d="M' + m(64) + ' 192 L' + m(52) + ' 246 M' + m(70) + ' 194 L' + m(60) + ' 248"/>' + // radius/ulna
      '<path class="b-thin" d="M' + m(50) + ' 254 L' + m(45) + ' 276 M' + m(54) + ' 254 L' + m(51) + ' 280 M' + m(58) + ' 254 L' + m(57) + ' 276"/>' + // hand
      '<path class="b-long" d="M' + m(100) + ' 270 L' + m(98) + ' 364"/>' +                                      // femur
      '<circle cx="' + m(98) + '" cy="372" r="5" class="b-bone"/>' +                                             // kneecap
      '<path class="b-long" d="M' + m(100) + ' 380 L' + m(102) + ' 466"/><path class="b-thin" d="M' + m(93) + ' 382 L' + m(96) + ' 464"/>' + // tibia/fibula
      '<path class="b-thin" d="M' + m(100) + ' 474 L' + m(94) + ' 492 M' + m(104) + ' 474 L' + m(106) + ' 494"/>') + // foot
    '<path class="b-bone" d="M92 236 Q120 226 148 236 Q158 258 142 274 Q130 262 120 278 Q110 262 98 274 Q82 258 92 236 Z"/>' +
    '<circle cx="104" cy="262" r="5" class="b-hole"/><circle cx="136" cy="262" r="5" class="b-hole"/>' +
    '</g>';
}
const HIT = {
  armR: 'M80 101 L69 110 L64 128 L57 190 L48 244 L40 272 L45 286 L54 282 L62 250 L73 194 L81 142 L86 106 Z',
  legR: 'M80 256 L120 288 L116 330 L112 372 L110 438 L113 497 L88 497 L96 468 L89 400 L90 368 L82 298 Z',
  lungs: 'M84 104 Q120 94 156 104 L160 170 L80 170 Z',
  abdomen: 'M80 170 L160 170 L158 230 L82 230 Z',
  pelvis: 'M82 230 L158 230 L160 262 L120 288 L80 262 Z'
};
const mirrorPath = d => d.replace(/([ML]) ?(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/g, (s, c, x, y) => c + (W - x) + ' ' + y);
HIT.armL = mirrorPath(HIT.armR); HIT.legL = mirrorPath(HIT.legR);

function svg(layer, region) {
  const R = (k, shape) => region(k, shape);
  const layerSvg = layer === 'bones' ? boneLayer() : layer === 'organs' ? organLayer() : skinLayer();
  return '<svg class="body" viewBox="0 0 240 505" aria-label="Body diagram — click an area to examine">' +
    '<text x="10" y="18" class="side">R</text><text x="222" y="18" class="side">L</text>' + layerSvg +
    R('armR', '<path d="' + HIT.armR + '"/>') + R('armL', '<path d="' + HIT.armL + '"/>') +
    R('legR', '<path d="' + HIT.legR + '"/>') + R('legL', '<path d="' + HIT.legL + '"/>') +
    R('pelvis', '<path d="' + HIT.pelvis + '"/>') + R('abdomen', '<path d="' + HIT.abdomen + '"/>') +
    R('lungs', '<path d="' + HIT.lungs + '"/>') +
    R('heart', '<path d="M127 160 C114 151 109 144 109 137 C109 130 116 126 121 131 L127 136 L132 131 C137 126 144 130 144 137 C144 144 139 151 127 160 Z"/>') +
    R('neck', '<rect x="106" y="72" width="28" height="24" rx="8"/>') +
    R('head', '<ellipse cx="120" cy="46" rx="26" ry="31"/>') +
    '</svg>';
}
window.BODY = { svg: svg };
})();
