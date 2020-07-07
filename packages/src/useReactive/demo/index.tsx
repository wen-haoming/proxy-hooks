import React from 'react'
import {useReactive} from '../index';


const Demo = ()=>{
 let state =  useReactive({
    count:1,
    val:'"'
  })
    return <div>
        <h1>双向数据绑定</h1>
        <p>{state.count}</p>
        <button onClick={()=>state.count+=1}>+</button>
        <p>{state.val}</p>
        <input type="text"  onChange={(e)=>{ state.val = (e.target.value)}}  />
    </div>
}

export default Demo
