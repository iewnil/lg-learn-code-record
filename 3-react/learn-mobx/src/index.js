import React from 'react';
import ReactDOM from 'react-dom';
// import App from './Mobx45'; // 要注意：当 mobx 版本升级到 6及以上后，就无法与 mobx-react@^6 相匹配了，要升级对应的高版本，才能正常使用示例
import App from './Mobx6';

ReactDOM.render(<App />, document.getElementById('root'));

