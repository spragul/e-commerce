import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "../Components/provider/provider";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../backend link";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export function ProductDetails() {
  const [participantdisplay, setParticipantdisplay] = useState("none");
  const [message, setMessage] = useState("");
  const [productDatas, setProductDatas] = useState([]);
  const { index } = useParams();
  const navigate = useNavigate();

  const myname = sessionStorage.getItem("myName");
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("myid");

  async function getdata() {
    try {
      let response = await axios.get(`${URL}/product/${index}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setProductDatas(response.data.product[0]);
      toast(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getdata();
  }, [message]);
  //add favorite product
  async function addfavoriteproduct(idx) {
    const obj = { idx: idx };
    console.log(obj);
    try {
      let response = await axios.patch(
        `${URL}/user/addfavoriteProduct/${id}`,
        obj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      toast(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  function popmessage() {
    alert("Empty Data");
  }
  //add message
  async function addmessage(idx) {
    const obj = {
      userName: myname,
      message: message,
    };
    console.log(obj);
    try {
      if (message.length > 0) {
        let response = await axios.patch(
          `${URL}/product/addreview/${idx}`,
          obj,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        toast(response.data.message);
      } else {
        alert("Enter Message");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Sidebar>
      <div className="book-detail-condinar">
        <div className="Detail-card" style={{gap:"10px"}}>
          <h1 style={{ color: "darkgreen" }}>{productDatas.productName}</h1>
          <img
            style={{ width: "300px", height: "300px" }}
            src={productDatas.image}
            title={productDatas.productName}
            alt={productDatas.productName}
          ></img>
          <p style={{ fontSize: "30px" }}>
            categories: {productDatas.categories}
          </p>
          <p style={{ fontSize: "30px" }}>price: {productDatas.description}</p>
          <p style={{ fontSize: "30px" }}>
            price: {productDatas.specifications}
          </p>
          <p style={{ fontSize: "30px" }}>price: {productDatas.price}</p>
          <p style={{ fontSize: "30px" }}>price: {productDatas.releaseDate}</p>
          <p style={{ fontSize: "30px" }}>price: {productDatas.status}</p>

          <button
            style={{ borderRadius: "10px", backgroundColor: "gold" }}
            onClick={() => navigate("/")}
          >
            Product List
          </button>
          <button
            style={{ borderRadius: "10px", backgroundColor: "gold" }}
            onClick={() => addfavoriteproduct(productDatas._id)}
          >
            Add Favert Product
          </button>
        </div>
      </div>
      <div className="" style={{dispaly:"flex"}}>
        <h1>Add Review</h1>
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add Review"
        ></input>
        <button type="submit" onClick={() => addmessage(productDatas._id)}>
          Submit
        </button>
      </div>
      {/* {productDatas.reviews.length !== 0 ? (
        <div className="detail-part" style={{ display: participantdisplay }}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>user</th>
                <th>message</th>
              </tr>
            </thead>
            <tbody>
              {productDatas.reviews.map((name, index) => (
                <tr key={index}>
                  <td>{name.userName}</td>
                  <td>{name.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        ""
      )} */}
      {/* <div className="btn-container">
        {productDatas.reviews.length !== 0 ? (
          <div>
            {participantdisplay === "none" ? (
              <Button
                variant="primary"
                onClick={() => {
                  setParticipantdisplay("block");
                }}
                size="sm"
              >
                Show Review
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  setParticipantdisplay("none");
                }}
                size="sm"
              >
                Hidden Review
              </Button>
            )}
          </div>
        ) : (
          <Button variant="primary" onClick={() => popmessage()} size="sm">
            Show participant
          </Button>
        )}
      </div> */}
    </Sidebar>
  );
}
