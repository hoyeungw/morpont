'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var acq = require('@acq/acq');
var convert = require('@analys/convert');
var enumMutabilities = require('@analys/enum-mutabilities');
var enumTabularTypes = require('@analys/enum-tabular-types');
var abbrFin = require('@glossa/abbr-fin');
var enumFin = require('@glossa/enum-fin');
var phrasing = require('@spare/phrasing');
var translator = require('@spare/translator');
var Init = require('@vect/vector-init');
var Merge = require('@vect/vector-merge');
var dashedDate = require('@valjoux/dashed-date');
var timestamp$1 = require('@valjoux/timestamp');

function _defineProperty$8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const BASE = 'https://www.alphavantage.co/query';

const ITALIC$1 = 'italic';
const INVERSE$1 = 'inverse';

const swap = function (i, j) {
  const temp = this[i];
  this[i] = this[j];
  return this[j] = temp;
};

const NUM_DESC = (a, b) => b - a;

const max$1 = (a, b) => a > b ? a : b;

const min = (a, b) => a < b ? a : b;

const {
  random
} = Math;

const rand = l => ~~(random() * l);
/**
 * From [min, max] return a random integer.
 * Of [min, max], both min and max are inclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(inclusive) - int
 * @returns {number} int
 */


const randBetw = (lo, hi) => rand(++hi - lo) + lo;

const flopIndex = ar => rand(ar.length);

const flop = ar => ar[flopIndex(ar)];

const Amber = {
  base: '#FFC107',
  lighten_5: '#FFF8E1',
  lighten_4: '#FFECB3',
  lighten_3: '#FFE082',
  lighten_2: '#FFD54F',
  lighten_1: '#FFCA28',
  darken_1: '#FFB300',
  darken_2: '#FFA000',
  darken_3: '#FF8F00',
  darken_4: '#FF6F00',
  accent_1: '#FFE57F',
  accent_2: '#FFD740',
  accent_3: '#FFC400',
  accent_4: '#FFAB00'
};
const Blue = {
  base: '#2196F3',
  lighten_5: '#E3F2FD',
  lighten_4: '#BBDEFB',
  lighten_3: '#90CAF9',
  lighten_2: '#64B5F6',
  lighten_1: '#42A5F5',
  darken_1: '#1E88E5',
  darken_2: '#1976D2',
  darken_3: '#1565C0',
  darken_4: '#0D47A1',
  accent_1: '#82B1FF',
  accent_2: '#448AFF',
  accent_3: '#2979FF',
  accent_4: '#2962FF'
};
const Cyan = {
  base: '#00BCD4',
  lighten_5: '#E0F7FA',
  lighten_4: '#B2EBF2',
  lighten_3: '#80DEEA',
  lighten_2: '#4DD0E1',
  lighten_1: '#26C6DA',
  darken_1: '#00ACC1',
  darken_2: '#0097A7',
  darken_3: '#00838F',
  darken_4: '#006064',
  accent_1: '#84FFFF',
  accent_2: '#18FFFF',
  accent_3: '#00E5FF',
  accent_4: '#00B8D4'
};
const DeepOrange = {
  base: '#FF5722',
  lighten_5: '#FBE9E7',
  lighten_4: '#FFCCBC',
  lighten_3: '#FFAB91',
  lighten_2: '#FF8A65',
  lighten_1: '#FF7043',
  darken_1: '#F4511E',
  darken_2: '#E64A19',
  darken_3: '#D84315',
  darken_4: '#BF360C',
  accent_1: '#FF9E80',
  accent_2: '#FF6E40',
  accent_3: '#FF3D00',
  accent_4: '#DD2C00'
};
const DeepPurple = {
  base: '#673AB7',
  lighten_5: '#EDE7F6',
  lighten_4: '#D1C4E9',
  lighten_3: '#B39DDB',
  lighten_2: '#9575CD',
  lighten_1: '#7E57C2',
  darken_1: '#5E35B1',
  darken_2: '#512DA8',
  darken_3: '#4527A0',
  darken_4: '#311B92',
  accent_1: '#B388FF',
  accent_2: '#7C4DFF',
  accent_3: '#651FFF',
  accent_4: '#6200EA'
};
const Green = {
  base: '#4CAF50',
  lighten_5: '#E8F5E9',
  lighten_4: '#C8E6C9',
  lighten_3: '#A5D6A7',
  lighten_2: '#81C784',
  lighten_1: '#66BB6A',
  darken_1: '#43A047',
  darken_2: '#388E3C',
  darken_3: '#2E7D32',
  darken_4: '#1B5E20',
  accent_1: '#B9F6CA',
  accent_2: '#69F0AE',
  accent_3: '#00E676',
  accent_4: '#00C853'
};
const Indigo = {
  base: '#3F51B5',
  lighten_5: '#E8EAF6',
  lighten_4: '#C5CAE9',
  lighten_3: '#9FA8DA',
  lighten_2: '#7986CB',
  lighten_1: '#5C6BC0',
  darken_1: '#3949AB',
  darken_2: '#303F9F',
  darken_3: '#283593',
  darken_4: '#1A237E',
  accent_1: '#8C9EFF',
  accent_2: '#536DFE',
  accent_3: '#3D5AFE',
  accent_4: '#304FFE'
};
const LightBlue = {
  base: '#03A9F4',
  lighten_5: '#E1F5FE',
  lighten_4: '#B3E5FC',
  lighten_3: '#81D4FA',
  lighten_2: '#4FC3F7',
  lighten_1: '#29B6F6',
  darken_1: '#039BE5',
  darken_2: '#0288D1',
  darken_3: '#0277BD',
  darken_4: '#01579B',
  accent_1: '#80D8FF',
  accent_2: '#40C4FF',
  accent_3: '#00B0FF',
  accent_4: '#0091EA'
};
const LightGreen = {
  base: '#8BC34A',
  lighten_5: '#F1F8E9',
  lighten_4: '#DCEDC8',
  lighten_3: '#C5E1A5',
  lighten_2: '#AED581',
  lighten_1: '#9CCC65',
  darken_1: '#7CB342',
  darken_2: '#689F38',
  darken_3: '#558B2F',
  darken_4: '#33691E',
  accent_1: '#CCFF90',
  accent_2: '#B2FF59',
  accent_3: '#76FF03',
  accent_4: '#64DD17'
};
const Lime = {
  base: '#CDDC39',
  lighten_5: '#F9FBE7',
  lighten_4: '#F0F4C3',
  lighten_3: '#E6EE9C',
  lighten_2: '#DCE775',
  lighten_1: '#D4E157',
  darken_1: '#C0CA33',
  darken_2: '#AFB42B',
  darken_3: '#9E9D24',
  darken_4: '#827717',
  accent_1: '#F4FF81',
  accent_2: '#EEFF41',
  accent_3: '#C6FF00',
  accent_4: '#AEEA00'
};
const Orange = {
  base: '#FF9800',
  lighten_5: '#FFF3E0',
  lighten_4: '#FFE0B2',
  lighten_3: '#FFCC80',
  lighten_2: '#FFB74D',
  lighten_1: '#FFA726',
  darken_1: '#FB8C00',
  darken_2: '#F57C00',
  darken_3: '#EF6C00',
  darken_4: '#E65100',
  accent_1: '#FFD180',
  accent_2: '#FFAB40',
  accent_3: '#FF9100',
  accent_4: '#FF6D00'
};
const Pink = {
  base: '#E91E63',
  lighten_5: '#FCE4EC',
  lighten_4: '#F8BBD0',
  lighten_3: '#F48FB1',
  lighten_2: '#F06292',
  lighten_1: '#EC407A',
  darken_1: '#D81B60',
  darken_2: '#C2185B',
  darken_3: '#AD1457',
  darken_4: '#880E4F',
  accent_1: '#FF80AB',
  accent_2: '#FF4081',
  accent_3: '#F50057',
  accent_4: '#C51162'
};
const Purple = {
  base: '#9C27B0',
  lighten_5: '#F3E5F5',
  lighten_4: '#E1BEE7',
  lighten_3: '#CE93D8',
  lighten_2: '#BA68C8',
  lighten_1: '#AB47BC',
  darken_1: '#8E24AA',
  darken_2: '#7B1FA2',
  darken_3: '#6A1B9A',
  darken_4: '#4A148C',
  accent_1: '#EA80FC',
  accent_2: '#E040FB',
  accent_3: '#D500F9',
  accent_4: '#AA00FF'
};
const Red = {
  base: '#F44336',
  lighten_5: '#FFEBEE',
  lighten_4: '#FFCDD2',
  lighten_3: '#EF9A9A',
  lighten_2: '#E57373',
  lighten_1: '#EF5350',
  darken_1: '#E53935',
  darken_2: '#D32F2F',
  darken_3: '#C62828',
  darken_4: '#B71C1C',
  accent_1: '#FF8A80',
  accent_2: '#FF5252',
  accent_3: '#FF1744',
  accent_4: '#D50000'
};
const Teal = {
  base: '#009688',
  lighten_5: '#E0F2F1',
  lighten_4: '#B2DFDB',
  lighten_3: '#80CBC4',
  lighten_2: '#4DB6AC',
  lighten_1: '#26A69A',
  darken_1: '#00897B',
  darken_2: '#00796B',
  darken_3: '#00695C',
  darken_4: '#004D40',
  accent_1: '#A7FFEB',
  accent_2: '#64FFDA',
  accent_3: '#1DE9B6',
  accent_4: '#00BFA5'
};
const Yellow = {
  base: '#FFEB3B',
  lighten_5: '#FFFDE7',
  lighten_4: '#FFF9C4',
  lighten_3: '#FFF59D',
  lighten_2: '#FFF176',
  lighten_1: '#FFEE58',
  darken_1: '#FDD835',
  darken_2: '#FBC02D',
  darken_3: '#F9A825',
  darken_4: '#F57F17',
  accent_1: '#FFFF8D',
  accent_2: '#FFFF00',
  accent_3: '#FFEA00',
  accent_4: '#FFD600'
};
const BlueGrey = {
  base: '#607D8B',
  lighten_5: '#ECEFF1',
  lighten_4: '#CFD8DC',
  lighten_3: '#B0BEC5',
  lighten_2: '#90A4AE',
  lighten_1: '#78909C',
  darken_1: '#546E7A',
  darken_2: '#455A64',
  darken_3: '#37474F',
  darken_4: '#263238',
  accent_1: '#B7C9D1',
  accent_2: '#89A5B3',
  accent_3: '#6A8EA0',
  accent_4: '#547383'
};
const Brown = {
  base: '#795548',
  lighten_5: '#EFEBE9',
  lighten_4: '#D7CCC8',
  lighten_3: '#BCAAA4',
  lighten_2: '#A1887F',
  lighten_1: '#8D6E63',
  darken_1: '#6D4C41',
  darken_2: '#5D4037',
  darken_3: '#4E342E',
  darken_4: '#3E2723',
  accent_1: '#D2BEB6',
  accent_2: '#B59387',
  accent_3: '#A27767',
  accent_4: '#855F51'
};
const Grey = {
  base: '#9E9E9E',
  lighten_5: '#FAFAFA',
  lighten_4: '#F5F5F5',
  lighten_3: '#EEEEEE',
  lighten_2: '#E0E0E0',
  lighten_1: '#BDBDBD',
  darken_1: '#757575',
  darken_2: '#616161',
  darken_3: '#424242',
  darken_4: '#212121',
  accent_1: '#C4C4C4',
  accent_2: '#9E9E9E',
  accent_3: '#858585',
  accent_4: '#6B6B6B'
};
/**
 * @type {Object.<string,Object<string,Object>>}
 * @property {string[]} colors
 * @property {string[]} degrees
 */

const Cards = {
  red: Red,
  pink: Pink,
  purple: Purple,
  deepPurple: DeepPurple,
  indigo: Indigo,
  blue: Blue,
  lightBlue: LightBlue,
  cyan: Cyan,
  teal: Teal,
  green: Green,
  lightGreen: LightGreen,
  lime: Lime,
  yellow: Yellow,
  amber: Amber,
  orange: Orange,
  deepOrange: DeepOrange,
  brown: Brown,
  blueGrey: BlueGrey,
  grey: Grey
};
Reflect.defineProperty(Cards, 'colors', {
  get() {
    return Object.keys(Cards);
  },

  enumerable: false
});
Reflect.defineProperty(Cards, 'degrees', {
  get() {
    for (let color in Cards) return Object.keys(Cards[color]);
  },

  enumerable: false
});

const RGB = 'rgb',
      HSL = 'hsl',
      HEX = 'hex';

const oneself$2 = x => x;

/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */


const round$2 = x => x + (x > 0 ? 0.5 : -0.5) << 0;

const rgbToInt$2 = ([r, g, b]) => ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF);
/**
 * @param {[number,number,number]} rgb
 * @returns {string}
 */


const rgbToHex$2 = rgb => '#' + rgbToInt$2(rgb).toString(16).toUpperCase().padStart(6, '0');

const bound = ([r, g, b]) => {
  let ma = r,
      mi = r;

  if (g > r) {
    ma = g;
  } else {
    mi = g;
  }

  if (b > ma) ma = b;
  if (b < mi) mi = b;
  return {
    max: ma,
    sum: ma + mi,
    dif: ma - mi
  };
};

const hue = (r, g, b, max, dif) => {
  if (dif === 0) return 0;

  switch (max) {
    case r:
      return ((g - b) / dif + (g < b ? 6 : 0)) % 6;

    case g:
      return (b - r) / dif + 2;

    case b:
      return (r - g) / dif + 4;
  }
};

const THOUSAND = 1000;
/**
 * !dif: dif===0
 * @param {number} r - [0,255]
 * @param {number} g - [0,255]
 * @param {number} b - [0,255]
 * @returns {[number,number,number]} [Hue([0,360]), Saturation([0,100]), Lightness([0,100])]
 */

function rgbToHsl([r, g, b]) {
  r /= 255;
  g /= 255;
  b /= 255;
  const {
    max,
    sum,
    dif
  } = bound([r, g, b]);
  let h = hue(r, g, b, max, dif) * 60,
      s = !dif ? 0 : sum > 1 ? dif / (2 - sum) : dif / sum,
      l = sum / 2;
  return [round$2(h), round$2(s * THOUSAND) / 10, round$2(l * THOUSAND) / 10];
}

const diluteHex = (hex, hi) => {
  hi = hi || hex.length;
  let x = '';

  for (let i = 0, el; i < hi; i++) {
    el = hex[i];
    x += el + el;
  } // for (let c of hex) x += c + c


  return x;
};
/**
 *
 * @param {string} hex
 * @returns {number}
 */


function hexToInt(hex) {
  if (hex.charAt(0) === '#') hex = hex.substring(1);
  if (!hex[3]) hex = diluteHex(hex);
  return parseInt(hex, 16);
}
/**
 *
 * @param {string} hex
 * @returns {number[]}
 */


function hexToRgb(hex) {
  const int = hexToInt(hex);
  return [int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF];
}

const hexToHsl = hex => {
  var _ref, _hex;

  return _ref = (_hex = hex, hexToRgb(_hex)), rgbToHsl(_ref);
};
/**
 *
 * @param {number} n
 * @param {number} h
 * @param {number} a
 * @param {number} l
 * @returns {number}
 */


const hf$2 = (n, h, a, l) => {
  const k = (n + h / 30) % 12;
  return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
};
/**
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns {number[]}
 */


function hslToRgb$2([h, s, l]) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l),
        r = hf$2(0, h, a, l),
        g = hf$2(8, h, a, l),
        b = hf$2(4, h, a, l);
  return [round$2(r * 0xFF), round$2(g * 0xFF), round$2(b * 0xFF)]; // return [r * 0xFF & 0xFF, g * 0xFF & 0xFF, b * 0xFF & 0xFF]
}

const hslToHex$2 = hsl => {
  var _ref, _hsl;

  return _ref = (_hsl = hsl, hslToRgb$2(_hsl)), rgbToHex$2(_ref);
};

const ESC = '\u001b';
const L$2 = ESC + '[';
const R$2 = 'm';
const SC = ';';
const FORE = '38;2';
const CLR_FORE = '39';
//   black: 30,
//   Red: 31,
//   Green: 32,
//   Yellow: 33,
//   Blue: 34,
//   magenta: 35,
//   Cyan: 36,
//   white: 37,
//   Grey: 90,
// }

const BOLD = '1';
const ITALIC = '3';
const UNDERLINE = '4';
const INVERSE = '7';
const CLR_BOLD = '22';
const CLR_ITALIC = '23';
const CLR_UNDERLINE = '24';
const CLR_INVERSE = '27';
const Effects = {
  bold: [BOLD, CLR_BOLD],
  italic: [ITALIC, CLR_ITALIC],
  underline: [UNDERLINE, CLR_UNDERLINE],
  inverse: [INVERSE, CLR_INVERSE]
};
/**
 *
 * @param {string} code
 * @returns {string}
 */


