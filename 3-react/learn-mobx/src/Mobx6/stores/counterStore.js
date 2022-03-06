import { action, configure, observable, flow, computed, runInAction, autorun, makeAutoObservable, makeObservable } from "mobx";
import axios from 'axios';

// 通过配置强制程序使用 action 函数更改应用程序的状态数据
configure({
  enforceActions: 'observed'
})

class CounterStore {
  count = 0;
  price = 25;
  users = [];
  username = '';
  person = {
    name: '张三'
  };

  constructor ({ price = 25 }) {

    this.price = price;

    /**
     * 自动配置
     * 自动将 this 中的属性设置为 observable state
     * 自动将 this 中的方法设置为 action.bound
     * 第二个参数：可以覆盖默认的状态配置，如：设置 count: false（默认为 true），就不是 observable state了
     * 第三个参数：通过 autoBind 来为非箭头函数绑定 this（默认为 autoBind: false）
     */
    // makeAutoObservable(this, { count: true }, { autoBind: true });

    /**
     * 手动配置
     * 设置属性和函数对应的 observable 和 action
     * 第三个参数：autoBind设置为 true 还不够，需要 action设置为 action.bound
     */
    makeObservable(
      this, 
      { 
        count: observable,
        price: observable,
        users: observable,
        username: observable,
        increment: action.bound,
        decrement: action.bound,
        getUsers: action.bound,
        changeUsername: action,
        getTotal: computed,
        person: observable,
      },
      {
        autoBind: true
      }
    )

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

  // 箭头函数自动绑定 this 
  // increment = () => {
  //   this.count = this.count + 1;
  // }

  // decrement = () => {
  //   this.count = this.count - 1;
  // }

  // 非箭头函数，需要通过 autoBind 来绑定 this
  increment() {
    this.count = this.count + 1;
  }

  decrement() {
    this.count = this.count - 1;
  }

  // 异步方法是不能作为 action 用来改变数据，所以只能通过 runInAction 包裹一个新的 action 函数，将改变数据的操作放入函数中
  async getUsers () {
    let { data } = await axios.get('https://api.github.com/users');
    // this.users = data; // 异步 action 中，是不被允许这样直接赋值的
    // 通过 runInAction 包裹一个新的 action 函数，将改变数据的操作放入函数中
    // 注：非箭头函数使用 this，需要在上面声明 action.bound
    runInAction(() => {
      this.users = data;
    })
  }

  // 异步方法是不能作为 action 用来改变数据，所以只能通过 runInAction 包裹一个新的 action 函数，将改变数据的操作放入函数中
  // getUsers = async () => {
  //   let { data } = await axios.get('https://api.github.com/users');
  //   // this.users = data; // 不被允许这样直接赋值的
  //   // 通过 runInAction 包裹一个新的 action 函数，将改变数据的操作放入函数中
  //   runInAction(() => {
  //     this.users = data;
  //   })
  // }

  // 通过 get 指定后，使用 getTotal 时，就不用加()
  get getTotal() {
    return this.count * this.price;
  }

  changeUsername = (username) => {
    this.username = username;
  }
}

// 模拟发送请求：验证用户名是否为 coderlw
function uniqueUsername (username) {
  console.log('uniqueUsername')
  return new Promise((resolve, reject) => {
    if(username === 'coderlw') {
      reject('用户名coderlw已经存在');
    } else {
      resolve();
    }
  })
}

const counter = new CounterStore({ price: 30 });

export default counter;