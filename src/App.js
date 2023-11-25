import react from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Forgot } from "./pages/forgotpass";
import { Reset } from "./pages/resetpassword";
import Empt from "./Components/Empt";
import AddProduct from "./Components/AddProduct";
import DarkExample from "./Components/Admin/admin";
import EditProduct from "./Components/Editproduct";
import ListOfProduct from "./Components/ProductList";
import { ProductDetails } from "./Components/ProductDetails";
import Favoriteproducts from "./Components/Favoriteproducts";
import OrderList from "./Components/OrderList";
export const mainurl = "http://localhost:9000";
function App() {
  return (
    <div className="App">
      <Routes>
      {/* <Route  path="/" element={<Empt /> }/> */}

      <Route path='/' element={<ListOfProduct/>}/>

      <Route path="/product/detail/:index" element={<ProductDetails/>}/>

      <Route path="/favorite/products" element={<Favoriteproducts/>}/>

      <Route path="/myorders" element={<OrderList/>}/>

      <Route path="/login" element={ <Login />}/>
       

      <Route path="/signup" element={<Signup />}/>
        

      <Route path="/forgotpassword" element={ <Forgot />}/>
       

      <Route path="/resetpassword" element={ <Reset />}/>
      

      <Route path="/addproduct" element={<AddProduct/>} />


      <Route path="/edit/product/:idx" element={<EditProduct/>}/>


      <Route path="/admin" element={<DarkExample/>}/>
       
      </Routes>
    </div>
  );
}

export default App;