const enclose = code => L$2 + code + R$2;
/**
 *
 * @param {number[]} rgb - array of three integers, each from 0 to 255
 * @returns {string}
 */


const rgbToAnsi = rgb => FORE + SC + rgb[0] + SC + rgb[1] + SC + rgb[2];

const hexToAnsi = hex => {
  const int = hexToInt(hex);
  return FORE + SC + (int >> 16 & 0xFF) + SC + (int >> 8 & 0xFF) + SC + (int & 0xFF);
};

const hslToAnsi = hsl => {
  var _ref, _hsl;

  return _ref = (_hsl = hsl, hslToRgb$2(_hsl)), rgbToAnsi(_ref);
};

function _defineProperty$7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const assignEffects = function (effects) {
  const conf = this;

  for (let effect of effects) if (effect in Effects && (effect = Effects[effect])) conf.head += SC + effect[0], conf.tail += SC + effect[1];

  return conf;
};
/**
 *
 * @param {string} text
 * @returns {string}
 */


function dye(text) {
  const {
    head,
    tail
  } = this;
  return head + text + tail;
}
/***
 *
 * @param {string|number[]} color
 * @returns {function(string):string}
 */


function Dye(color) {
  if (!color) return oneself$2;
  const config = this !== null && this !== void 0 ? this : {};
  let {
    ansi = rgbToAnsi,
    head = '',
    tail = '',
    effects
  } = config;
  if (effects !== null && effects !== void 0 && effects.length) assignEffects.call(config, effects);
  head = enclose(head + SC + ansi(color)), tail = enclose(tail + SC + CLR_FORE);
  return dye.bind({
    head,
    tail
  });
}

const spaceToAnsi$1 = space => space === RGB ? rgbToAnsi : space === HEX ? hexToAnsi : space === HSL ? hslToAnsi : rgbToAnsi;
/** @type {Function} */


class DyeFactory$1 {
  /** @type {Function} */

  /** @type {string} */

  /** @type {string} */
  constructor(ansi, head, tail) {
    _defineProperty$7(this, "ansi", void 0);

    _defineProperty$7(this, "head", void 0);

    _defineProperty$7(this, "tail", void 0);

    this.ansi = ansi;
    this.head = head;
    this.tail = tail;
    return Dye.bind(this);
  }
  /**
   * @param colorSpace
   * @param effects
   * @returns {DyeFactory|Function}
   */


  static build(colorSpace, effects) {
    var _colorSpace;

    const conf = {
      ansi: (_colorSpace = colorSpace, spaceToAnsi$1(_colorSpace)),
      head: '',
      tail: ''
    };
    if (effects !== null && effects !== void 0 && effects.length) assignEffects.call(conf, effects);
    return Dye.bind(conf);
  }

  static prep(colorSpace, ...effects) {
    var _colorSpace2;

    const conf = {
      ansi: (_colorSpace2 = colorSpace, spaceToAnsi$1(_colorSpace2)),
      head: '',
      tail: ''
    };
    if (effects !== null && effects !== void 0 && effects.length) assignEffects.call(conf, effects);
    return Dye.bind(conf);
  }

}

const mapper$6 = function (vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);
  const ve = Array(l);

  for (--l; l >= 0; l--) ve[l] = fn.call(this, vec[l], l);

  return ve;
};

const mutate$5 = (vec, fn, l) => {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (--l; l >= 0; l--) vec[l] = fn(vec[l], l);

  return vec;
};

const RED = 'red',
      PINK = 'pink',
      PURPLE = 'purple',
      DEEPPURPLE = 'deepPurple',
      INDIGO = 'indigo',
      BLUE = 'blue',
      LIGHTBLUE = 'lightBlue',
      CYAN = 'cyan',
      TEAL = 'teal',
      GREEN = 'green',
      LIGHTGREEN = 'lightGreen',
      LIME = 'lime',
      YELLOW = 'yellow',
      AMBER = 'amber',
      ORANGE = 'orange',
      DEEPORANGE = 'deepOrange',
      BROWN = 'brown',
      BLUEGREY = 'blueGrey',
      GREY = 'grey';

const red = [RED, PINK];
const purple = [PURPLE, DEEPPURPLE];
const blue = [INDIGO, BLUE, LIGHTBLUE, CYAN];
const green = [TEAL, GREEN];
const yellowGreen = [LIGHTGREEN, LIME, YELLOW];
const orange$1 = [AMBER, ORANGE, DEEPORANGE];
const grey$1 = [BROWN, BLUEGREY, GREY];
const rainbow = [].concat(red, purple, blue, green, yellowGreen, orange$1);
const entire = rainbow.concat(grey$1);
const ColorGroups = {
  red,
  purple,
  blue,
  green,
  yellowGreen,
  orange: orange$1,
  grey: grey$1,
  rainbow,
  entire
};
const accents = Init.init(4, i => `accent_${i + 1}`).reverse(),
      lightens = Init.init(5, i => `lighten_${i + 1}`).reverse(),
      darkens = Init.init(4, i => `darken_${i + 1}`);
const Degrees = {
  entire: [...accents, ...lightens, 'base', ...darkens],
  base: ['base'],
  lightens: lightens,
  darkens: darkens,
  accents: accents,
  readable: [...accents.slice(-3), ...lightens.slice(-3), 'base']
};

var _ref$3;

const lexicon = (_ref$3 = [[/light/gi, 'l'], [/deep/gi, 'd']], translator.makeReplaceable(_ref$3));

const shortenDescription = name => name.replace(lexicon, x => phrasing.camelToSnake(x, '.'));

function palettCrostab({
  space = HEX,
  degrees = Degrees.entire,
  colors = ColorGroups.entire,
  dyed = false
} = {}) {
  const crostab = convert.samplesToCrostab(Cards, {
    side: colors,
    head: degrees
  }).transpose();

  if (space !== HEX) {
    crostab.mutate(space === RGB ? hexToRgb : space === HSL ? hexToHsl : oneself$2);
  }

  if (dyed) {
    const dyeFactory = DyeFactory$1.build(space, [INVERSE$1]);
    space === HEX ? crostab.mutate(hex => {
      var _hex;

      return _hex = hex, dyeFactory(hex)(_hex);
    }) : crostab.mutate(xyz => {
      var _mapper;

      return _mapper = mapper$6(xyz, v => v.toFixed(0).padStart(3)), dyeFactory(xyz)(_mapper);
    });
  }

  return crostab.mutateBanner(shortenDescription);
}

const constraint$1 = (x, min, max) => x > max ? max : x < min ? min : x;

const toner = (hsl, dh, ds, dl) => {
  hsl[0] = constraint$1(hsl[0] + dh, 0, 360);
  hsl[1] = constraint$1(hsl[1] + ds, 0, 100);
  hsl[2] = constraint$1(hsl[2] + dl, 0, 100);
  return hsl;
};

// from x => typeof x
const UND = 'undefined';
const BOO = 'boolean';
const NUM$1 = 'number';
const STR$2 = 'string';
const OBJ = 'object';
const FUN = 'function';
const SYM = 'symbol';

({
  max: Cards.cyan.accent_2,
  min: Cards.green.darken_1,
  na: Cards.grey.lighten_4
});
({
  max: Cards.cyan.lighten_3,
  min: Cards.orange.lighten_2,
  na: Cards.pink.lighten_4
});
({
  max: Cards.green.accent_3,
  min: Cards.deepPurple.accent_1,
  na: Cards.teal.accent_1
});
({
  max: Cards.cyan.accent_1,
  min: Cards.lightBlue.accent_4,
  na: Cards.deepOrange.accent_1
});
const FRESH = {
  max: Cards.lightGreen.accent_3,
  min: Cards.deepOrange.accent_3,
  na: Cards.blue.lighten_3
};
({
  max: Cards.orange.accent_2,
  min: Cards.purple.accent_1,
  na: Cards.grey.lighten_2
});
({
  max: Cards.lime.accent_3,
  min: Cards.lightGreen.accent_3,
  na: Cards.blueGrey.accent_1
});
({
  max: Cards.amber.accent_3,
  min: Cards.red.lighten_1,
  na: Cards.grey.accent_2
});
const METRO = {
  max: Cards.pink.lighten_2,
  min: Cards.blue.lighten_4,
  na: Cards.teal.accent_3
};
({
  max: Cards.lightGreen.accent_3,
  min: Cards.teal.lighten_3,
  na: Cards.brown.accent_1
});
({
  max: Cards.lightBlue.accent_2,
  min: Cards.indigo.base,
  na: Cards.pink.lighten_3
});
const PLANET = {
  max: Cards.teal.accent_2,
  min: Cards.blue.darken_3,
  na: Cards.cyan.lighten_4
};
({
  max: Cards.red.lighten_2,
  min: Cards.yellow.darken_1,
  na: Cards.green.lighten_2
});
const SUBTLE = {
  max: Cards.grey.lighten_5,
  min: Cards.grey.darken_1,
  na: Cards.indigo.lighten_3
};
({
  max: Cards.pink.lighten_4,
  min: Cards.deepPurple.accent_2,
  na: Cards.amber.darken_2
});

const reverseHue = hue => {
  hue += 180;
  return hue > 360 ? hue - 360 : hue < 0 ? hue + 360 : hue;
};

const constraint = (x, min, max) => x > max ? max : x < min ? min : x;

const randPreset = hex => {
  var _min, _toner, _ref;

  const min = hex;
  const hsl = (_min = min, hexToHsl(_min));
  const max = (_toner = toner(hsl.slice(), randBetw(-12, 12), randBetw(-5, 10), randBetw(6, 18)), hslToHex$2(_toner));
  const na = (_ref = [reverseHue(hsl[0]), constraint(hsl[1] - 32, 5, 90), constraint(hsl[2] + 24, 40, 96)], hslToHex$2(_ref));
  return {
    min,
    max,
    na
  };
};

const LIGHTEN = 'lighten',
      ACCENT = 'accent',
      DARKEN = 'darken';

const degreeToIndice = degree => {
  let i = degree.indexOf('_');
  if (i < 0) return randBetw(14, 16);
  let cate = degree.slice(0, i),
      order = degree.slice(++i);
  if (cate === LIGHTEN) return 15 - --order * 3;
  if (cate === ACCENT) return 14 - --order * 3;
  if (cate === DARKEN) return 13 - --order * 3;
  return rand(16);
};

const sortBy = function (indicator, comparer) {
  const vec = this,
        kvs = mutate$5(vec, (x, i) => [indicator(x, i), x]).sort(toKeyComparer(comparer));
  return mutate$5(kvs, ([, value]) => value);
};

const toKeyComparer = comparer => (a, b) => comparer(a[0], b[0]); // accent  15 -3

function* presetFlopper({
  degrees = Degrees.entire,
  colors = ColorGroups.rainbow,
  space = HEX,
  defaultColor = Grey.lighten_1,
  exhausted = true
} = {}) {
  var _defaultColor, _crostab$head;

  const crostab = palettCrostab({
    space,
    degrees,
    colors,
    dyed: false
  });
  degrees = sortBy.call(degrees.slice(), degreeToIndice, NUM_DESC);
  let h = degrees.length,
      w = colors.length;

  for (let i = 0; i < h; i++) {
    for (let j = w - 1, side = degrees[i], head = crostab.head.slice(); j >= 0; j--) {
      const banner = swap.call(head, rand(j), j);
      const hex = crostab.cell(side, banner);
      yield randPreset(hex);
    }
  }

  defaultColor = (_defaultColor = defaultColor) !== null && _defaultColor !== void 0 ? _defaultColor : crostab.cell(degrees[0], (_crostab$head = crostab.head, flop(_crostab$head)));
  const defaultPreset = randPreset(defaultColor);

  while (!exhausted) yield defaultPreset;

  return defaultPreset;
}

/**
 *
 * @type {Function|function(*):string}
 */
const protoType = Function.prototype.call.bind(Object.prototype.toString);
/**
 * const rxObj = /^\[object (.*)]$/
 * Equivalent to: Object.prototype.stringify.call(o).match(rxObj)[1]
 * @param {*} o
 * @return {string}
 */

const typ = o => protoType(o).slice(8, -1);

const isNumeric$3 = x => !isNaN(x - parseFloat(x));
/**
 * validate
 * @param x
 * @param y
 * @returns {number}
 */


const validate$2 = (x, y) => isNaN(x - y) ? NaN : y;

const parseNum$3 = x => validate$2(x, parseFloat(x));

const v1$1 = word => (word.toLowerCase().charCodeAt(0) & 0x7f) << 21;

const v2$1 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14);

const v3$1 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7);

const v4$1 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7) + (word.charCodeAt(3) & 0x7f);

const stringValue$1 = word => {
  const l = word === null || word === void 0 ? void 0 : word.length;
  if (!l) return NaN;
  if (typeof word !== STR$2) return NaN;
  if (l >= 8) return (v4$1(word.slice(0, 4)) << 2) + v4$1(word.slice(-4));
  if (l === 7) return (v4$1(word.slice(0, 4)) << 2) + v3$1(word.slice(-3));
  if (l === 6) return (v4$1(word.slice(0, 4)) << 2) + v2$1(word.slice(-2));
  if (l === 5) return (v4$1(word.slice(0, 4)) << 2) + v1$1(word.slice(-1));
  if (l === 4) return v4$1(word) << 2;
  if (l === 3) return v3$1(word) << 2;
  if (l === 2) return v2$1(word) << 2;
  if (l === 1) return v1$1(word) << 2;
};

const CJK_LETTERS$1 = '\u4e00-\u9fbf';

const HALF_NUM = '0-9';
const HALF_UPPER = 'A-Z';
const HALF_LOWER = 'a-z';
const FULL_NUM$1 = '０-９'; // 0xff10 - 0xff19

const FULL_UPPER = 'Ａ-Ｚ'; // 0xff21 - 0xff3a

const FULL_LOWER = 'ａ-ｚ'; // 0xff41 - 0xff5a

const LITERAL_LOWER = `${HALF_UPPER}${HALF_LOWER}${HALF_NUM}`;
const LITERAL_UPPER = `${FULL_UPPER}${FULL_LOWER}${FULL_NUM$1}`;
const LITERAL$3 = new RegExp(`[${LITERAL_LOWER}]+`); // LITERAL = /[A-Za-z0-9]+/

const LITERAL_ANY = new RegExp(`[${LITERAL_LOWER}${CJK_LETTERS$1}${LITERAL_UPPER}]+`);

const isString = x => typeof x === STR$2;

const isLiteral = x => LITERAL$3.test(x);

const isLiteralAny = x => LITERAL_ANY.test(x);

const hasLiteral = x => isString(x) && isLiteral(x);

const STR$1 = 'string';
const COMMA$3 = /,/g;

const isNumeric$2 = x => {
  if (typeof x === STR$1) x = x.replace(COMMA$3, '');
  return !isNaN(x - parseFloat(x));
};
/**
 * validate
 * @param x
 * @param y
 * @returns {number}
 */


const validate$1 = (x, y) => isNaN(x - y) ? NaN : y;

const parseNum$2 = x => {
  if (typeof x === STR$1) x = x.replace(COMMA$3, '');
  return validate$1(x, parseFloat(x));
};

const iterate$5 = function (vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (let i = 0; i < l; i++) fn.call(this, vec[i], i);
};
/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[]} words
 * @param {Config} [configX]
 * @param {Config} [configY]
 * @return {[?BoundedVector, ?BoundedVector]}
 */


const duobound$1 = function (words, [configX, configY] = []) {
  const l = words === null || words === void 0 ? void 0 : words.length;
  let vecX = undefined,
      vecY = undefined;
  if (!l) return [vecX, vecY];
  const {
    filter: filterX,
    mapper: mapperX
  } = configX,
        {
    filter: filterY,
    mapper: mapperY
  } = configY;
  iterate$5(words, (v, i) => {
    var _vecX, _vecY;

    if (filterX(v) && ((_vecX = vecX) !== null && _vecX !== void 0 ? _vecX : vecX = Array(l))) {
      var _vecX$max;

      v = mapperX(v);

      if (v > ((_vecX$max = vecX.max) !== null && _vecX$max !== void 0 ? _vecX$max : vecX.max = vecX.min = v)) {
        vecX.max = v;
      } else if (v < vecX.min) {
        vecX.min = v;
      }

      return vecX[i] = v;
    }

    if (filterY(v) && ((_vecY = vecY) !== null && _vecY !== void 0 ? _vecY : vecY = Array(l))) {
      var _vecY$max;

      v = mapperY(v);

      if (v > ((_vecY$max = vecY.max) !== null && _vecY$max !== void 0 ? _vecY$max : vecY.max = vecY.min = v)) {
        vecY.max = v;
      } else if (v < vecY.min) {
        vecY.min = v;
      }

      return vecY[i] = v;
    }

    return NaN;
  }, l);
  return [vecX, vecY];
};
/**
 *
 * @typedef {*[]} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[]} words
 * @param {Config} [config]
 * @return {?BoundedVector}
 */


