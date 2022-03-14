import React, { useState, memo, useRef } from 'react';
import { fromJS, is } from 'immutable';

function A (props) {
  console.log('A render')
  return <div>A {props.person.get('name')}</div>
}

function B (props) {
  console.log('B render')
  return <div>B {props.person.get('name')}</div>
}

// 自定义比较函数
const BMemo = memo(B, compareFunction);

function compareFunction (prevProps, nextProps) {
  // 返回 true 不渲染
  // 返回 false 渲染
  if(is(prevProps.person, nextProps.person)) {
    return true
  }

  return false;
} 

const Comp = () => {
  const [person, setPerson] = useShouldComponentUpdate(fromJS({ name: 'coderlw'}), (prev, next) => !is(prev, next) );

  console.log('Comp render');
  return (
    <>
      <button onClick={() => { setPerson(() => person.set('name', 'coderlw')) }}>coderlw</button>
      <button onClick={() => { setPerson(() => person.set('name', '李四')) }}>李四</button>
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