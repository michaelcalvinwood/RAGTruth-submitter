import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { counterDecrement, counterIncrement, counterSetValue } from './store/sliceCounter';
import axios from 'axios';
import { infoSetResponse, infoSetSourceInfo } from './store/sliceInfo';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  
  

  useEffect(() => {
    axios.get('https://www.michaelcalvinwood.net/datasets/RAGTruth/source_info.jsonl')
    .then(response => {
      const lines = response.data.split("\n");
      const sourceInfo = [];
      for (let i = 0; i < lines.length; ++i) {
        try {
          const obj = JSON.parse(lines[i]);
          if (obj.task_type === 'QA') sourceInfo.push(obj);
        } catch (err) {
          console.error('Could not push ', i);
        }
      }
      dispatch(infoSetSourceInfo(sourceInfo));
    })
    .catch(err => console.error(err));

    axios.get('https://www.michaelcalvinwood.net/datasets/RAGTruth/response.jsonl')
    .then(response => {
      const lines = response.data.split("\n");
      console.log('lines[0]', lines[0])
      const responseArr = [];
      for (let i = 0; i < lines.length; ++i) {
        try {
          const obj = JSON.parse(lines[i]);
          responseArr.push(obj);
        } catch (err) {
          console.error('Could not push ', i);
        }
      }
      dispatch(infoSetResponse(responseArr));
    })
    .catch(err => console.error(err));
  }, [])
  return (
    <>
      <div onClick={() => dispatch(counterIncrement())}>+</div>
      <div>{count}</div>
      <div onClick={() => dispatch(counterDecrement())}>-</div>
      <input type="number" onChange={e => dispatch(counterSetValue(e.target.value))} />
    </>
  )
}

export default App