const solebound$1 = function (words, config) {
  const l = words === null || words === void 0 ? void 0 : words.length;
  let vec = undefined;
  if (!l) return vec;
  const {
    filter,
    mapper
  } = config;
  if (!filter) return vec;
  iterate$5(words, (v, i) => {
    var _vec;

    if (filter(v) && ((_vec = vec) !== null && _vec !== void 0 ? _vec : vec = Array(l))) {
      var _vec$max;

      v = mapper(v);

      if (v > ((_vec$max = vec.max) !== null && _vec$max !== void 0 ? _vec$max : vec.max = vec.min = v)) {
        vec.max = v;
      } else if (v < vec.min) {
        vec.min = v;
      }

      return vec[i] = v;
    }

    return NaN;
  }, l);
  return vec;
};
/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */


const multibound$1 = function (words, configs) {
  const l = words === null || words === void 0 ? void 0 : words.length;
  const vectorCollection = configs.map(x => undefined);
  if (!l) return vectorCollection;
  iterate$5(words, (v, i) => configs.some(({
    filter,
    mapper
  }, j) => {
    var _vec;

    let vec = vectorCollection[j];

    if (filter(v) && ((_vec = vec) !== null && _vec !== void 0 ? _vec : vec = vectorCollection[j] = Array(l))) {
      var _vec$max;

      v = mapper(v);

      if (v > ((_vec$max = vec.max) !== null && _vec$max !== void 0 ? _vec$max : vec.max = vec.min = v)) {
        vec.max = v;
      } else if (v < vec.min) {
        vec.min = v;
      }

      return vec[i] = v, true;
    }
  }), l);
  return vectorCollection;
};
/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */


const boundaries$1 = function (words, configs) {
  const count = configs.length;
  if (count === 0) return [];

  if (count === 1) {
    var _x$filter, _x$mapper;

    const [x = {}] = configs;
    x.filter = (_x$filter = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter !== void 0 ? _x$filter : isNumeric$2, x.mapper = (_x$mapper = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper !== void 0 ? _x$mapper : parseNum$2;
    return [solebound$1(words, configs[0])];
  }

  if (count === 2) {
    var _x$filter2, _x$mapper2, _y$filter, _y$mapper;

    const [x, y] = configs;
    const fX = (_x$filter2 = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter2 !== void 0 ? _x$filter2 : isNumeric$2,
          mX = (_x$mapper2 = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper2 !== void 0 ? _x$mapper2 : parseNum$2;
    const fY = (_y$filter = y === null || y === void 0 ? void 0 : y.filter) !== null && _y$filter !== void 0 ? _y$filter : hasLiteral,
          mY = (_y$mapper = y === null || y === void 0 ? void 0 : y.mapper) !== null && _y$mapper !== void 0 ? _y$mapper : stringValue$1;
    return duobound$1(words, [{
      filter: fX,
      mapper: mX
    }, {
      filter: fY,
      mapper: mY
    }]);
  }

  if (count >= 3) return multibound$1(words, configs);
};

function _defineProperty$6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const spaceToAnsi = space => space === RGB ? rgbToAnsi : space === HEX ? hexToAnsi : space === HSL ? hslToAnsi : rgbToAnsi;
/** @type {Function} */


class DyeFactory {
  /** @type {Function} */

  /** @type {string} */

  /** @type {string} */

  /**
   *
   * @param {Function} ansi
   * @param {string} head
   * @param {string} tail
   * @returns {Dye|Function}
   */
  constructor(ansi, head, tail) {
    _defineProperty$6(this, "ansi", void 0);

    _defineProperty$6(this, "head", void 0);

    _defineProperty$6(this, "tail", void 0);

    this.ansi = ansi;
    this.head = head;
    this.tail = tail;
    return Dye.bind(this);
  }
  /**
   * @param {string} colorSpace
   * @param {string[]} effects
   * @returns {Dye|Function}
   */


  static build(colorSpace, effects) {
    var _colorSpace;

    const conf = {
      ansi: (_colorSpace = colorSpace, spaceToAnsi(_colorSpace)),
      head: '',
      tail: ''
    };
    if (effects !== null && effects !== void 0 && effects.length) assignEffects.call(conf, effects);
    return Dye.bind(conf);
  }
  /**
   * @param {string} colorSpace
   * @param {...string} effects
   * @returns {Dye|Function}
   */


  static prep(colorSpace, ...effects) {
    return DyeFactory.build(colorSpace, effects);
  }

}

const nullish$1 = x => x === null || x === void 0;

function _defineProperty$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 *
 * @param {Object} bound
 * @param {number} [bound.min] - if min: if dif, return {min,dif}; if max, return calculated {min,dif}
 * @param {number} [bound.dif] - if dif: if max, return calculated {min,dif}; else return {min:0,dif}
 * @param {number} [bound.max] - if max: return {min:0,dif:max}; else return {min:0,dif:0}
 * @return {{dif: number, min: number}}
 */


const parseBound = bound => {
  // if (!bound) return { min: 0, dif: 0 }
  let {
    min,
    max,
    dif
  } = bound;

  if (!nullish$1(min)) {
    if (!nullish$1(dif)) return {
      min,
      dif
    };
    if (!nullish$1(max)) return {
      min,
      dif: max - min
    };
  }

  if (!nullish$1(dif)) {
    if (!nullish$1(max)) return {
      min: max - dif,
      dif
    };
    return {
      min: 0,
      dif
    };
  }

  if (!nullish$1(max)) return {
    min: 0,
    dif: max
  };
  return {
    min: 0,
    dif: 0
  };
};

const leverage = ([x, y, z], delta) => [x / delta, y / delta, z / delta];

const minus = ([x_, y_, z_], [_x, _y, _z]) => [x_ - _x, y_ - _y, z_ - _z];

const scale = (x, lo, lev, min$1, hi) => min((max$1(x, lo) - lo) * lev + min$1, hi);
/**
 * @typedef {[number,number,number]} Triple
 * @typedef {function(string):string} dye
 * @typedef {{max:string,min:string,na:string,effects?:string[]}} PresetHEX
 * @typedef {{max:Triple,min:Triple,na:Triple,effects?:string[]}} PresetHSL
 * @typedef {{min:Triple,dif:Triple}} LeapHSL
 * @typedef {{min:number,dif:number}} LeapNum
 */


class ProjectorConfig {
  /** @type {function(Triple):dye} */

  /** @type {number} */

  /** @type {Triple} */

  /** @type {Triple} */

  /** @type {Triple} */

  /**
   * @param {LeapNum} leapNum
   * @param {LeapHSL} leapHSL
   * @param {Triple} napHSL
   * @param {string[]} effects
   */
  constructor(leapNum, leapHSL, napHSL, effects) {
    _defineProperty$5(this, "fab", void 0);

    _defineProperty$5(this, "lo", void 0);

    _defineProperty$5(this, "lev", void 0);

    _defineProperty$5(this, "min", void 0);

    _defineProperty$5(this, "nap", void 0);

    this.fab = DyeFactory.build(HSL, effects);
    this.lo = leapNum.min;
    this.lev = !leapNum.dif ? 0 : leverage(leapHSL.dif, leapNum.dif);
    this.min = leapHSL.min;
    this.nap = napHSL;
  }
  /**
   * @param {Object} bound
   * @param {PresetHEX} preset
   * @returns {ProjectorConfig}
   */


  static fromHEX(bound, preset) {
    var _preset$max, _preset$min, _preset$na;

    const max = (_preset$max = preset.max, hexToHsl(_preset$max)),
          min = (_preset$min = preset.min, hexToHsl(_preset$min)),
          nap = (_preset$na = preset.na, hexToHsl(_preset$na)),
          effects = preset.effects;
    return new ProjectorConfig(parseBound(bound), {
      min,
      dif: minus(max, min)
    }, nap, effects);
  }
  /**
   * @param {Object} bound
   * @param {PresetHSL} preset
   * @returns {ProjectorConfig}
   */


  static fromHSL(bound, preset) {
    const {
      max,
      min,
      na: nap,
      effects
    } = preset;
    return new ProjectorConfig(parseBound(bound), {
      min,
      dif: minus(max, min)
    }, nap, effects);
  }

  project(value) {
    const {
      lo,
      lev,
      min
    } = this;
    return [scale(value, lo, lev[0], min[0], 360), scale(value, lo, lev[1], min[1], 100), scale(value, lo, lev[2], min[2], 100)];
  }

  get dyeNAp() {
    return this.fab(this.nap);
  }

}

function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * @typedef {[number,number,number]} Triple
 * @typedef {function(string):string} dye
 */


class ProjectorFactory {
  /** @type {function(Triple):dye} */

  /** @type {number} */

  /** @type {Triple} */

  /** @type {Triple} */

  /** @type {Triple} */

  /**
   * @param {Object} config
   * @param {function(Triple):dye} config.fab
   * @param {number}  config.lo
   * @param {Triple}  config.lev
   * @param {Triple}  config.min
   * @param {Triple}  config.nap
   */
  constructor(config) {
    _defineProperty$4(this, "fab", void 0);

    _defineProperty$4(this, "lo", void 0);

    _defineProperty$4(this, "lev", void 0);

    _defineProperty$4(this, "min", void 0);

    _defineProperty$4(this, "nap", void 0);

    Object.assign(this, config);
  }

  static fromHEX(bound, preset) {
    if (!bound || !preset) {
      return new VoidProjectorFactory();
    }

    const config = ProjectorConfig.fromHEX(bound, preset);
    if (!config.lev) return new SoleProjectorFactory(config);
    return new ProjectorFactory(config);
  }

  static fromHSL(bound, preset) {
    if (!bound || !preset) {
      return new VoidProjectorFactory();
    }

    const config = ProjectorConfig.fromHSL(bound, preset);
    if (!config.lev) return new SoleProjectorFactory(config);
    return new ProjectorFactory(config);
  }

  render(value, text) {
    return this.fab(this.color(value))(text);
  }

  make(value) {
    return this.fab(this.color(value));
  }

  color(value) {
    if (isNaN(value)) return this.nap;
    const {
      lo,
      lev,
      min
    } = this;
    return [scale(value, lo, lev[0], min[0], 360), scale(value, lo, lev[1], min[1], 100), scale(value, lo, lev[2], min[2], 100)];
  }

}

class SoleProjectorFactory {
  /** @type {function(*):dye} */

  /** @type {Triple} */

  /** @type {Triple} */
  constructor(config) {
    _defineProperty$4(this, "fab", void 0);

    _defineProperty$4(this, "min", void 0);

    _defineProperty$4(this, "nap", void 0);

    Object.assign(this, config);
  }

  render(value, text) {
    return this.fab(this.color(value))(text);
  }

  make(value) {
    return this.fab(this.color(value));
  }

  color(value) {
    return isNaN(value) ? this.nap : this.min;
  }

}

class VoidProjectorFactory {
  constructor(config) {
    Object.assign(this, config);
  }

  render(value, text) {
    return text;
  }

  make(value) {
    return oneself$2;
  }

  color(value) {
    return null;
  }

} // if (!preset) { return new VoidProjectorFactory() } else { preset = presetToLeap(preset) }

const oneself$1 = x => x;
/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */


const round$1 = x => x + (x > 0 ? 0.5 : -0.5) << 0;

const rgbToInt$1 = ([r, g, b]) => ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF);
/**
 * @param {[number,number,number]} rgb
 * @returns {string}
 */


const rgbToHex$1 = rgb => '#' + rgbToInt$1(rgb).toString(16).toUpperCase().padStart(6, '0');
/**
 *
 * @param {number} n
 * @param {number} h
 * @param {number} a
 * @param {number} l
 * @returns {number}
 */


const hf$1 = (n, h, a, l) => {
  const k = (n + h / 30) % 12;
  return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
};
/**
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns {number[]}
 */


function hslToRgb$1([h, s, l]) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l),
        r = hf$1(0, h, a, l),
        g = hf$1(8, h, a, l),
        b = hf$1(4, h, a, l);
  return [round$1(r * 0xFF), round$1(g * 0xFF), round$1(b * 0xFF)]; // return [r * 0xFF & 0xFF, g * 0xFF & 0xFF, b * 0xFF & 0xFF]
}

const hslToHex$1 = hsl => {
  var _ref, _hsl;

  return _ref = (_hsl = hsl, hslToRgb$1(_hsl)), rgbToHex$1(_ref);
}; // export const
//   FUNC = '',
//   PIGM = '',
//   HEX = ''


const MAKER$1 = 'maker',
      RENDER$5 = 'render',
      COLOR$1 = 'color';
/**
 * @typedef {Object} Preset
 * @typedef {string} Preset.max
 * @typedef {string} Preset.min
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {*[]} vec
 * @param {Preset[]} presets
 * @returns {*[]}
 */

const fluoVector = function (vec, presets) {
  if (!(vec !== null && vec !== void 0 && vec.length)) return [];

  const projectorCollection = _toProjectorCollection(vec, presets);

  const mapper$1 = this !== null && this !== void 0 && this.mutate ? mutate$5 : mapper$6;

  switch (this === null || this === void 0 ? void 0 : this.colorant) {
    case COLOR$1:
      return mapper$1(vec, ColorFactory.color(projectorCollection));

    case MAKER$1:
      return mapper$1(vec, ColorFactory.maker(projectorCollection));

    case RENDER$5:
    default:
      return mapper$1(vec, ColorFactory.render(projectorCollection));
  }
};

const _toProjectorCollection = (vec, presetCollection = []) => {
  const [confX, confY] = presetCollection;
  const [vecX, vecY] = boundaries$1(vec, presetCollection);
  const [projX, projY] = [ProjectorFactory.fromHEX(vecX, confX), ProjectorFactory.fromHEX(vecY, confY)];
  return [[vecX, projX], [vecY, projY]];
};

class ColorFactory {
  static color([[bX, pX], [bY, pY]]) {
    function toColor(hsl) {
      var _hsl;

      return hsl ? (_hsl = hsl, hslToHex$1(_hsl)) : null;
    }

    return (_, i) => {
      let v;

      if (!nullish$1(v = bX && bX[i])) {
        var _pX$color;

        return _pX$color = pX.color(v), toColor(_pX$color);
      }

      if (!nullish$1(v = bY && bY[i])) {
        var _pY$color;

        return _pY$color = pY.color(v), toColor(_pY$color);
      }

      return null;
    };
  }

  static maker([[bX, pX], [bY, pY]]) {
    return (_, i) => {
      var _make, _ref;

      let v;

      if (!nullish$1(v = bX && bX[i])) {
        return pX.make(v);
      }

      if (!nullish$1(v = bY && bY[i])) {
        return pY.make(v);
      }

      return (_make = (_ref = pX || pY) === null || _ref === void 0 ? void 0 : _ref.make(pX.nap)) !== null && _make !== void 0 ? _make : oneself$1;
    };
  }

  static render([[bX, pX], [bY, pY]]) {
    return (n, i) => {
      var _render, _ref2;

      let v;

      if (!nullish$1(v = bX && bX[i])) {
        return pX.render(v, n);
      }

      if (!nullish$1(v = bY && bY[i])) {
        return pY.render(v, n);
      }

      return (_render = (_ref2 = pX || pY) === null || _ref2 === void 0 ? void 0 : _ref2.render(pX.nap, n)) !== null && _render !== void 0 ? _render : n;
    };
  }

}

const POINTWISE = 0;
const ROWWISE = 1;
const COLUMNWISE = 2;

const columns = function (y, h) {
  return mapper$6(this, r => r[y], h);
};

const Columns = mx => columns.bind(mx);

const iterate$4 = function (mx, fnOnColumns, h, w) {
  var _mx$;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length);

  for (let j = 0, cols = Columns(mx); j < w; j++) fnOnColumns.call(this, cols(j, h), j);
};

const mapper$5 = (mx, mapOnColumns, h, w) => {
  var _mx$;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length); // 'mapperColumns' |> logger

  const tcol = Array(w);

  for (let j = 0, cols = Columns(mx); j < w; j++) {
    tcol[j] = mapOnColumns(cols(j, h), j); // Xr().index(j).col(cols(j, h)).result(tcol[j]) |> logger
  } // tcol |> logger


  return tcol;
};

var ColumnsMapper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iterate: iterate$4,
  mapper: mapper$5
});

