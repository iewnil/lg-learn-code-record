// import Comp from './ClearBeforeUnmount';
// import Comp from './ReduceRenderTimes/ClassComp/ReduceByPureComponent';
// import Comp from './ReduceRenderTimes/ClassComp/ReducerByShouldComponentUpdate';
// import Comp from './ReduceRenderTimes/FunctionComp/ReduceByReactMemo';
// import Comp from './ReduceRenderTimes/FunctionComp/ReduceByUseShouldComponentUpdate';
// import Comp from './LazyLoadComp';
// import Comp from './Immutable/ClassComp';
import Comp from './Immutable/FunctionComp';

function App() {
  // throw new Error('lalala')
  return (
    <div className="App">
      <Comp />
    </div>
  );
}

export default App;
