const { override, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
  // 使用 @babel/plugin-proposal-decorators
  addDecoratorsLegacy()
);