const iso = (h, w, v) => {
  const mx = Array(h);

  for (let i = 0, j, ro; i < h; i++) for (j = 0, mx[i] = ro = Array(w); j < w; j++) ro[j] = v;

  return mx;
};

/**
 *
 * @param {*[][]} mx
 * @param {function} fn
 * @param {number} [h]
 * @param {number} [w]
 * @returns {undefined}
 */
const iterate$3 = function (mx, fn, h, w) {
  var _mx$;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length);

  for (let i = 0, j, r; i < h; i++) for (r = mx[i], j = 0; j < w; j++) fn.call(this, r[j], i, j);
};
/**
 * Iterate through elements on each (x of rows,y of columns) coordinate of a 2d-array.
 * @param {*[][]} mx
 * @param {function} fn
 * @param {number} [h]
 * @param {number} [w]
 * @returns {*[]}
 */


const mapper$4 = (mx, fn, h, w) => {
  var _mx$;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length);
  const tx = Array(h);

  for (let i = 0, j, r, tr; i < h; i++) for (tx[i] = tr = Array(w), r = mx[i], j = 0; j < w; j++) tr[j] = fn(r[j], i, j);

  return tx;
};

const mutate$4 = (mx, fn, h, w) => {
  var _mx$;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length);

  for (let i = 0, j, r; i < h; i++) for (j = 0, r = mx[i]; j < w; j++) r[j] = fn(r[j], i, j);

  return mx;
};

const selectMutate = (mx, ys, fn, h) => {
  h = h || (mx === null || mx === void 0 ? void 0 : mx.length);
  const depth = ys.length;

  for (let i = 0, y, r, j; i < h; i++) for (y = 0, r = mx[i]; y < depth; y++) r[j = ys[y]] = fn(r[j], i, j);

  return mx;
};

var Mapper$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iterate: iterate$3,
  mapper: mapper$4,
  mutate: mutate$4,
  selectMutate: selectMutate
});

/**
 *
 * @param {*[]} vec
 * @param {number} [h] - head margin length
 * @param {number} [t] - tail margin length
 * @param {number} [l] - array length
 * @returns {*[]}
 */
const marginCopy$1 = (vec, h, t, l) => {
  var _l;

  const ve = Array(l = (_l = l) !== null && _l !== void 0 ? _l : vec === null || vec === void 0 ? void 0 : vec.length),
        s = l - t;

  for (--h; h >= 0; h--) ve[h] = vec[h];

  for (--l; l >= s; l--) ve[l] = vec[l];

  return ve;
};
/**
 *
 * @param {*[]} vec
 * @param {function(*)|function(*,number)} fn
 * @param {number} [h] - head margin length
 * @param {number} [t] - tail margin length
 * @param {number} [l] - array length
 * @returns {*[]}
 */


const marginMapper$1 = (vec, fn, h, t, l) => {
  var _l;

  const ve = Array(l = (_l = l) !== null && _l !== void 0 ? _l : vec === null || vec === void 0 ? void 0 : vec.length),
        s = l - t;

  for (--h; h >= 0; h--) ve[h] = fn(vec[h], h);

  for (--l; l >= s; l--) ve[l] = fn(vec[l], l);

  return ve;
};
/**
 *
 * @param {*[]} vec
 * @param {function(*)|function(*,number)} fn
 * @param {number} [h] - head margin length
 * @param {number} [t] - tail margin length
 * @param {number} [l] - array length
 * @returns {*[]}
 */


const marginMutate$1 = (vec, fn, h, t, l) => {
  var _l;

  l = (_l = l) !== null && _l !== void 0 ? _l : vec === null || vec === void 0 ? void 0 : vec.length;
  const s = l - t;

  for (--h; h >= 0; h--) vec[h] = fn(vec[h], h);

  for (--l; l >= s; l--) vec[l] = fn(vec[l], l);

  return vec;
};

const height$1 = mx => mx === null || mx === void 0 ? void 0 : mx.length;

const width$1 = mx => {
  let r;
  return height$1(mx) && (r = mx[0]) ? r.length : r;
};

const size$1 = mx => {
  let h, r;
  return mx && (h = mx.length) && (r = mx[0]) ? [h, r.length] : [h, r];
};

var Size = /*#__PURE__*/Object.freeze({
  __proto__: null,
  height: height$1,
  size: size$1,
  width: width$1
});

/**
 * Transpose a 2d-array.
 * @param {*[][]} mx
 * @param {number} [h]
 * @param {number} [w]
 * @returns {*[][]}
 */

const transpose$1 = (mx, h, w) => {
  var _mx$;

  h = h || (mx === null || mx === void 0 ? void 0 : mx.length), w = w || h && ((_mx$ = mx[0]) === null || _mx$ === void 0 ? void 0 : _mx$.length);
  const cols = Array(w);

  for (--w; w >= 0; w--) cols[w] = mapper$6(mx, r => r[w], h);

  return cols;
};

var Transpose = /*#__PURE__*/Object.freeze({
  __proto__: null,
  transpose: transpose$1
});

function columnMutate(mx, fn, l) {
  l = l || (mx === null || mx === void 0 ? void 0 : mx.length);

  for (let i = 0, r, {
    y
  } = this; i < l && (r = mx[i]); i++) r[y] = fn(r[y], i);

  return mx;
}

const mutate$3 = (mx, y, fn, l) => columnMutate.call({
  y
}, mx, fn, l);

function duozipper$1(a, b) {
  let {
    fn,
    lo,
    hi
  } = this;
  lo = lo || 0;
  const vec = Array(hi = hi || (a === null || a === void 0 ? void 0 : a.length));

  for (--hi; hi >= lo; hi--) vec[hi] = fn(a[hi], b[hi], hi);

  return vec;
}
/**
 * zip two arrays, return the zipped array
 * @param {Array} a
 * @param {Array} b
 * @param {function(*,*,number?):*} fn
 * @param {number} [l]
 * @returns {*[]}
 */


const zipper$2 = (a, b, fn, l) => duozipper$1.call({
  fn,
  hi: l
}, a, b);

const {
  iterate: iterate$2,
  mutate: mutate$2,
  mapper: mapper$3
} = Mapper$1;
const {
  size,
  width,
  height
} = Size;
const {
  transpose
} = Transpose;
const {
  mapper: columnsMapper
} = ColumnsMapper;

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config} configX
 * @param {Config} configY
 * @return {[?BoundedMatrix, ?BoundedMatrix]}
 */


const duobound = (wordx, [configX, configY] = []) => {
  const [h, w] = size$1(wordx);
  let matX = undefined,
      matY = undefined;
  if (!h || !w) return [matX, matY];
  const {
    filter: filterX,
    mapper: mapperX
  } = configX,
        {
    filter: filterY,
    mapper: mapperY
  } = configY;
  iterate$3(wordx, (v, i, j) => {
    var _matX, _matY;

    if (filterX(v) && ((_matX = matX) !== null && _matX !== void 0 ? _matX : matX = iso(h, w, undefined))) {
      var _matX$max;

      v = mapperX(v);

      if (v > ((_matX$max = matX.max) !== null && _matX$max !== void 0 ? _matX$max : matX.max = matX.min = v)) {
        matX.max = v;
      } else if (v < matX.min) {
        matX.min = v;
      }

      return matX[i][j] = v;
    }

    if (filterY(v) && ((_matY = matY) !== null && _matY !== void 0 ? _matY : matY = iso(h, w, undefined))) {
      var _matY$max;

      v = mapperY(v);

      if (v > ((_matY$max = matY.max) !== null && _matY$max !== void 0 ? _matY$max : matY.max = matY.min = v)) {
        matY.max = v;
      } else if (v < matY.min) {
        matY.min = v;
      }

      return matY[i][j] = v;
    }

    return NaN;
  }, h, w);
  return [matX, matY];
};
/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config} [config]
 * @return {?BoundedMatrix}
 */


const solebound = (wordx, config) => {
  const [height, width] = size$1(wordx);
  /** @type {?BoundedMatrix} */

  let mx = undefined;
  if (!height || !width) return mx;
  const {
    filter,
    mapper
  } = config;
  iterate$3(wordx, (v, i, j) => {
    var _mx;

    if (filter(v) && ((_mx = mx) !== null && _mx !== void 0 ? _mx : mx = iso(height, width, undefined))) {
      var _mx$max;

      v = mapper(v);

      if (v > ((_mx$max = mx.max) !== null && _mx$max !== void 0 ? _mx$max : mx.max = mx.min = v)) {
        mx.max = v;
      } else if (v < mx.min) {
        mx.min = v;
      }

      return mx[i][j] = v;
    }

    return NaN;
  }, height, width);
  return mx;
};
/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */


const multibound = (wordx, configs) => {
  const [h, w] = size$1(wordx);
  const matrixCollection = configs.map(_ => undefined);
  if (!h || !w) return matrixCollection;
  iterate$3(wordx, (v, i, j) => {
    configs.some(({
      filter,
      mapper
    }, k) => {
      var _mx;

      let mx = matrixCollection[k];

      if (filter(v) && ((_mx = mx) !== null && _mx !== void 0 ? _mx : mx = matrixCollection[k] = iso(h, w, undefined))) {
        var _mx$max;

        v = mapper(v);

        if (v > ((_mx$max = mx.max) !== null && _mx$max !== void 0 ? _mx$max : mx.max = mx.min = v)) {
          mx.max = v;
        } else if (v < mx.min) {
          mx.min = v;
        }

        mx[i][j] = v;
        return true;
      }
    });
  }, h, w);
  return matrixCollection;
};
/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */


const boundaries = function (wordx, configs = []) {
  const count = configs.length;
  if (count === 0) return [];

  if (count === 1) {
    var _x$filter, _x$mapper;

    const [x] = configs;
    const filter = (_x$filter = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter !== void 0 ? _x$filter : isNumeric$2,
          mapper = (_x$mapper = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper !== void 0 ? _x$mapper : parseNum$2;
    return [solebound(wordx, {
      filter,
      mapper
    })];
  }

  if (count === 2) {
    var _x$filter2, _x$mapper2, _y$filter, _y$mapper;

    const [x, y] = configs;
    const fX = (_x$filter2 = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter2 !== void 0 ? _x$filter2 : isNumeric$2,
          mX = (_x$mapper2 = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper2 !== void 0 ? _x$mapper2 : parseNum$2;
    const fY = (_y$filter = y === null || y === void 0 ? void 0 : y.filter) !== null && _y$filter !== void 0 ? _y$filter : hasLiteral,
          mY = (_y$mapper = y === null || y === void 0 ? void 0 : y.mapper) !== null && _y$mapper !== void 0 ? _y$mapper : stringValue$1;
    return duobound(wordx, [{
      filter: fX,
      mapper: mX
    }, {
      filter: fY,
      mapper: mY
    }]);
  }

  if (count >= 3) return multibound(wordx, configs);
};

/**
 *
 * @typedef {Object} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {*[][]} mx
 * @param {Preset[]} [config]
 * @returns {*[][]}
 */

function fluoByColumns(mx, config) {
  var _columnsMapper;

  const context = this;
  return _columnsMapper = columnsMapper(mx, col => fluoVector.call(context, col, config)), transpose(_columnsMapper);
}
/**
 *
 * @typedef {Object} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {*[][]} mx
 * @param {Preset[]} [config]
 * @returns {*[][]}
 */


function fluoByRows(mx, config) {
  const context = this,
        mapper$1 = context !== null && context !== void 0 && context.mutate ? mutate$5 : mapper$6;
  return mapper$1(mx, row => fluoVector.call(context, row, config));
}

const oneself = x => x;
/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */


const round = x => x + (x > 0 ? 0.5 : -0.5) << 0;

const rgbToInt = ([r, g, b]) => ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF);
/**
 * @param {[number,number,number]} rgb
 * @returns {string}
 */


const rgbToHex = rgb => '#' + rgbToInt(rgb).toString(16).toUpperCase().padStart(6, '0');
/**
 *
 * @param {number} n
 * @param {number} h
 * @param {number} a
 * @param {number} l
 * @returns {number}
 */


const hf = (n, h, a, l) => {
  const k = (n + h / 30) % 12;
  return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
};
/**
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns {number[]}
 */


function hslToRgb([h, s, l]) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l),
        r = hf(0, h, a, l),
        g = hf(8, h, a, l),
        b = hf(4, h, a, l);
  return [round(r * 0xFF), round(g * 0xFF), round(b * 0xFF)]; // return [r * 0xFF & 0xFF, g * 0xFF & 0xFF, b * 0xFF & 0xFF]
}

const hslToHex = hsl => {
  var _ref, _hsl;

  return _ref = (_hsl = hsl, hslToRgb(_hsl)), rgbToHex(_ref);
}; // export const
//   FUNC = '',
//   PIGM = '',
//   HEX = ''


const MAKER = 'maker',
      RENDER$4 = 'render',
      COLOR = 'color';
/**
 * @typedef {Object} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {*[][]} matrix
 * @param {Preset[]} configs
 * @returns {*[][]}
 */

const fluoByPoints = function (matrix, configs) {
  const [h, w] = size(matrix);
  if (!h || !w) return [[]];
  const projectorSet = makeProjector(matrix, configs);
  const mapper = this !== null && this !== void 0 && this.mutate ? mutate$2 : mapper$3;

  switch (this === null || this === void 0 ? void 0 : this.colorant) {
    case COLOR:
      return mapper(matrix, PointColorFactory.color(projectorSet));

    case MAKER:
      return mapper(matrix, PointColorFactory.maker(projectorSet));

    case RENDER$4:
    default:
      return mapper(matrix, PointColorFactory.render(projectorSet));
  }
};

const makeProjector = (matrix, configs = []) => {
  const [confX, confY] = configs;
  const [matX, matY] = boundaries(matrix, configs);
  const [projX, projY] = [ProjectorFactory.fromHEX(matX, confX), ProjectorFactory.fromHEX(matY, confY)];
  return [[matX, projX], [matY, projY]];
};

class PointColorFactory {
  static color([[bX, pX], [bY, pY]]) {
    function toColor(some) {
      var _some;

      return some ? (_some = some, hslToHex(_some)) : null;
    }

    return (_, i, j) => {
      let v;

      if (!nullish$1(v = bX && bX[i][j])) {
        var _pX$color;

        return _pX$color = pX.color(v), toColor(_pX$color);
      }

      if (!nullish$1(v = bY && bY[i][j])) {
        var _pY$color;

        return _pY$color = pY.color(v), toColor(_pY$color);
      }

      return null;
    };
  }

  static maker([[bX, pX], [bY, pY]]) {
    return (_, i, j) => {
      var _make, _ref;

      let v;

      if (!nullish$1(v = bX && bX[i][j])) {
        return pX.make(v);
      }

      if (!nullish$1(v = bY && bY[i][j])) {
        return pY.make(v);
      }

      return (_make = (_ref = pX || pY) === null || _ref === void 0 ? void 0 : _ref.make(pX.nap)) !== null && _make !== void 0 ? _make : oneself;
    };
  }

  static render([[bX, pX], [bY, pY]]) {
    return (n, i, j) => {
      var _render, _ref2;

      let v;

      if (!nullish$1(v = bX && bX[i][j])) {
        return pX.render(v, n);
      }

      if (!nullish$1(v = bY && bY[i][j])) {
        return pY.render(v, n);
      }

      return (_render = (_ref2 = pX || pY) === null || _ref2 === void 0 ? void 0 : _ref2.render(pX.nap, n)) !== null && _render !== void 0 ? _render : n;
    };
  }

}
/**
 *
 * @typedef {Object} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {*[][]} mx
 * @param {number} [direct=POINTWISE]
 * @param {Preset[]} [configs]
 */


const fluoMatrix = function (mx, direct, configs) {
  switch (direct) {
    case ROWWISE:
      return fluoByRows.call(this, mx, configs);

    case COLUMNWISE:
      return fluoByColumns.call(this, mx, configs);

    case POINTWISE:
    default:
      return fluoByPoints.call(this, mx, configs);
  }
};

const wind = (keys, values) => zipper$2(keys, values, (k, v) => [k, v]);

const unwind = (entries, h) => {
  h = h || (entries === null || entries === void 0 ? void 0 : entries.length);
  let keys = Array(h),
      values = Array(h);

  for (let r; --h >= 0 && (r = entries[h]);) {
    keys[h] = r[0];
    values[h] = r[1];
  }

  return [keys, values];
};

/**
 *
 * @param {[*,*][]} ea
 * @param {[*,*][]} eb
 * @param {function} keyMap
 * @param {function} [valMap]
 * @param {number} [l]
 * @returns {[*,*][]}
 */


const mutazip$2 = (ea, eb, keyMap, valMap, l) => {
  l = l || (ea === null || ea === void 0 ? void 0 : ea.length), valMap = valMap || keyMap;

  for (let a, b, i = 0; i < l && (a = ea[i]) && (b = eb[i]); i++) a[0] = keyMap(a[0], b[0], i), a[1] = valMap(a[1], b[1], i);

  return ea;
};

/**
 * @typedef {Object} Preset
 * @typedef {string} Preset.min
 * @typedef {string} Preset.max
 * @typedef {string} Preset.na
 * @typedef {string[]} Preset.effects
 * @typedef {Function} Preset.filter
 * @typedef {Function} Preset.mapper
 *
 * @param {[*,*][]} entries
 * @param {Preset[]} configs
 * @returns {*[]}
 */

const fluoEntries = function (entries, configs) {
  const colorant = this === null || this === void 0 ? void 0 : this.colorant,
        mutate = this === null || this === void 0 ? void 0 : this.mutate;
  let [keys, items] = unwind(entries);
  const context = {
    colorant,
    mutate: true
  };
  fluoVector.call(context, keys, configs);
  fluoVector.call(context, items, configs);
  const rendered = wind(keys, items);
  return mutate ? mutazip$2(entries, rendered, (a, b) => b) : rendered;
};

const v1 = word => (word.toLowerCase().charCodeAt(0) & 0x7f) << 21;

const v2 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14);

