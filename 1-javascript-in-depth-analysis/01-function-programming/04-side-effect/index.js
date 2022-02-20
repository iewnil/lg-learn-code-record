// 副作用

// 不纯的，有副作用的函数
let mini = 18;
function checkAge (age) {
	return age >= mini
}

// 改进，纯函数
function checkAge (age) {
	let mini = 18;
  return age >= mini;
}

// 再改进
function checkAge (mini,age) {
  return age >= mini;
}
