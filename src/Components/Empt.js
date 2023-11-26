import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../pages/loading";




function Empt() {
  const navigate = useNavigate();
  let token=sessionStorage.getItem('token');
  console.log(token)
 useEffect(()=>{
  if(token){
    navigate('/dashboard');
  }else{
    navigate('/login');
  }
 },[])

  return(
      <div>
         <Loading/>
      </div>
  )
}

export default Empt;
