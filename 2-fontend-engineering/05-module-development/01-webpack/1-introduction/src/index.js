import module from './module.js';
import './css/index.css';
import logoSvg from './img/logo.svg';
import testPng from './img/test.png' ;

const img = document.createElement('img');
img.setAttribute('src', logoSvg);
document.body.appendChild(img)

console.log('this is index.js')