/*
 * @Description: 
 * @Date: 2021-01-19 14:18:47
 * @LastEditTime: 2021-09-25 13:04:01
 * @LastEditors: linwei
 */

// import a from './a.js';
// import b from './b.js';
// import  './babelTest.js';
// import '@/css/style.css';
// import img from './images/photo1.jpg';
// import v from './module';
// import temp$ from 'jquery';  // 被引入，并为其取了使用别名

// import commonButton from 'commonButton';
// console.log('commonButton',commonButton.button)

// console.log('$',$)
// console.log('temp$122',temp$)
// console.log('jquery213132',jQuery)
// // console.log('val', v.val);

// console.log('img12',img)

// const image = new Image();
// image.src = img;
// document.body.appendChild(image);

// a();
// // b();
// if(module.hot){
//   module.hot.accept('./b',()=>{  // 模块为热更新模块
//     b();
//   });

//   module.hot.accept('./images/photo1.jpg',()=>{  // 模块为热更新模块
//     image.src = img;
//   });
// }
// console.log('hello webpack');


/**
 * tree-shaking
 */
// 只引用了其中的 cube 
// import { cube } from './math.js';
import { merge } from 'lodash';
// import './extend.js';
// console.log(cube(5));
// console.log(debounce());

