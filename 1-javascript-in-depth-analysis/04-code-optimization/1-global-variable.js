/**
 * 全局变量
 */

// 1. 慎用全局变量

// before
var i, str = ''
for(i = 0; i < 1000; i++){
  str += i;
}

// after
for(let i = 0; i < 1000; i++) {
  let str = '';
  str += i;
}



// 2. 缓存全局变量

// before
function getBtn() {
  let btn1 = document.getElementById('btn1');
  let btn3 = document.getElementById('btn3');
  let btn5 = document.getElementById('btn5');
  let btn7 = document.getElementById('btn7');
  let btn9 = document.getElementById('btn9');
}


// after
function getBtn2() {
  let obj = document;
  let btn1 = obj.getElementById('btn1');
  let btn3 = obj.getElementById('btn3');
  let btn5 = obj.getElementById('btn5');
  let btn7 = obj.getElementById('btn7');
  let btn9 = obj.getElementById('btn9');
}