const path = require(`path`);

module.exports = {
  entry: [
    `/js/utils.js`,
    `/js/avatar.js`,
    `/js/debounce.js`,
    `/js/backend.js`,
    `/js/render.js`,
    `/js/dialog.js`,
    `/js/setup_wizard.js`,
    `/js/stat.js`,
    `/js/game.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
