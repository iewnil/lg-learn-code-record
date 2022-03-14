import React, { useState, memo, useRef } from 'react';

function A (props) {
  console.log('A render')
  return <div>A {props.person.name}</div>
}

function B (props) {
  console.log('B render')
  return <div>B {props.person.name}</div>
}

// 自定义比较函数
const BMemo = memo(B, compareFunction);

function compareFunction (prevProps, nextProps) {
  // 返回 true 不渲染
  // 返回 false 渲染
  if(prevProps.person.name === nextProps.person.name) {
    return true
  }

  return false;
} 

const Comp = () => {
  const [person, setPerson] = useShouldComponentUpdate({ name: 'coderlw'}, (prev, next) => prev.name !== next.name );

  console.log('Comp render');
  return (
    <>
      <button onClick={() => { setPerson(() => ({ name: 'coderlw' })) }}>coderlw</button>
      <button onClick={() => { setPerson(() => ({ name: '李四1' })) }}>李四1</button>
      <A person={person}/>
      <BMemo person={person}/>
    </>
  );
};

const useShouldComponentUpdate = (initialState, shouldUpdate) => {
  const stateRef = useRef(initialState);
  const [, setState] = useState(initialState);

  const renderUpdate = (updateFunction) => {
    if(!updateFunction instanceof Function) {
      throw Error('updateFunction 必须是函数')
    }
    const newState = updateFunction(stateRef.current);

    if(shouldUpdate(stateRef.current, newState)) {
      setState(newState);
    }

    stateRef.current = newState;
  }

  return [
    stateRef.current,
    renderUpdate
  ]
}

export default Comp;