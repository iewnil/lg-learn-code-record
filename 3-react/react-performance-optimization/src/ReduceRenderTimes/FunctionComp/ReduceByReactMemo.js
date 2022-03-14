import React, { useState, memo } from 'react';

function A (props) {
  console.log('A render')
  // return <div>A {props.name}</div>
  return <div>A {props.person.name}</div>
}

function B (props) {
  console.log('B render')
  // return <div>B {props.name}</div>
  return <div>B {props.person.name}</div>
}

// 默认浅层比较
// const BMemo = memo(B);

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
  // const [name, setName] = useState('coderlw');
  const [person, setPerson] = useState({ name: 'coderlw' });

  console.log('Comp render');
  return (
    <>
      {/* 浅层比较 */}
      {/* <button onClick={() => { setName('coderlw') }}>coderlw</button>
      <button onClick={() => { setName('李四') }}>李四</button>
      <A name={name}/>
      <BMemo name={name}/> */}

      {/* 深层比较 */}
      <button onClick={() => { setPerson({ name: 'coderlw' }) }}>coderlw</button>
      <button onClick={() => { setPerson({ name: '李四' }) }}>李四</button>
      <A person={person}/>
      <BMemo person={person}/>
    </>
  );
};

export default Comp;