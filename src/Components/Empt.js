import React from "react";
import {  useNavigate } from "react-router-dom";
import { Loading } from "../pages/loading";



function Empt() {
  let navigate= useNavigate();
  let token=sessionStorage.getItem('token');
  if(token){
    navigate('/dashboard');
  }else{
    navigate('/login');
  }

  return(
      <div>
          <Loading/>
      </div>
  )
}

export default Empt;
