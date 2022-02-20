/*
 * @Description: 
 * @Date: 2021-06-23 23:53:07
 * @LastEditTime: 2021-06-30 22:49:11
 * @LastEditors: linwei
 */
function ajax (url) {
	return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
    xhr.send();
  })
}

// 本地 .json 文件
ajax('/api/user.json').then(function (res) {
  console.log(res);
}, function (error) {
  console.log(error);
})