const v3 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7);

const v4 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7) + (word.charCodeAt(3) & 0x7f);

const stringValue = word => {
  const l = word === null || word === void 0 ? void 0 : word.length;
  if (!l) return NaN;
  if (typeof word !== STR$2) return NaN;
  if (l >= 8) return (v4(word.slice(0, 4)) << 2) + v4(word.slice(-4));
  if (l === 7) return (v4(word.slice(0, 4)) << 2) + v3(word.slice(-3));
  if (l === 6) return (v4(word.slice(0, 4)) << 2) + v2(word.slice(-2));
  if (l === 5) return (v4(word.slice(0, 4)) << 2) + v1(word.slice(-1));
  if (l === 4) return v4(word) << 2;
  if (l === 3) return v3(word) << 2;
  if (l === 2) return v2(word) << 2;
  if (l === 1) return v1(word) << 2;
};

const SP$2 = ' ';
const CO$1 = ',';
const DOT = '.';

const FULL_NUM = '０-９'; // 0xff10 - 0xff19

const REG_NUM_FULL = new RegExp(`^\s*[－＋]?(?:，*[${FULL_NUM}]+)*．?[${FULL_NUM}]+\s*$`);
/**
 *
 * @param {string} tx
 * @returns {boolean}
 */

const isNumeric$1 = tx => REG_NUM_FULL.test(tx);

const NON_SPACE = /[^\s]/;

const parseNum$1 = text => {
  if (!text) return NaN;
  let l = text.length,
      i = text.search(NON_SPACE),
      t = '',
      n,
      v;

  while (i < l && (n = text.charCodeAt(i++))) if (n !== 0xff0c) {
    v = 0xFF & n + 0x20;
    t += String.fromCharCode(v < n ? v : n);
  }

  return parseNum$3(t);
};

function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class Conv {}

_defineProperty$3(Conv, "cjkAndFullChars", text => {
  let tx = '',
      i = 0,
      l = text.length,
      n;

  while (i < l && (n = text.charCodeAt(i++))) tx += n < 0xff00 ? CharConv.cjkPunc(n) : CharConv.fullChars(n);

  return tx;
});

_defineProperty$3(Conv, "fullChars", text => {
  let tx = '',
      i = 0,
      l = text.length,
      n;

  while (i < l && (n = text.charCodeAt(i++))) tx += CharConv.fullChars(n);

  return tx;
});

class CharConv {
  static cjkPunc(charCode) {
    if (charCode === 0x3000) return SP$2;
    if (charCode === 0x3001) return CO$1;
    if (charCode === 0x3002) return DOT;
    if (charCode === 0x3010) return '[';
    if (charCode === 0x3011) return ']';
    return String.fromCharCode(charCode);
  }

  static fullChars(charCode) {
    return String.fromCharCode(0xFF & charCode + 0x20);
  }

}

const ANSI_ALPHA$2 = /(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?)/;
const ANSI_BETA$2 = /(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~])/;
const ANSI$2 = new RegExp(`[][[\\]()#;?]*(?:${ANSI_ALPHA$2.source}|${ANSI_BETA$2.source})`);
const ASTRAL$1 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/; // 1024 * 1024
//
// Block                                   Range       Comment
// CJK Unified Ideographs                  4E00-9FFF   Common
// CJK Unified Ideographs Extension A      3400-4DBF   Rare
// CJK Unified Ideographs Extension B      20000-2A6DF Rare, historic
// CJK Unified Ideographs Extension C      2A700–2B73F Rare, historic
// CJK Unified Ideographs Extension D      2B740–2B81F Uncommon, some in current use
// CJK Unified Ideographs Extension E      2B820–2CEAF Rare, historic
// CJK Compatibility Ideographs            F900-FAFF   Duplicates, unifiable variants, corporate characters
// CJK Compatibility Ideographs Supplement 2F800-2FA1F Unifiable variants

const ANSI_G$2 = new RegExp(ANSI$2, 'g');
const ASTRAL_G$1 = new RegExp(ASTRAL$1, 'g');

const hasAnsi$1 = tx => ANSI$2.test(tx);

const COMMA$2 = /,/g;

const isNumeric = x => {
  var _x;

  x = (_x = x) === null || _x === void 0 ? void 0 : _x.replace(COMMA$2, '');
  return !isNaN(x - parseFloat(x));
};

const validate = (x, y) => isNaN(x - y) ? NaN : y;

const parseNum = x => {
  var _x;

  x = (_x = x) === null || _x === void 0 ? void 0 : _x.replace(COMMA$2, '');
  return validate(x, parseFloat(x));
};

const nullish = x => x === null || x === void 0;

const replenish = (object, another) => {
  for (let k in another) if (nullish(object[k])) object[k] = another[k];

  return object;
};

const iterate$1 = function (vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (let i = 0; i < l; i++) fn.call(this, vec[i], i);
};

const reviter$1 = function (vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (--l; l >= 0; l--) fn.call(this, vec[l], l);
};

const mapper$1$1 = function (vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);
  const ve = Array(l);

  for (--l; l >= 0; l--) ve[l] = fn.call(this, vec[l], l);

  return ve;
};

const mutate$1 = (vec, fn, l) => {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (--l; l >= 0; l--) vec[l] = fn(vec[l], l);

  return vec;
};

var Mapper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iterate: iterate$1,
  mapper: mapper$1$1,
  mutate: mutate$1,
  reviter: reviter$1
});

function duozipper(a, b) {
  let {
    fn,
    lo,
    hi
  } = this;
  lo = lo || 0;
  const vec = Array(hi = hi || (a === null || a === void 0 ? void 0 : a.length));

  for (--hi; hi >= lo; hi--) vec[hi] = fn(a[hi], b[hi], hi);

  return vec;
}

function trizipper(a, b, c) {
  let {
    fn,
    lo,
    hi
  } = this;
  lo = lo || 0;
  const vec = Array(hi = hi || (a === null || a === void 0 ? void 0 : a.length));

  for (--hi; hi >= lo; hi--) vec[hi] = fn(a[hi], b[hi], c[hi], hi);

  return vec;
}

function quazipper(a, b, c, d) {
  let {
    fn,
    lo,
    hi
  } = this;
  lo = lo || 0;
  const vec = Array(hi = hi || (a === null || a === void 0 ? void 0 : a.length));

  for (--hi; hi >= lo; hi--) vec[hi] = fn(a[hi], b[hi], c[hi], d[hi], hi);

  return vec;
}

const Duozipper$1 = (fn, {
  lo,
  hi
} = {}) => duozipper.bind({
  fn,
  lo,
  hi
});

const Trizipper$1 = (fn, {
  lo,
  hi
} = {}) => trizipper.bind({
  fn,
  lo,
  hi
});

const Quazipper$1 = (fn, {
  lo,
  hi
} = {}) => quazipper.bind({
  fn,
  lo,
  hi
});
/**
 * zip two arrays, return the zipped array
 * @param {Array} a
 * @param {Array} b
 * @param {function(*,*,number?):*} fn
 * @param {number} [l]
 * @returns {*[]}
 */


const zipper$1 = (a, b, fn, l) => duozipper.call({
  fn,
  hi: l
}, a, b);

const mutazip$1 = (va, vb, fn, l) => {
  l = l || (va === null || va === void 0 ? void 0 : va.length);

  for (--l; l >= 0; l--) va[l] = fn(va[l], vb[l], l);

  return va;
};

var Zipper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Duozipper: Duozipper$1,
  Quazipper: Quazipper$1,
  Trizipper: Trizipper$1,
  mutazip: mutazip$1,
  zipper: zipper$1
});
const {
  iterate,
  reviter,
  mapper: mapper$2,
  mutate
} = Mapper;
const {
  zipper,
  mutazip,
  Duozipper,
  Trizipper,
  Quazipper
} = Zipper;

const isNumericAny = x => isNumeric$1(x) || isNumeric(x);

const NUM_BOUND_CONF_FULL = {
  filter: isNumericAny,
  mapper: parseNum$1
};
const STR_BOUND_CONF_FULL = {
  filter: isLiteralAny,
  mapper: stringValue
};
const NUM_BOUND_CONF_HALF = {
  filter: isNumeric,
  mapper: parseNum
};
const STR_BOUND_CONF_HALF = {
  filter: isLiteral,
  mapper: stringValue
};

class PresetCollection extends Array {
  constructor(presets) {
    super(presets.length);
    mutazip(this, presets, (receiver, preset) => Object.assign({}, preset));
  }

  static build(...presets) {
    return new PresetCollection(presets);
  }

  assignPresets(...presets) {
    // if (this.length < presets.length) {this.length = presets.length}
    return mutazip(this, presets, (conf, preset) => Object.assign(conf !== null && conf !== void 0 ? conf : {}, preset), presets.length);
  }

  replenishPresets(...presets) {
    // if (this.length < presets.length) {this.length = presets.length}
    return mutazip(this, presets, (conf, preset) => replenish(conf !== null && conf !== void 0 ? conf : {}, preset), presets.length);
  }

  assignEffect(...effects) {
    if (effects.length === 0) return this;
    return mutate(this, conf => (conf.effects = effects, conf));
  }

  setBound(full) {
    const boundConfigs = full ? [NUM_BOUND_CONF_FULL, STR_BOUND_CONF_FULL, STR_BOUND_CONF_FULL] : [NUM_BOUND_CONF_HALF, STR_BOUND_CONF_HALF, STR_BOUND_CONF_HALF];
    return mutazip(this, boundConfigs, (conf, boundConf) => Object.assign(conf, boundConf));
  }

} // if (presets.length === 0) presets = [NUMERIC_PRESET, LITERAL_PRESET]

function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class DecoConfig {
  /** @type {PresetCollection} */

  /** @type {string[]} */

  /** @type {boolean} */

  /** @param {Object} conf */
  constructor(conf) {
    _defineProperty$2(this, "presets", void 0);

    _defineProperty$2(this, "effects", void 0);

    _defineProperty$2(this, "full", void 0);

    if (!conf) {
      return;
    }

    Object.assign(this, conf);
    if (conf.presets) this.resetPresets(conf.presets, conf.effects, conf.full);
  }
  /**
   * @param {Object} [conf]
   * @returns {DecoConfig}
   */


  static build(conf) {
    return new DecoConfig(conf);
  }

  static parse(userConfig, defaultConfig, defaultPresets) {
    const conf = DecoConfig.build(userConfig);
    if (defaultConfig) conf.replenishConfigs(defaultConfig);
    if (defaultPresets) conf.defaultPresets.apply(conf, defaultPresets);
    return conf;
  }

  assignConfigs(configs) {
    return Object.assign(this, configs);
  }

  replenishConfigs(configs) {
    return replenish(this, configs);
  }

  resetPresets(presets, effects, full) {
    this.presets = Array.isArray(presets) ? PresetCollection.build.apply(null, presets) : PresetCollection.build.call(null, presets, presets);
    if (effects !== null && effects !== void 0 && effects.length) Array.isArray(effects) ? this.assignEffect.apply(this, effects) : this.assignEffect.call(this, effects);
    if (!nullish$1(full)) this.setBound(full);
    return this;
  }

  assignPresets(...presets) {
    var _this$presets;

    return this.presets ? ((_this$presets = this.presets) !== null && _this$presets !== void 0 && _this$presets.assignPresets.apply(this.presets, presets), this) : this.resetPresets(presets);
  }

  assignEffect(...effects) {
    var _this$presets2;

    return (_this$presets2 = this.presets) !== null && _this$presets2 !== void 0 && _this$presets2.assignEffect.apply(this.presets, effects), this;
  }

  setBound(full) {
    var _this$presets3;

    return (_this$presets3 = this.presets) !== null && _this$presets3 !== void 0 && _this$presets3.setBound.call(this.presets, full), this;
  }

  defaultPresets(...presets) {
    if (nullish$1(this.presets)) this.resetPresets(presets, this.effects, this.full);
    return this;
  } // defaultEffects(...effects) {
  //   if (effects?.length && !nullish(this.presets)) iterate(this.presets, preset => { if (!preset?.effect) preset.effects = effects })
  //   return this
  // }
  // defaultBound(full) {
  //   if (!nullish(full) && !nullish(this.presets)) this.setBound(full)
  //   return this
  // }


}

const SP$1 = ' ';
const TB = '  ';
const CO = ',';
const LF$1 = '\n';
const QT = '\'';
const RT = ':';
const DASH = '-';
const COSP = CO + SP$1;
const COLF = CO + LF$1;

const NUMERIC_PRESET = FRESH;
const LITERAL_PRESET = PLANET;
const DUAL_PRESET_COLLECTION = [NUMERIC_PRESET, LITERAL_PRESET];

const LITERAL$2 = /[a-z]+|[A-Z][a-z]+|(?<=[a-z]|\W|_)[A-Z]+(?=[A-Z][a-z]|\W|_|$)|[\d]+[a-z]*/g;

const splitter = function (text) {
  const regex = this;
  let ms,
      l = 0,
      r = 0,
      sp,
      ph;
  const vec = [];

  while ((ms = regex.exec(text)) && ([ph] = ms)) {
    r = ms.index;
    if (sp = text.slice(l, r)) vec.push(sp);
    vec.push(ph);
    l = regex.lastIndex;
  }

  if (l < text.length) vec.push(text.slice(l));
  return vec;
};
/**
 * @type {Function|function(string):string[]}
 * @function
 */


const splitLiteral = splitter.bind(LITERAL$2);

const ANSI_ALPHA$1 = /(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?)/;
const ANSI_BETA$1 = /(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~])/;
const ANSI$1 = new RegExp(`[][[\\]()#;?]*(?:${ANSI_ALPHA$1.source}|${ANSI_BETA$1.source})`);
//
// Block                                   Range       Comment
// CJK Unified Ideographs                  4E00-9FFF   Common
// CJK Unified Ideographs Extension A      3400-4DBF   Rare
// CJK Unified Ideographs Extension B      20000-2A6DF Rare, historic
// CJK Unified Ideographs Extension C      2A700–2B73F Rare, historic
// CJK Unified Ideographs Extension D      2B740–2B81F Uncommon, some in current use
// CJK Unified Ideographs Extension E      2B820–2CEAF Rare, historic
// CJK Compatibility Ideographs            F900-FAFF   Duplicates, unifiable variants, corporate characters
// CJK Compatibility Ideographs Supplement 2F800-2FA1F Unifiable variants

const ANSI_G$1 = new RegExp(ANSI$1, 'g');

const clearAnsi = tx => tx.replace(ANSI_G$1, '');

const hasAnsi = tx => ANSI$1.test(tx);

const SPACE = /\s+/g;
const LINEFEED$1 = /\r?\n/;

const foldToVector = function (text) {
  const {
    width: wd = 80,
    regex = SPACE,
    firstLineIndent
  } = this !== null && this !== void 0 ? this : {};
  const lines = [];
  let ms,
      ph,
      pr = 0,
      cu = 0,
      la = 0,
      nx = 0,
      th = pr + wd;
  if (firstLineIndent) text = SP$1.repeat(firstLineIndent) + text;

  while ((ms = regex.exec(text)) && ([ph] = ms)) {
    // VO |> says['progress'].p(pr).p(DA).br(cu + ':' + la).p(DA).br(nx).p(codes(ph)).br(/\r?\n/.test(ph)).p(DA).p(th)
    nx = ms.index;
    if (nx > th) lines.push(text.slice(pr, cu)), pr = la, th = pr + wd;
    if (LINEFEED$1.test(ph)) lines.push(text.slice(pr, nx)), pr = regex.lastIndex, th = pr + wd;
    cu = nx, la = regex.lastIndex;
  }

  if (text.length > th) lines.push(text.slice(pr, cu)), pr = la;
  if (pr < text.length) lines.push(text.slice(pr));
  if (firstLineIndent) lines[0] = lines[0].slice(firstLineIndent);
  return lines;
};

