import { action, configure, observable, runInAction, flow, computed, autorun } from "mobx";
import axios from 'axios';

// 通过配置强制程序使用 action 函数更改应用程序的状态数据
configure({
  enforceActions: 'observed'
})

class CounterStore {

  constructor () {
    autorun(() => {
      try {
        uniqueUsername(this.username);
        console.log('用户名可用')
      } catch (e) {
        console.log(e.message)
      }
    }, {
      delay: 1000 // 当数据发生变化时，延迟 1 秒后执行，但只会执行最后一次变化（类似于防抖）
    })
  }

  // 通过 @observable 注解，将状态数据变为可观测的数据
  @observable count = 0;
  @observable price = 25;
  @observable users = [];
  @observable username = '';

  // 注意: 在将 MobX 配置为需要通过动作来更改状态时，必须使用 action
  @action increment = () => {
    this.count = this.count + 1;
  }

  @action decrement = () => {
    this.count = this.count - 1;
  }

  // 非箭头函数，需要通过 @action.bound 来绑定 this
  // @action.bound increment() {
  //   this.count = this.count + 1;
  // }

  // @action.bound decrement() {
  //   this.count = this.count - 1;
  // }

  // 异步方法是不能作为 action 用来改变数据，所以只能通过 runInAction 包裹一个新的 action 函数，将改变数据的操作放入函数中
  getUsers = async () => {
    let { data } = await axios.get('https://api.github.com/users');
    // this.users = data; // 异步 action 中，是不被允许这样直接赋值的
    // 通过 runInAction 包裹一个新的 action 函数，将改变数据的操作放入函数中
    runInAction(() => {
      this.users = data;
    })
  }

  // 箭头函数不支持 generator，所以这里需要通过 bind 进行绑定 this（但好像不绑定也可以？？？）
  // getUsers = flow(function *() {
  //   let { data } = yield axios.get('https://api.github.com/users');
  //   this.users = data; // 通过 flow 包裹后，在异步方法中就允许这样直接赋值了
  // }).bind(this)

  // 通过 get 指定后，使用 getTotal 时，就不用加()
  @computed get getTotal() {
    return this.count * this.price;
  }

  @action changeUsername = (username) => {
    this.username = username;
  }
}

// 模拟发送请求：验证用户名是否为 coderlw
function uniqueUsername (username) {
  return new Promise((resolve, reject) => {
    if(username === 'coderlw') {
      reject('用户名coderlw已经存在');
    } else {
      resolve();
    }
  })
}

const counter = new CounterStore();

export default counter;