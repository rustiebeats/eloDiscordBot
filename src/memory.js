import fs from 'fs';

let dictionary = {};

export default {
  dictionary,
  boot() {
    try {
      dictionary = JSON.parse(fs.readFileSync('dictionary.json'));
    } catch (err) {
      dictionary = {};
    }
  },
  get(key, _default = '') {
    if (dictionary[key]) {
      return dictionary[key];
    }
    dictionary[key] = _default;
    return _default;
  },
  set(key, value) {
    try {
      dictionary[key] = value;
      fs.writeFileSync('dictionary.json', JSON.stringify(dictionary));
      return true;
    } catch (err) {
      return false;
    }
  },
};