const fold = function (text) {
  var _this$delim, _text;

  const context = this;
  const delim = (_this$delim = this === null || this === void 0 ? void 0 : this.delim) !== null && _this$delim !== void 0 ? _this$delim : LF$1;
  const lines = (_text = text, foldToVector.bind(context)(_text));
  return lines.join(delim);
};

const LITERAL$1 = /[a-z]+|[A-Z][a-z]+|(?<=[a-z]|\W|_)[A-Z]+(?=[A-Z][a-z]|\W|_|$)|[\d]+[a-z]*/g;

const ripper$1 = function (text) {
  const regex = this;
  let ms,
      l = 0,
      r = 0,
      sp,
      ph;
  const vec = [];

  while ((ms = regex.exec(text)) && ([ph] = ms)) {
    r = ms.index;
    if (sp = text.slice(l, r)) vec.push(sp);
    vec.push(ph);
    l = regex.lastIndex;
  }

  if (l < text.length) vec.push(text.slice(l));
  return vec;
};
/**
 * @type {Function|function(string):string[]}
 * @function
 */


ripper$1.bind(LITERAL$1);

const CONFIG$2 = {
  vectify: splitLiteral,
  width: 0
}; // export const
//   FUNC = '',
//   PIGM = '',
//   HEX = ''

const RENDER$3 = 'render';
const MUTATE_PIGMENT$3 = {
  colorant: RENDER$3,
  mutate: true
};
/**
 * @prop width - foldToVector
 * @prop firstLineIndent - foldToVector
 * @prop indent - applicable only when valid width
 * @prop vectify - fluoString
 * @prop joiner - fluoString
 * @prop presets - fluoString
 * @prop effects - fluoString
 * @param text
 * @return {string}
 */

const _decoString = function (text) {
  var _text, _config$indent;

  const config = this,
        width = config.width,
        length = (_text = text) === null || _text === void 0 ? void 0 : _text.length;
  if (!length) return '';
  if (hasAnsi(text)) return text;
  if (width && length > width) text = fold.call({
    width: width,
    firstLineIndent: config.firstLineIndent,
    delim: LF$1 + TB.repeat((_config$indent = config.indent) !== null && _config$indent !== void 0 ? _config$indent : 0)
  }, text);
  if (config.presets) text = stringColour.call(config, text);
  return text;
};

const stringColour = function (text) {
  const config = this;
  const {
    vectify,
    joiner
  } = this;
  const words = vectify(text);
  fluoVector.call(MUTATE_PIGMENT$3, words, config.presets); // use: presets, effects

  return joiner ? joiner(words) : words.join('');
};
/**
 * @param {string} text
 * @param {Object} [p]
 * @param {number} [p.width=80]
 * @param {number} [p.indent]
 * @param {number} [p.firstLineIndent]
 * @param {Object[]} [p.presets]
 * @param {string[]} [p.effects]
 * @param {Function} [p.vectify]
 * @param {Function} [p.joiner]
 * @return {string}
 */


const deco$1 = (text, p = {}) => _decoString.call(DecoConfig.parse(p, CONFIG$2, DUAL_PRESET_COLLECTION), text);

const mapper$1 = (o, fn) => {
  const ob = {};

  for (let k in o) if (Object.hasOwnProperty.call(o, k)) ob[k] = fn(o[k]);

  return ob;
};

const NONE = 0;
const PAR = 1,
      BRK$1 = 2,
      BRC$1 = 3,
      ANBR = 4;

const parenth$2 = x => '(' + x + ')';

const bracket$2 = x => '[' + x + ']';

const brace = x => '{' + x + '}';

const anglebr = x => '<' + x + '>';

const br = (x, mode) => {
  if (mode === PAR) return parenth$2(x);
  if (mode === BRK$1) return bracket$2(x);
  if (mode === BRC$1) return brace(x);
  if (mode === ANBR) return anglebr(x);
  return x;
};

const Br = mode => {
  if (mode === PAR) return parenth$2;
  if (mode === BRK$1) return bracket$2;
  if (mode === BRC$1) return brace;
  if (mode === ANBR) return anglebr;
  return mode ? bracket$2 : null;
}; // export const Br = (read, mode) => {

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classPrivateFieldGet$1(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor$1(receiver, privateMap, "get");

  return _classApplyDescriptorGet$1(receiver, descriptor);
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor$1(receiver, privateMap, "set");

  _classApplyDescriptorSet(receiver, descriptor, value);

  return value;
}

