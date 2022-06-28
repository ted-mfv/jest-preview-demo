/* eslint-disable import/no-extraneous-dependencies */
const { v4: uuidv4 } = require('uuid');
const modifyResponse = require('node-http-proxy-json');

const KANJI_CHARS = '愛子美莉理梨明昭夫雨夜杏那葵蒼朝陽彩花乃紅千夏代大地輝樹輔瑛太恵文剛華悠遥真春菜斗翔人隼向弘寛瞳螢勇海香霞克己一和也慶介健三桐清心虎郎琴音康平久舞誠学正博男勝弓芽依生緑湊実澪咲羽優萌桃七';
const KANJI_CHARS_LEN = KANJI_CHARS.length;

const randomName = (length) => {
  return Array.from(Array(length).keys())
    .map(_ => KANJI_CHARS.charAt(Math.floor(Math.random() * KANJI_CHARS_LEN)))
    .join('');
};

const variantModify = ({
  jsonData,
  idx,
  names = [],
  dates = []
}) => {
  const date = new Date();
  const data = JSON.parse(jsonData);

  data.id = uuidv4();
  names.forEach((name) => {
    data[name] = `__MOCK__${randomName(8)}`;
  });
  dates.forEach((d, i) => {
    date.setDate(date.getDate() + idx + i);
    data[d] = date.toISOString();
  });

  return data;
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

module.exports = {
  shuffleArray,
  variantModify,
  randomName,
  modifyResponse,
  uuidv4
};
