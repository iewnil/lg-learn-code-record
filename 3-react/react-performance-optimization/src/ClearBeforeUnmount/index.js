import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Comp = () => {
  let [index, setIndex] = useState(0);
  useEffect(() => {
    let timer = setInterval(() => {
      console.log(index);
      setIndex(index++);
    }, 1000);

    // 组件卸载前，进行清理
    return () => {
      clearInterval(timer);
    }
  }, [])

  return (
    <>
      {index}
      <button onClick={()=> ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>unmount</button>
    </>
  );
};

export default Comp;