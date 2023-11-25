import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState } from './provider/provider';
import Sidebar from "../sidebar/sidebar";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { URL } from '../backend link';
import axios from "axios";
import { toast } from "react-toastify";

export default function ListOfProduct() {
    const { productData,setProductData } = AppState();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const MyRole = sessionStorage.getItem('myRole');
    const token=sessionStorage.getItem('token');
    const id=sessionStorage.getItem('myid')
    //add order
    async function addorder(idx){
        const obj={idx:idx};
        console.log(obj)
         try {
            let response = await axios.patch(`${URL}/user/addorder/${id}`, obj, {
                headers: { Authorization: `Bearer ${token}` },
              });
              console.log(response);
              toast(response.data.message);
         } catch (error) {
            console.log(error)
         }
      }

    //product
    useEffect(() => {
        const getDetails = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };
                const response = await fetch(`${URL}/product`,{ headers });
                const data = await response.json();
                const setdata =data.product
                // console.log(setdata);
                setProductData(setdata)
            } catch (error) {
                console.log(error);
            }
        }
        if(token){
        getDetails();
        }
    }, [])

    
    return (
        <Sidebar>
            <div className='product-condinar'>
                <Form>
                    <InputGroup className='my-3'>

                        {/* onChange for search */}
                        <Form.Control
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search product Name'
                        />
                    </InputGroup>
                </Form>
            </div>

            <div className='product-condinar'>
                {
                    productData
                        .filter((item) => {
                            return search.toLowerCase() === ''
                                ? item
                                : item.productName.toLowerCase().includes(search.toLowerCase());
                        }).map((productDatas, index) => (
                            <div key={index} className="product-card">
                                <h3>{productDatas.productName}</h3>
                                <img src={productDatas.image} alt={productDatas.productName} title={productDatas.productName} className="image"></img>
                                {/* <p style={{ margin: "0px" }}><span style={{ color: "blue" }}>model:</span>{productDatas.model}</p> */}
                                <p style={{ margin: "0px" }}><span style={{ color: "blue" }}>Categories:</span>{productDatas.categories}</p>
                                <p style={{ margin: "0px" }}><span style={{ color: "blue" }}>Price:</span>{productDatas.price}</p>

                                <div className='btn-group'>
                                    <button
                                        className='button button-view'
                                        onClick={() => navigate(`/product/detail/${productDatas._id}`)}
                                    >View Detail
                                    </button>
                                        <div>
                                            <button
                                                className='button button-view'
                                                onClick={() => addorder(productDatas._id)}
                                            >Buy
                                            </button>
                                        </div> 
                                </div>
                            </div>
                        ))
                }
            </div>
        </Sidebar>
    );
};