function _classExtractFieldDescriptor$1(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

function _classApplyDescriptorGet$1(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

class Callable$1 extends Function {
  constructor(f) {
    super();
    Reflect.setPrototypeOf(f, new.target.prototype);
    return f;
  }

}

const tab = ind => SP$1.repeat(ind << 1);

const logBy = (text, config) => {
  let {
    name,
    des,
    ind,
    log,
    att
  } = config;
  let signature = `${tab(ind)}[${name}]`;
  if (att) signature += SP$1 + att();
  if (des !== null && des !== void 0 && des.length) signature += des, config.des = '';
  if (typeof text !== STR$2) text += '';
  return void log(signature, text.includes(LF$1) ? (LF$1 + text).replace(/\n/g, LF$1 + tab(++ind)) : text);
}; // const WRITABLE = { writable: true }

/** @type {function} */


class Pal extends Callable$1 {
  /** @type {string}   */

  /** @type {string}   */

  /** @type {number}   */

  /** @type {Function} */

  /** @type {Function} */
  constructor(name, {
    indent = 0,
    logger,
    attach
  } = {}) {
    // const f = text => logBy(text, this)
    // Object.defineProperty(f, NAME, WRITABLE)
    // super(f)
    super(text => logBy(text, this));

    _defineProperty$1(this, "name", '');

    _defineProperty$1(this, "des", '');

    _defineProperty$1(this, "ind", 0);

    _defineProperty$1(this, "log", console.log);

    _defineProperty$1(this, "att", void 0);

    if (name) this.name = name;
    if (indent) this.ind = indent;
    if (logger) this.log = logger;
    if (attach) this.attach(attach);
  }

  p(words) {
    return this.des += SP$1 + words, this;
  }

  br(words) {
    return this.des += SP$1 + parenth$2(words), this;
  }

  to(someone) {
    if (someone instanceof Pal) someone = someone.name;
    this.des += ' -> ' + bracket$2(someone);
    return this;
  }

  attach(func) {
    if (typeof func === FUN) {
      this.att = func;
    }

    return this;
  }

  detach() {
    return this.att = null, this;
  }

  level(logger) {
    if (typeof logger === STR$2 && logger in console) {
      return this.log = console[logger], this;
    }

    if (typeof logger === FUN) {
      return this.log = logger, this;
    }

    return this;
  }

  get asc() {
    return this.ind++, this;
  }

  get desc() {
    return this.ind && this.ind--, this;
  }
  /**
   * @param {string} title
   * @param {Object} [options]
   * @returns {Pal|function}
   */


  static build(title, options) {
    return new Pal(title, options);
  }

}

var _roster = new WeakMap();

var _pool = new WeakMap();

var _effects = new WeakMap();

class Says {
  /** @type {Object<string,Pal|function>} */

  /** @type {Generator<{max:*,min:*,na:*}>} */

  /** @type {string[]!} */
  constructor(roster, effects) {
    _roster.set(this, {
      writable: true,
      value: {}
    });

    _pool.set(this, {
      writable: true,
      value: presetFlopper({
        exhausted: false
      })
    });

    _effects.set(this, {
      writable: true,
      value: undefined
    });

    if (roster) _classPrivateFieldSet(this, _roster, roster);

    _classPrivateFieldSet(this, _effects, effects);

    return new Proxy(this, {
      /** @returns {Pal|function} */
      get(t, p) {
        if (p in t) return typeof (p = t[p]) === FUN ? p.bind(t) : p;
        if (p in _classPrivateFieldGet$1(t, _roster)) return _classPrivateFieldGet$1(t, _roster)[p];
        return t.aboard(p, _classPrivateFieldGet$1(t, _pool).next().value);
      }

    });
  }

  aboard(name, presets) {
    var _deco;

    return _classPrivateFieldGet$1(this, _roster)[name] = (_deco = deco$1(String(name), {
      presets: presets !== null && presets !== void 0 ? presets : _classPrivateFieldGet$1(this, _pool).next().value,
      effects: _classPrivateFieldGet$1(this, _effects)
    }), Pal.build(_deco));
  }

  roster(name) {
    var _classPrivateFieldGet2;

    if (name) return ((_classPrivateFieldGet2 = _classPrivateFieldGet$1(this, _roster)[name]) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : this.aboard(name)).name;
    return mapper$1(_classPrivateFieldGet$1(this, _roster), ({
      name
    }) => name);
  }
  /**
   *
   * @param roster
   * @param effects
   * @returns {Says|Object<string,function>}
   */


  static build({
    roster,
    effects = [ITALIC$1]
  } = {}) {
    return new Says(roster, effects);
  }

}
/** @type {Function|Says} */


new Says();

var _ref$1$1, _ref2$1, _ref3$1, _ref4$1, _ref5$1, _ref6$1, _ref7$1, _ref8$1;

const Dyes$1 = {
  0: Dye((_ref$1$1 = [45, 100, 53], hslToRgb$2(_ref$1$1))),
  1: Dye((_ref2$1 = [44, 100, 59], hslToRgb$2(_ref2$1))),
  2: Dye((_ref3$1 = [43, 100, 64], hslToRgb$2(_ref3$1))),
  3: Dye((_ref4$1 = [42, 100, 70], hslToRgb$2(_ref4$1))),
  4: Dye((_ref5$1 = [41, 100, 74], hslToRgb$2(_ref5$1))),
  5: Dye((_ref6$1 = [40, 100, 78], hslToRgb$2(_ref6$1))),
  6: Dye((_ref7$1 = [39, 100, 82], hslToRgb$2(_ref7$1))),
  7: Dye((_ref8$1 = [37, 100, 86], hslToRgb$2(_ref8$1)))
};
const L$1 = '{ ',
      R$1 = ' }';
const BRC = mapper$1(Dyes$1, dye => {
  var _L, _R;

  const l = (_L = L$1, dye(_L)),
        r = (_R = R$1, dye(_R));
  return content => l + content + r;
});

var _ref$2, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;

const Dyes = {
  0: Dye((_ref$2 = [199, 100, 63], hslToRgb$2(_ref$2))),
  1: Dye((_ref2 = [201, 100, 68], hslToRgb$2(_ref2))),
  2: Dye((_ref3 = [203, 100, 72], hslToRgb$2(_ref3))),
  3: Dye((_ref4 = [205, 100, 76], hslToRgb$2(_ref4))),
  4: Dye((_ref5 = [207, 100, 84], hslToRgb$2(_ref5))),
  5: Dye((_ref6 = [209, 100, 80], hslToRgb$2(_ref6))),
  6: Dye((_ref7 = [211, 100, 88], hslToRgb$2(_ref7))),
  7: Dye((_ref8 = [214, 100, 90], hslToRgb$2(_ref8)))
};
const L = '[ ',
      R = ' ]';
const BRK = mapper$1(Dyes, dye => {
  var _L, _R;

  const l = (_L = L, dye(_L)),
        r = (_R = R, dye(_R));
  return content => l + content + r;
});

var _Cards$brown$lighten_, _Cards$lightGreen$acc, _Cards$deepOrange$acc, _Cards$teal$lighten_, _Cards$brown$lighten_2, _Cards$blueGrey$light, _Cards$blue$accent_, _Cards$amber$base, _Cards$green$accent_;
/**
 *
 * @type {Object<string,Function>}
 */


const PAL = {
  IDX: Dye((_Cards$brown$lighten_ = Cards.brown.lighten_5, hexToRgb(_Cards$brown$lighten_))),
  STR: Dye((_Cards$lightGreen$acc = Cards.lightGreen.accent_2, hexToRgb(_Cards$lightGreen$acc))),
  NUM: Dye((_Cards$deepOrange$acc = Cards.deepOrange.accent_2, hexToRgb(_Cards$deepOrange$acc))),
  BOO: Dye((_Cards$teal$lighten_ = Cards.teal.lighten_2, hexToRgb(_Cards$teal$lighten_))),
  UDF: Dye((_Cards$brown$lighten_2 = Cards.brown.lighten_3, hexToRgb(_Cards$brown$lighten_2))),
  SYM: Dye((_Cards$blueGrey$light = Cards.blueGrey.lighten_2, hexToRgb(_Cards$blueGrey$light))),
  BRK: Dye((_Cards$blue$accent_ = Cards.blue.accent_2, hexToRgb(_Cards$blue$accent_))),
  BRC: Dye((_Cards$amber$base = Cards.amber.base, hexToRgb(_Cards$amber$base))),
  FNC: Dye((_Cards$green$accent_ = Cards.green.accent_4, hexToRgb(_Cards$green$accent_)))
};
({
  0: {
    max: hslToHex$2([75, 90, 85]),
    min: hslToHex$2([89, 99, 72]),
    na: Cards.grey.lighten_4
  },
  1: {
    max: hslToHex$2([80, 88, 87]),
    min: hslToHex$2([83, 98, 71]),
    na: Cards.grey.lighten_4
  },
  2: {
    max: hslToHex$2([93, 87, 82]),
    min: hslToHex$2([93, 97, 70]),
    na: Cards.grey.lighten_3
  },
  3: {
    max: hslToHex$2([103, 86, 82]),
    min: hslToHex$2([103, 96, 69]),
    na: Cards.grey.lighten_2
  },
  4: {
    max: hslToHex$2([113, 85, 82]),
    min: hslToHex$2([113, 95, 68]),
    na: Cards.grey.lighten_1
  },
  5: {
    max: hslToHex$2([123, 84, 82]),
    min: hslToHex$2([123, 94, 68]),
    na: Cards.grey.base
  },
  6: {
    max: hslToHex$2([133, 83, 82]),
    min: hslToHex$2([133, 93, 68]),
    na: Cards.grey.darken_1
  },
  7: {
    max: hslToHex$2([143, 82, 82]),
    min: hslToHex$2([143, 92, 68]),
    na: Cards.grey.darken_2
  }
});

const Colorant = (bound, preset = PLANET) => {
  const core = ProjectorConfig.fromHEX(bound, preset);
  const dyeNAp = core.dyeNAp;
  return x => isNumeric$3(x) ? core.fab(core.project(x)) : dyeNAp;
};

const padDeci = x => x >= 10 ? '' + x : '0' + x;

const padKilo = x => x >= 1000 ? '' + x : ('' + x).padStart(4, '0');

const padMilli = ms => (ms = '' + ms).length > 2 ? ms : ('00' + ms).slice(-3);

class Timestamp {
  constructor(datePreset, timePreset, milliPreset) {
    if (datePreset) {
      this.dy = Colorant({
        min: 1990,
        max: 2030
      }, datePreset);
      this.dm = Colorant({
        min: 1,
        max: 12
      }, datePreset);
      this.dd = Colorant({
        min: 1,
        max: 31
      }, datePreset);
    }

    if (timePreset) {
      this.dh = Colorant({
        min: 0,
        max: 23
      }, timePreset);
      this.ds = Colorant({
        min: 0,
        max: 59
      }, timePreset);
    }

    if (milliPreset) {
      this.dt = Colorant({
        min: 0,
        max: 999
      }, milliPreset);
    }
  }

  static build(datePreset = METRO, timePreset = SUBTLE, milliPreset = SUBTLE) {
    return new Timestamp(datePreset, timePreset, milliPreset);
  }
  /** @param {Date} dt */


  date(dt = new Date()) {
    return this.decoYMD(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
  }
  /** @param {Date} dt */


  roughTime(dt = new Date()) {
    return this.decoHMS(dt.getHours(), dt.getMinutes(), dt.getSeconds());
  }
  /** @param {Date} dt */


  time(dt = new Date()) {
    return this.roughTime(dt) + '.' + this.decoMilli(dt.getMilliseconds());
  }
  /** @param {Date} dt */


  dateTime(dt = new Date()) {
    return this.date(dt) + QT + this.roughTime(dt);
  }

  decoYMD(year, month, day) {
    var _padKilo, _padDeci, _padDeci2;

    return this.dy ? (_padKilo = padKilo(year), this.dy(year)(_padKilo)) + DASH + (_padDeci = padDeci(month), this.dm(month)(_padDeci)) + DASH + (_padDeci2 = padDeci(day), this.dd(day)(_padDeci2)) : padKilo(year) + DASH + padDeci(month) + DASH + padDeci(day);
  }

  decoHMS(hour, minute, second) {
    var _padDeci3, _padDeci4, _padDeci5;

    return this.dh ? (_padDeci3 = padDeci(hour), this.dh(hour)(_padDeci3)) + RT + (_padDeci4 = padDeci(minute), this.ds(minute)(_padDeci4)) + RT + (_padDeci5 = padDeci(second), this.ds(second)(_padDeci5)) : padDeci(hour) + RT + padDeci(minute) + RT + padDeci(second);
  }

  decoMilli(milli) {
    var _padMilli;

    return this.dt ? (_padMilli = padMilli(milli), this.dt(milli)(_padMilli)) : padMilli(milli);
  }

}

const timestamp = Timestamp.build();
/** @type {Function} */

timestamp.date.bind(timestamp);
/** @type {Function} */

timestamp.time.bind(timestamp);
/** @type {Function} */

timestamp.roughTime.bind(timestamp);
/** @type {Function} */

const dateTime = timestamp.dateTime.bind(timestamp);

const decoDateTime = dateTime;

const ANSI_ALPHA = /(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?)/;
const ANSI_BETA = /(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~])/;
const ANSI = new RegExp(`[][[\\]()#;?]*(?:${ANSI_ALPHA.source}|${ANSI_BETA.source})`);
const ASTRAL = /[\uD800-\uDBFF][\uDC00-\uDFFF]/; // 1024 * 1024
//
// Block                                   Range       Comment
// CJK Unified Ideographs                  4E00-9FFF   Common
// CJK Unified Ideographs Extension A      3400-4DBF   Rare
// CJK Unified Ideographs Extension B      20000-2A6DF Rare, historic
// CJK Unified Ideographs Extension C      2A700–2B73F Rare, historic
// CJK Unified Ideographs Extension D      2B740–2B81F Uncommon, some in current use
// CJK Unified Ideographs Extension E      2B820–2CEAF Rare, historic
// CJK Compatibility Ideographs            F900-FAFF   Duplicates, unifiable variants, corporate characters
// CJK Compatibility Ideographs Supplement 2F800-2FA1F Unifiable variants

const ANSI_G = new RegExp(ANSI, 'g');
const ASTRAL_G = new RegExp(ASTRAL, 'g');

/**
 *
 * @param {string} tx
 * @returns {number}
 */

const lange$1 = tx => tx.replace(ANSI_G, '').replace(ASTRAL_G, '_').length;

const Lange = ansi => ansi ? lange$1 : x => x.length;

const DECOFUN_CONFIG = {
  pr: true,
  fw: 160,
  aw: 192
};

var _Blue$lighten_, _LightBlue$accent_, _LightBlue$lighten_, _Lime$lighten_, _ref$1, _function, _Grey$base, _return, _Brown$lighten_;

const nameDye = Dye((_Blue$lighten_ = Blue.lighten_2, hexToRgb(_Blue$lighten_)));
const argsDye = Dye((_LightBlue$accent_ = LightBlue.accent_2, hexToRgb(_LightBlue$accent_)));
const bodyDye = Dye((_LightBlue$lighten_ = LightBlue.lighten_3, hexToRgb(_LightBlue$lighten_)));
const arrowDye = Dye((_Lime$lighten_ = Lime.lighten_1, hexToRgb(_Lime$lighten_)));
const PresetDye = (_ref$1 = [[/function/gi, (_function = 'function', Dye((_Grey$base = Grey.base, hexToRgb(_Grey$base)))(_function))], [/return/gi, (_return = 'return', Dye((_Brown$lighten_ = Brown.lighten_3, hexToRgb(_Brown$lighten_)))(_return))], [/\bthis\b/gi, x => {
  var _x, _BlueGrey$accent_;

  return _x = x, Dye((_BlueGrey$accent_ = BlueGrey.accent_2, hexToRgb(_BlueGrey$accent_)))(_x);
}], [/\b(if|else|while|do|switch|for)\b/gi, x => {
  var _x2, _Purple$lighten_;

  return _x2 = x, Dye((_Purple$lighten_ = Purple.lighten_3, hexToRgb(_Purple$lighten_)))(_x2);
}], [/\b(var|let|const)\b/gi, x => {
  var _x3, _DeepPurple$lighten_;

  return _x3 = x, Dye((_DeepPurple$lighten_ = DeepPurple.lighten_3, hexToRgb(_DeepPurple$lighten_)))(_x3);
}]], translator.makeReplaceable(_ref$1));

const funcName = func => {
  var _func$name;

  return `[fn:(${(_func$name = func === null || func === void 0 ? void 0 : func.name) !== null && _func$name !== void 0 ? _func$name : '<anonym>'})]`;
};

const FUNCTION_BODY = /function\s*(\w*)\s*\(([\w\s,]+)\)\s*\{\s*return(.+);?\s*\}/gs;
const THIS_REG = /\bthis\b/;
const FUNCTION_INITIAL = /^function/;
const LINEFEEDS = /\n\s*(\n\s*)/g;

const funcToLined = func => {
  return func.toString().replace(LINEFEEDS, (_, p1) => p1);
};

const flatten = (text, flatMark) => {
  const temp = text.replace(/\s+/g, ' ');
  if (temp.length <= flatMark) text = temp.replace(/;\s*}/g, ' }');
  return text;
};

const lambdafy = (text, pretty, defaultName = 'anonym') => {
  if (!THIS_REG.test(text)) text = pretty ? text.replace(FUNCTION_BODY, (_, name, args, body) => nameDye(name === 'anonymous' ? defaultName : name) + SP$1 + parenth$2(argsDye(args.trim())) + SP$1 + arrowDye('=>') + bodyDye(body)) : text.replace(FUNCTION_BODY, (_, name, args, body) => name + SP$1 + parenth$2(args) + SP$1 + '=>' + body);
  return text.replace(FUNCTION_INITIAL, '').trim();
};

const abbrev = (text, abbrMark, func) => {
  if (lange$1(text) > abbrMark) return funcName(func);
  return text;
};

const prettify = (text, pretty) => {
  if (pretty) return text.replace(PresetDye);
  return text;
};

const _decoFunc = function (func) {
  let text;
  const {
    pr,
    fw,
    aw
  } = this;
  text = funcToLined(func);
  text = flatten(text, fw);
  text = lambdafy(text, pr, func === null || func === void 0 ? void 0 : func.name);
  text = abbrev(text, aw, func);
  return prettify(text, pr);
};

// from x => Object.prototype.toString.call(x)
const OBJECT = 'Object';
const ARRAY = 'Array';
const DATE = 'Date';

const DIGIT_2 = '2-digit';
const DATE_CONFIG = {
  year: DIGIT_2,
  month: DIGIT_2,
  day: DIGIT_2
};
/** @type {Intl.DateTimeFormat} */

const FormatDate = new Intl.DateTimeFormat(undefined, DATE_CONFIG);
FormatDate.format.bind(FormatDate);

const NUMERIC = 'numeric';
const TIME_CONFIG = {
  hour: NUMERIC,
  minute: NUMERIC,
  second: NUMERIC,
  hour12: false
};
/** @type {Intl.DateTimeFormat} */

const FormatTime = new Intl.DateTimeFormat(undefined, TIME_CONFIG);
FormatTime.format.bind(FormatTime);

/** @type {Intl.DateTimeFormat} */

const FormatDateTime = new Intl.DateTimeFormat(undefined, { ...DATE_CONFIG,
  ...TIME_CONFIG
});
FormatDateTime.format.bind(FormatDateTime);

/**
 *
 * @param {[*,*][]} entries
 * @param {Function} keyFn
 * @param {Function} [valFn]
 * @param {number} [l]
 * @returns {undefined}
 */
/**
 *
 * @param {[*,*][]} entries
 * @param {Function} keyMap
 * @param {Function} [valMap]
 * @param {number} [l]
 * @returns {[*,*][]}
 */


const mapper = (entries, keyMap, valMap, l) => {
  var _l;

  l = (_l = l) !== null && _l !== void 0 ? _l : entries === null || entries === void 0 ? void 0 : entries.length, valMap = valMap || keyMap;
  const vec = Array(l);

  for (let i = 0, r; i < l; i++) r = entries[i], vec[i] = [keyMap(r[0], i), valMap(r[1], i)];

  return vec;
};

/**
 *
 * @param {string[]} lines - input string[]
 * @param {string} delim - trailing punctuation added to each line
 * @param {number} level - level of indent to each line
 * @param {boolean} hover - first and last line hang up
 * @return {*}
 */

const joinLines = (lines, delim = '', level, hover = true) => {
  const IND = level > 0 ? TB.repeat(level) : '';
  return hover ? `${LF$1 + IND + TB}${lines === null || lines === void 0 ? void 0 : lines.join(delim + LF$1 + IND + TB)}${delim + LF$1 + IND}` : `${IND + TB}${lines === null || lines === void 0 ? void 0 : lines.join(delim + LF$1 + IND + TB)}${delim}`;
};

const LINEFEED = /\n/;
const COMMA$1 = /,/;

const linesHandler = function (lines) {
  const {
    discrete = false,
    delim = LF$1,
    bracket = NONE,
    level = 0
  } = this;
  if (discrete) return lines;
  const hover = !!bracket;
  const joined = lines.length && LINEFEED.test(delim) ? joinLines(lines, COMMA$1.test(delim) ? CO : '', level, hover) : lines.join(delim);
  return br(joined, bracket);
};
/**
 *
 * @param {string[]} lines - input string[]
 * @param {Object} p
 * @param {boolean|*}       [p.discrete=false] - if true, return the input lines as string[]
 * @param {string|*}        [p.delim=LF] - trailing punctuation added to each line
 * @param {number|string|*} [p.bracket=NONE] - bracket added to the start and end of the entire rendered lines
 * @param {number|*}        [p.level=0] - level of indent to each line
 * @return {string|string[]}
 */


const liner = (lines, p = {}) => linesHandler.call(p, lines);

// export const rpad = String.prototype.padEnd


Function.prototype.call.bind(String.prototype.padStart);

Function.prototype.call.bind(String.prototype.padEnd);

const LITERAL = /[a-z]+|[A-Z][a-z]+|(?<=[a-z]|\W|_)[A-Z]+(?=[A-Z][a-z]|\W|_|$)|[\d]+[a-z]*/g;

const ripper = function (text) {
  const regex = this;
  let ms,
      l = 0,
      r = 0,
      sp,
      ph;
  const vec = [];

  while ((ms = regex.exec(text)) && ([ph] = ms)) {
    r = ms.index;
    if (sp = text.slice(l, r)) vec.push(sp);
    vec.push(ph);
    l = regex.lastIndex;
  }

  if (l < text.length) vec.push(text.slice(l));
  return vec;
};

/**
 * @type {Function|function(string):string[]}
 * @function
 */


ripper.bind(LITERAL);

// export const
//   FUNC = '',
//   PIGM = '',
//   HEX = ''
const RENDER$2 = 'render';
const MUTATE_PIGMENT$2 = {
  colorant: RENDER$2,
  mutate: true
};

const CONFIG$1 = {
  mutate: true
};

function _decoFlat(lv, node) {
  const t = typeof node;
  if (t === STR$2) return node; // isNumeric(node) ? node : PAL.STR(node)

  if (t === NUM$1) return node;
  if (t === FUN) return _decoFunc.call(DECOFUN_CONFIG, node);

  if (t === OBJ) {
    var _deVec$call, _deOb$call;

    const pt = typ(node);
    if (pt === ARRAY) return _deVec$call = deVec.call(this, lv, node), BRK[lv & 7](_deVec$call);
    if (pt === OBJECT) return _deOb$call = deOb.call(this, lv, node), BRC[lv & 7](_deOb$call);
    if (pt === DATE) return decoDateTime(node);
    return `${node}`;
  }

  if (t === BOO) return PAL.BOO(node);
  if (t === UND) return PAL.UDF(node);
  if (t === SYM) return PAL.SYM(node.toString());
  return node;
}

function deVec(lv, ve) {
  const config = this; // const presets = this?.presets

  const list = ve.map(_decoFlat.bind(config, lv + 1));
  fluoVector.call(MUTATE_PIGMENT$2, list, config.presets);
  return list.join(COSP);
}

function deOb(lv, ob) {
  const config = this; // const presets = this?.presets

  const ents = mutate$3(Object.entries(ob), 1, _decoFlat.bind(this, lv + 1));
  fluoEntries.call(MUTATE_PIGMENT$2, ents, config.presets);
  return ents.map(([k, v]) => k + RT + v).join(COSP);
} // const parseConfig = conf => DecoConfig
//   .build(conf)
//   .assignConfigs(CONF_DECO_FLAT)
//   .assignPresets(...conf.presets)

/**
 * @Function
 * @type {Function|function(*):string}
 *  */


const decoFlat = (o, p = {}) => _decoFlat.call(DecoConfig.parse(p, CONFIG$1, DUAL_PRESET_COLLECTION), 0, o);

/**
 *
 * @param {*} x
 * @return {string}
 */


const totx = x => `${x}`;

const isTab = c => c === '\t' || c === ' ';

const deNaTab = tx => {
  let i = 0;

  for (let {
    length
  } = tx; i < length; i++) if (!isTab(tx.charAt(i))) return i;

  return i;
};

const sizing = (ar, head, tail) => {
  let l,
      dash = true;
  if (!(l = ar === null || ar === void 0 ? void 0 : ar.length)) [head, tail, dash] = [0, 0, false];
  if (!head && !tail || head >= l) [head, tail, dash] = [l, 0, false];
  return {
    head,
    tail,
    dash
  };
};
/**
 *
 * @param {*[]} vec
 * @param {number} [head]
 * @param {number} [tail]
 * @param {Function} [read]
 * @param {string} [rule='..']
 * @return {string[]}
 */


const vectorMargin = (vec, {
  head,
  tail,
  read,
  rule = '...'
} = {}) => VectorMargin.build(vec, head, tail).stringify(read).toVector(rule);

class VectorMargin {
  constructor(vec, head, tail, dash) {
    this.vec = vec;
    this.head = head;
    this.tail = tail;
    this.dash = dash;
  }

  static build(ar, h = 0, t = 0) {
    const {
      head,
      tail,
      dash
    } = sizing(ar, h, t);
    const margined = marginCopy$1(ar, head, tail);
    return new VectorMargin(margined, head, tail, dash);
  }

  map(fn, mutate = false) {
    const {
      vec,
      head,
      tail
    } = this;
    return mutate ? this.reboot(marginMutate$1(vec, fn, head, tail)) : this.clone(marginMapper$1(vec, fn, head, tail));
  }

  stringify(fn, mutate = true) {
    return this.map(fn ? _ => String(fn(_)) : totx, mutate);
  }
  /** @return {*[]} */


  toVector(el) {
    const {
      vec,
      head,
      tail
    } = this,
          dif = vec.length - (head + tail),
          ar = vec.slice();
    this.dash && el ? ar.splice(head, dif, el) : ar.splice(head, dif);
    return ar;
  }

  reboot(ar) {
    if (ar) this.vec = ar;
    return this;
  }

  clone(ar) {
    return new VectorMargin(ar, this.head, this.tail, this.dash);
  }

}

/**
 *
 * @param {string} tx
 * @returns {number}
 */

const lange = tx => tx.replace(ANSI_G$2, '').replace(ASTRAL_G$1, '_').length;

const ansiPadLength = (tx, pd) => hasAnsi$1(tx) ? tx.length + pd - lange(tx) : pd; // export const lpad = String.prototype.padStart
// export const rpad = String.prototype.padEnd


const lpad = Function.prototype.call.bind(String.prototype.padStart);

const LPad = ({
  ansi = true,
  fill
} = {}) => ansi ? (tx, pd) => lpad(tx, ansiPadLength(tx, pd), fill) : (tx, pd) => lpad(tx, pd, fill);

const rpad = Function.prototype.call.bind(String.prototype.padEnd);

const SP = ' ';
const COMMA = /,/g;

const clean = tx => {
  if (!tx || tx.length <= 4) return tx;
  return tx.replace(COMMA, '');
};

const pad = function (tx, wd, va) {
  const {
    ansi = true,
    fill = SP,
    thousand = true
  } = this !== null && this !== void 0 ? this : {};
  const padder = isNumeric$3(va !== null && va !== void 0 ? va : thousand ? clean(tx) : tx) ? lpad : rpad;
  return ansi ? padder(tx, ansiPadLength(tx, wd), fill) : padder(tx, wd, fill);
};
/**
 *
 * @param {object}  [config]
 * @param {boolean} [config.ansi]
 * @param {string}  [config.fill]
 * @param {boolean} [config.thousand]
 * @returns {function(string,number,any?):string}
 * @constructor
 */


const Pad = (config = {}) => pad.bind(config);

const CJK_PUNCS = '\u3000-\u303f';
const CJK_LETTERS = '\u4e00-\u9fbf';
const FULL_CHARS = '\uff00-\uffef'; // full letters + full puncs

const HAN = new RegExp(`[${CJK_PUNCS}${CJK_LETTERS}${FULL_CHARS}]`); // HAN ideographs

HAN.test.bind(HAN);

/**
 *
 * @param {*[]} entries
 * @param {number} [h] - head margin length
 * @param {number} [t] - tail margin length
 * @param {number} [l] - entries length
 * @returns {*[]}
 */
const marginCopy = (entries, h, t, l) => {
  var _l;

  const kvs = Array(l = (_l = l) !== null && _l !== void 0 ? _l : entries === null || entries === void 0 ? void 0 : entries.length),
        s = l - t;
  let ent;

  for (--h; h >= 0; h--) kvs[h] = [(ent = entries[h])[0], ent[1]];

  for (--l; l >= s; l--) kvs[l] = [(ent = entries[l])[0], ent[1]];

  return kvs;
};
/**
 *
 * @param {*[]} entries
 * @param {function(*,number?):*} keyMapper
 * @param {function(*,number?):*} valueMapper
 * @param {number} [h] - head margin length
 * @param {number} [t] - tail margin length
 * @param {number} [l] - entries length
 * @returns {*[]}
 */


const marginMapper = (entries, keyMapper, valueMapper, h, t, l) => {
  var _l;

  const ve = Array(l = (_l = l) !== null && _l !== void 0 ? _l : entries === null || entries === void 0 ? void 0 : entries.length),
        s = l - t;
  let ent;

  for (--h; h >= 0; h--) ve[h] = [keyMapper((ent = entries[h])[0], h), valueMapper(ent[1], h)];

  for (--l; l >= s; l--) ve[l] = [keyMapper((ent = entries[l])[0], l), valueMapper(ent[1], l)];

  return ve;
};
/**
 *
 * @param {*[]} entries
 * @param {function(*,number?):*} keyMapper
 * @param {function(*,number?):*} valueMapper
 * @param {number} [h] - head margin length
 * @param {number} [t] - tail margin length
 * @param {number} [l] - entries length
 * @returns {*[]}
 */


const marginMutate = (entries, keyMapper, valueMapper, h, t, l) => {
  l = l || (entries === null || entries === void 0 ? void 0 : entries.length);
  let s = l - t,
      ent;

  for (--h; h >= 0; h--) (ent = entries[h])[0] = keyMapper(ent[0], h), ent[1] = valueMapper(ent[1], h);

  for (--l; l >= s; l--) (ent = entries[l])[0] = keyMapper(ent[0], l), ent[1] = valueMapper(ent[1], l);

  return entries;
};

const entriesMargin = (entries, {
  head,
  tail,
  keyRead,
  read,
  rule
} = {}) => EntriesMargin.build(entries, head, tail).stringify(keyRead, read).toVector(rule !== null && rule !== void 0 ? rule : ['..', '..']);

class EntriesMargin extends VectorMargin {
  constructor(entries, head, tail, dash) {
    super(entries, head, tail, dash);
  }

  static build(entries, h = 0, t = 0) {
    var _entries;

    let d = true,
        l;
    if (!(l = (_entries = entries) === null || _entries === void 0 ? void 0 : _entries.length)) [entries, h, t, d] = [[], 0, 0, false];
    if (!h && !t || h >= l) [h, t, d] = [l, 0, false];
    return new EntriesMargin(marginCopy(entries, h, t, l), h, t, d);
  }

  map(keyMapper, valueMapper, mutate = false) {
    const {
      vec,
      head,
      tail
    } = this;
    return mutate ? this.reboot(marginMutate(vec, keyMapper, valueMapper, head, tail)) : this.clone(marginMapper(vec, keyMapper, valueMapper, head, tail));
  }
  /**
   *
   * @param {function} [keyMapper]
   * @param {function} [valueMapper]
   * @param {boolean} [mutate]
   * @return { EntriesMargin }
   */


  stringify(keyMapper, valueMapper, mutate = true) {
    return this.map(keyMapper ? _ => String(keyMapper(_)) : totx, valueMapper ? _ => String(valueMapper(_)) : totx, mutate);
  }

}

const max = function (entries) {
  const [kpi, vpi] = this;
  return entries.reduce((pe, ce, i) => (pe[0] = max$1(pe[0], kpi(ce[0], i)), pe[1] = max$1(pe[1], vpi(ce[1], i)), pe), [kpi(entries[0][0], 0), vpi(entries[0][1], 0)]);
};

const maxBy = (entries, kpi, vpi) => max.call([kpi, vpi], entries);

/**
 *
 * @param {string[][]} entries
 * @param {boolean} ansi
 * @param {string} fill
 * @returns {string[][]}
 */

const entriesPadder = (entries, {
  ansi,
  fill
}) => {
  const lange = Lange(ansi);
  const [kwd, vwd] = maxBy(entries, lange, lange);
  const pad = Pad({
    ansi,
    fill
  }),
        lpad = LPad({
    ansi,
    fill
  });
  return mapper(entries, tx => lpad(tx, kwd), (tx, va) => pad(tx, vwd, va));
}; // raw = raw || entries

//   FUNC = '',
//   PIGM = '',
//   HEX = ''

const RENDER$1 = 'render';
const MUTATE_PIGMENT$1 = {
  colorant: RENDER$1,
  mutate: true
};
const LF = /\n/;
const fluo$1 = fluoEntries.bind(MUTATE_PIGMENT$1);

const _decoEntries = function (entries = []) {
  var _entries, _Br, _config$presets;

  const config = this;
  if (!((_entries = entries) !== null && _entries !== void 0 && _entries.length)) return liner([], config);
  let {
    ansi,
    dash,
    delim,
    bracket
  } = config;
  bracket = (_Br = Br(bracket)) !== null && _Br !== void 0 ? _Br : oneself$2;
  entries = entriesMargin(entries, config); // use: head, tail, keyRead, read

  if (LF.test(delim)) entries = entriesPadder(entries, {
    ansi: (_config$presets = config.presets) !== null && _config$presets !== void 0 ? _config$presets : ansi
  });
  if (config.presets) entries = fluo$1(entries, config.presets); // use: presets, effects

  return liner(entries.map(([k, v]) => bracket(k + dash + v.trimRight())), config);
};

//   FUNC = '',
//   PIGM = '',
//   HEX = ''

const RENDER = 'render';
const MUTATE_PIGMENT = {
  colorant: RENDER,
  mutate: true
};
fluoMatrix.bind(MUTATE_PIGMENT);

var _ref;

const REG_CR = /\r/g;
const BACKSLASH_CR = '\\r';
const REG_LF = /\n/g;
const BACKSLASH_LF = '\\n';
(_ref = [[REG_CR, BACKSLASH_CR], [REG_LF, BACKSLASH_LF]], translator.makeReplaceable(_ref));

const CONFIG = {
  dash: ') ',
  delim: COLF,
  bracket: BRK$1,
  indexed: false,
  read: decoFlat,
  ansi: true
};
const fluo = fluoVector.bind(MUTATE_PIGMENT$2);

function _decoVector(vec = []) {
  const config = this;
  if (config !== null && config !== void 0 && config.indexed) return _decoEntries.call(config, Object.entries(vec));
  vec = vectorMargin(vec, config); // use: head, tail, read, rule

  if (config.presets) vec = fluo(vec, config.presets); // use:  presets, effects

  return liner(vec, config);
}
/***
 *
 * @param {*[]} vector
 * @param {Object} p
 *
 * @param {boolean} [p.discrete]
 * @param {string} [p.dash=') ']
 * @param {string} [p.delim=',\n']
 *
 * @param {boolean|number} [p.bracket=true] - BRK = 1
 *
 * @param {boolean} [p.indexed=true]
 * @param {Function} [p.read]
 *
 * @param {Object|Object[]} [p.presets=[FRESH,JUNGLE]]
 *
 * @param {number} [p.head]
 * @param {number} [p.tail]
 *
 * @param {boolean} [p.ansi]
 * @param {number} [p.level=0]
 *
 * @returns {string}
 */


const deco = (vector, p = {}) => _decoVector.call(DecoConfig.parse(p, CONFIG, DUAL_PRESET_COLLECTION), vector);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
} // from x => typeof x


