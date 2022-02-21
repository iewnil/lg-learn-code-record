import store from "./store";

const increment = (dispatch) => {
  dispatch({ type: 'increment'});
}

const decrement = (dispatch) => {
  dispatch({ type: 'decrement'});
}

function Counter() {
  return (
    <div>
      <button onClick={() => increment(store.dispatch)}>+</button>
      <span>{store.getState().count}</span>
      <button onClick={() => decrement(store.dispatch)}>-</button>
    </div>
  );
}

export default Counter;
