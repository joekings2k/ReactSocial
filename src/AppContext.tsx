import React, { useReducer, createContext } from "react";

export enum Actiontype{
  darkmood = "DARKMOOD"
}
interface Action{
  type:Actiontype,
  payload?:any
}
interface Appstate{
darkMood :boolean
}

const initialState:Appstate ={
  darkMood:false
}
interface Props{
  children:React.ReactNode
}


const reducer =(state:Appstate ,action:Action)=>{
  const {type}=action
  switch(type){
    case Actiontype.darkmood:
      return{
        ...state,darkMood:!state.darkMood
      }
    default:
      return state
  }
}
const  DataValueContext=
  createContext<{state:Appstate,dispatch:React.Dispatch<any>}>({state:initialState,dispatch:()=>{}})


const  DataValueProvider:React.FC<Props> =({ children })=> {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataValueContext.Provider value={{ state, dispatch }} >
      {children}
    </DataValueContext.Provider>
  );
}

export { DataValueContext, DataValueProvider };
