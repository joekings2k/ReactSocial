import {Outlet} from "react-router-dom"
import { Navbar } from "../components/Navbar"

export const Root  =()=>{
  return (
    <div>
      <Navbar />
     
      <div>
        <Outlet />
      </div>
    </div>
  );
}
// npm install @mui/material @emotion/react @emotion/styled