const NUM = 'number';
const STR = 'string';
const DEF = 'default';

var _Cards$orange$lighten, _Cards$indigo$lighten;

const orange = Dye((_Cards$orange$lighten = Cards.orange.lighten_3, hexToRgb(_Cards$orange$lighten)));
const indigo = Dye((_Cards$indigo$lighten = Cards.indigo.lighten_1, hexToRgb(_Cards$indigo$lighten)));

const bracket$1 = tx => orange('[') + tx + orange(']');

const parenth$1 = tx => indigo('(') + tx + indigo(')');

var _Cards$blueGrey$base, _Cards$grey$darken_;

const blueGrey = Dye((_Cards$blueGrey$base = Cards.blueGrey.base, hexToRgb(_Cards$blueGrey$base)));
const grey = Dye((_Cards$grey$darken_ = Cards.grey.darken_1, hexToRgb(_Cards$grey$darken_)));

const bracket = (tx = '') => blueGrey('[') + grey(tx) + blueGrey(']');

const parenth = (tx = '') => blueGrey('(') + grey(tx) + blueGrey(')');
/**
 *
 * @param {*} [text]
 * @return {string}
 */


function render(text) {
  const queue = this,
        {
    indent
  } = queue;
  if (text !== null && text !== void 0 && text.length) queue.push(text);
  return SP$1.repeat(indent << 1) + queue.join(SP$1);
}

const EDGE_BRACKET = /^[(\[{].*[)\]}]$/;

const enqueue = function (key, ...items) {
  const {
    queue,
    conf
  } = this;
  const {
    bracket,
    parenth
  } = conf;
  if (items.every(nullish$1)) ;else {
    var _String;

    items = items.map(String).join(COSP);
    queue.push((_String = String(key), bracket.major(_String)));
    queue.push(hasAnsi(items) && EDGE_BRACKET.test(clearAnsi(items)) ? items : parenth.major(items));
  }
  return this;
};

const initQueue = t => {
  var _t;

  const queue = [];
  let hi, indent;
  if (t && (hi = (_t = t = String(t)) === null || _t === void 0 ? void 0 : _t.length) && (indent = deNaTab(t)) < hi) queue.push(t.slice(indent));
  queue.indent = indent;
  return {
    queue
  };
};

let _Symbol$toPrimitive;

class Callable extends Function {
  constructor(f) {
    super();
    Reflect.setPrototypeOf(f, new.target.prototype);
    return f;
  }

}
/**
 * @typedef {Array<string>} ArrayWithIndent
 * @typedef {string} ArrayWithIndent.indent
 */

/**
 * @type {Object<string,string>}
 */


var _conf = new WeakMap();

_Symbol$toPrimitive = Symbol.toPrimitive;

class XrStream extends Callable {
  /** @type {ArrayWithIndent} */

  /** @type {number} */

  /** @type {{br:{major:Function,minor:Function},pa:{major:Function,minor:Function}} */
  constructor(word, pretty = true) {
    super(word => render.call(this.queue, word));

    _defineProperty(this, "queue", void 0);

    _defineProperty(this, "indent", void 0);

    _conf.set(this, {
      writable: true,
      value: {}
    });

    Object.assign(this, initQueue(word));
    _classPrivateFieldGet(this, _conf).bracket = pretty ? {
      major: bracket$1,
      minor: bracket
    } : {
      major: bracket$2,
      minor: bracket$2
    };
    _classPrivateFieldGet(this, _conf).parenth = pretty ? {
      major: parenth$1,
      minor: parenth
    } : {
      major: parenth$2,
      minor: parenth$2
    };
    return new Proxy(this, {
      get(target, name, receiver) {
        return name in target ? target[name] // `[proxy.get] (${ String(name) }) (${ target?.name })` |> logger,
        : (...items) => (enqueue.call(target, name, ...items), receiver);
      }

    });
  }

  get conf() {
    return _classPrivateFieldGet(this, _conf);
  }

  asc() {
    return this.queue.indent++, this;
  }

  desc() {
    return this.queue.indent--, this;
  }

  p(...items) {
    return this.queue.push(...items), this;
  }

  br(...items) {
    return this.queue.push(items.map(parenth$2).join(CO)), this;
  }

  toString() {
    return render.call(this.queue);
  }

  [_Symbol$toPrimitive](h) {
    switch (h) {
      case STR:
      case DEF:
        return render.call(this.queue);

      case NUM:
        return this.queue.indent;

      default:
        throw new Error('XrStream Symbol.toPrimitive error');
    }
  }

}

new XrStream();

const logger = (x, ...p) => void console.log(x + '', ...p);
/** @type {Function} */

const decoVector = deco;

const TODAY = timestamp$1.date();
class FundamentalAlphav {
  static login(key) {
    return FundamentalAlphav.apikey = key, FundamentalAlphav;
  }

  static async timeseries({
    symbol = 'AAPL',
    start = dashedDate.shiftMonth(TODAY, -12),
    end = TODAY,
    report = enumFin.BALANCES,
    format = enumTabularTypes.TABLE
  } = {}) {
    return await acq.Acq.tabular({
      title: 'annualReports',
      url: BASE,
      params: {
        'symbol': symbol,
        'function': _reportToAlphavantageFunction(report),
        'apikey': FundamentalAlphav.apikey
      },
      prep: ({
        quarterlyReports
      }, {
        symbol,
        start,
        end
      }) => {
        var _quarterlyReports, _ref, _table$head$map, _ref2, _table$head;

        const table = (_quarterlyReports = quarterlyReports, convert.samplesToTable(_quarterlyReports));
        _ref = (_table$head$map = table.head.map(x => phrasing.camelToSnake(x, ' ')), decoVector(_table$head$map)), logger(_ref);
        const translatorB = translator.Translator.build(Merge.merges(AbbrAlphav['grammatic'], AbbrAlphav[report], abbrFin.DictCollection[report]));
        table.mapHead(x => translatorB.parse(phrasing.camelToSnake(x, ' '), phrasing.snakeToCamel), enumMutabilities.MUTABLE).find({
          date: date => dashedDate.within(date, start, end)
        }).unshiftColumn(enumFin.SYMBOL, Init.iso(table.ht, symbol)).setTitle(symbol);
        _ref2 = (_table$head = table.head, decoVector(_table$head)), logger(_ref2);
        return table;
      },
      args: {
        symbol,
        start,
        end
      },
      from: enumTabularTypes.TABLE,
      to: format
    });
  }

}

_defineProperty$8(FundamentalAlphav, "apikey", void 0);

const AbbrAlphav = {
  grammatic: [[/total/gi, ''], [/reported/gi, ''], [/currency/gi, 'curr'], [/fiscal date ending/gi, 'date']],
  balances: [[/accounts/gi, 'acc'], [/currr?ent/gi, 'c'], [/noncurrent/gi, 'nc'], [/retained/gi, 'ret'], [/earnings/gi, 'e'], [/short/gi, 's'], [/long/gi, 'l'], [/stock/gi, 'sto'], [/treasury/gi, 'tr'], [/common/gi, 'cm'], [/accumulated/gi, 'accum'], [/lease/gi, 'leas'], [/obligations?/gi, 'ob'], [/at carrying value/gi, ''], [/property plant equipment/, 'ppe'], [/shares outstanding/g, 'so']],
  incomes: [[/selling/gi, 's'], [/general/gi, 'g'], [/administrative/gi, 'a'], [/research/gi, 'r'], [/development/gi, 'd'], [/continuing/gi, 'c'], [/operations?/gi, 'op'], [/costof/gi, 'cost of'], [/services/gi, 's'], [/goods/gi, 'g']],
  cashflows: [],
  generals: []
};

const _reportToAlphavantageFunction = report => {
  if (report === enumFin.INCOMES) {
    return 'INCOME_STATEMENT';
  }

  if (report === enumFin.BALANCES) {
    return 'BALANCE_SHEET';
  }

  if (report === enumFin.CASHFLOWS) {
    return 'CASH_FLOW';
  }

  if (report === enumFin.GENERALS) {
    return 'OVERVIEW';
  }

  return 'TIME_SERIES_MONTHLY';
};

exports.FundamentalAlphav = FundamentalAlphav;
