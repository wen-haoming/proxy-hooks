import React,{useState,useCallback,useMemo,useEffect} from 'react';
import {reactive,effect,ref} from '@vue/reactivity'

function mapObj(obj){
    if(typeof obj === 'object'){
           for(let key in obj){
                if(typeof obj !== 'object'){
                    continue;
                }
                mapObj(obj[key])
           }
    }
}

export interface InitialState{
  [propName: string]: any;
}

export function useReactive(initialState:InitialState):typeof initialState {
    const [cueState,changeState] = useState(initialState)

      const state = useMemo(()=>{
        return reactive(cueState)
      },[])

      useEffect(()=>{
        effect(()=>{
          mapObj(state)
          changeState({...state})
         })
      },[])

      return state
    }






