import React, { useEffect, useState } from 'react'
import { URL } from '../backend link';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { toast } from "react-toastify";
import Sidebar from '../sidebar/sidebar';

function OrderList() {
    const[order,setOrder]=useState([]);
      const token = sessionStorage.getItem("token");
      const id=sessionStorage.getItem('myid')
  
      async function getfavoriteproduct(){
           try {
              let response = await axios.get(`${URL}/user/getorder/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response);
                setOrder(response.data.product);
                toast(response.data.message);
           } catch (error) {
              console.log(error)
           }
        }
        useEffect(()=>{
          getfavoriteproduct()
        },[])
  return (
    <Sidebar>
    <div>
    <h1 className='bg-info text-white'>Order LIst</h1>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>product ID</th>
          <th>product NAME</th>
          <th>Categories</th>
          <th>Description</th>
          <th>Specifications</th>
          <th>Image</th>
          <th>Price</th>
          <th>ReleaseDate</th>
          <th>Product status</th>
        </tr>
      </thead>
      {order.map((prod, index) => (
        <tbody>
          <tr key={index}>
            <td>{prod._id}</td>
            <td>{prod.productName}</td>
            <td>{prod.categories}</td>
            <td>{prod.description}</td>
            <td>{prod.specifications}</td>
            <td><img style={{width:"50px",height:"50px"}} src={prod.image} title={prod.productName} alt={prod.productName}></img></td>
            <td>{prod.price}</td>
            <td>{prod.releaseDate}</td>
            {prod.status===true ?<td>true</td>:<td>false</td> }
          </tr>
        </tbody>
      ))}
    </Table>
  </div>
  </Sidebar>
  )
}

export default OrderList