import { useContext } from "react";
import { DataValueContext } from "../AppContext";
import {auth,provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const { state } = useContext(DataValueContext);
  const navigate = useNavigate()
  const googleSignIn  = async()=>{
    try{
      const result = await signInWithPopup(auth, provider);
      console.log(result)
      navigate("/")
    }catch(err:any){
      console.log(err.message)
    }
    
  }
  return (
    <div className={state.darkMood ? "dark" : ""}>
      <div className="dark:bg-slate-700 login">
        <h1 className=" dark:text-white"> sign in with google </h1>
        <button type="submit" className="bg-slate-500 py-2 px-4" onClick={googleSignIn}>Click to sign in</button>
      </div>
    </div>
  );
};
