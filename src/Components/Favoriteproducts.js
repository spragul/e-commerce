import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../backend link";
import { Link, useNavigate } from "react-router-dom";

function Favoriteproducts() {
  const [fav, setFav] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("myid");

  async function getfavoriteproduct() {
    try {
      let response = await axios.get(`${URL}/user/getfavoriteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setFav(response.data.product);
      toast(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getfavoriteproduct();
  }, []);
  return (
    <Sidebar>
      <div className="product-condinar">
        {fav.map((productDatas, index) => (
          <div key={index} className="product-card">
            <h3>{productDatas.productName}</h3>
            <img
              src={productDatas.image}
              alt={productDatas.productName}
              title={productDatas.productName}
              className="image"
            ></img>
            <p style={{ margin: "0px" }}>
              <span style={{ color: "blue" }}>Categories:</span>
              {productDatas.categories}
            </p>
            <p style={{ margin: "0px" }}>
              <span style={{ color: "blue" }}>Price:</span>
              {productDatas.price}/hr
            </p>

            <div className="btn-group">
              <button
                className="button button-view"
                onClick={() => navigate(`/product/detail/${productDatas._id}`)}
              >
                View Detail
              </button>{" "}
              |
              <Link className="btn btn-danger" to={"/"}>
                Back
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Sidebar>
  );
}

export default Favoriteproducts;
