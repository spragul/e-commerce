import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "./provider/provider";
import Sidebar from "../sidebar/sidebar";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { URL } from "../backend link";
import axios from "axios";
import { toast } from "react-toastify";

export default function ListOfProduct() {
  const { productData, setProductData } = AppState();
  const [data,setData]=useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const MyRole = sessionStorage.getItem("myRole");
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("myid");
  const [count,setCount]=useState(0);
  const [mysort,setMysort]=useState(0);
  console.log(mysort)
  //add order
  async function addorder(idx) {
    const obj = { idx: idx };
    console.log(obj);
    try {
      let response = await axios.patch(`${URL}/user/addorder/${id}`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      toast(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }



  //product
  useEffect(() => {
    const getDetails = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`${URL}/product`, { headers });
        const data = await response.json();
        const setdata = data.product;
        // console.log(setdata);
        setProductData(setdata);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getDetails();
    }
  }, [count,mysort]);

  return (
    <Sidebar>
      <div className="product-condinar">
        <Form>
          <InputGroup className="my-3">
            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product Name"
            />
          </InputGroup>
        </Form>
        <div>
          <h6>Popularity</h6>
          <div className="btn">

             <button className="mybtn-low" type="button" onClick={()=>setCount(2)} >Low to High</button>
          </div>
          <div className="btn ">
             <button className="mybtn-high" type="button" onClick={()=>setCount(3)} > High to Low</button>
          </div>
        </div>
        <div>
          <h6>Price</h6>
          <div className="btn">
             <button className="mybtn-low" type="button" onClick={()=>setCount(1)} >Low to High</button>
          </div>
          <div className="btn ">
             <button className="mybtn-high" type="button" onClick={()=>setCount(-1)} > High to Low</button>
          </div>
           <div className="btn"> <button className="mybtn-low" type="button" onClick={()=>setCount(0)} >Reset</button></div>
        </div>
      </div>

      <div className="product-condinar">
        {productData.sort((a,b)=>{
            if (count == 0) {
              return 0;
          }
          else if (count == 1) {
            return a.price - b.price
          }
          else if (count == -1) {
            return b.price - a.price 
          }
          else if (count == 2) {
            return a.popularity - b.popularity  
          }
          else if (count == 3) {
            return b.popularity - a.popularity 
          }
          
        
        })
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.productName.toLowerCase().includes(search.toLowerCase())||
              item.categories
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              String(item.price).includes(search)
          })
          .map((productDatas, index) => (
            <div key={index} className="product-card">
              <h3>{productDatas.productName}</h3>
              <img
                src={productDatas.image}
                alt={productDatas.productName}
                title={productDatas.productName}
                className="image"
              ></img>
              {/* <p style={{ margin: "0px" }}><span style={{ color: "blue" }}>model:</span>{productDatas.model}</p> */}
              <p style={{ margin: "0px" }}>
                <span style={{ color: "blue" }}>Categories:</span>
                {productDatas.categories}
              </p>
              <p style={{ margin: "0px" }}>
                <span style={{ color: "blue" }}>Price:</span>
                {productDatas.price}
              </p>

              <div className="btn-group">
                <button
                  className="button button-view"
                  onClick={() =>
                    navigate(`/product/detail/${productDatas._id}`)
                  }
                >
                  View Detail
                </button>
                <div>
                  <button
                    className="button button-view"
                    onClick={() => addorder(productDatas._id)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Sidebar>
  );
}
