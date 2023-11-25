import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "../Components/provider/provider";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../backend link";

export function ProductDetails() {
  const { productData } = AppState();
  const { index } = useParams();
  const navigate = useNavigate();

  const productDatas = productData.find((bk) => bk._id === index);

  const token = sessionStorage.getItem("token");
  const id=sessionStorage.getItem('myid')
  //add favorite product
  async function addfavoriteproduct(idx){
    const obj={idx:idx};
    console.log(obj)
     try {
        let response = await axios.patch(`${URL}/user/addfavoriteProduct/${id}`, obj, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response);
          toast(response.data.message);
     } catch (error) {
        console.log(error)
     }
  }
  return (
    <Sidebar>
      <div className="book-detail-condinar">
        <div className="Detail-card">
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
    </Sidebar>
  );
}
