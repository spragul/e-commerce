import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { URL } from "../backend link";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import Sidebar from "../sidebar/sidebar";
import { AppState } from "./provider/provider";

const productSchemaValidation = yup.object({
  id: yup.string().required("Please fill in id"),
  productName: yup.string().required("please write proper productName"),
  description: yup.string().required("Please fill in product description"),
  image: yup.string().required("Please fill in product image"),
  price: yup.string().required("Please fill in product price"),
  releaseDate: yup.string().required("Please fill in product releaseDate"),
  categories: yup.string().required("Please fill in product categories"),
  specifications: yup
    .string()
    .required("Please fill in product specifications"),
  status: yup.string().required("Please fill in product status"),
});

function AddProduct() {
  const navigate = useNavigate();
  const {productData,setProductData}=AppState();
  const token = sessionStorage.getItem("token");

  //add data
  async function addproduct(productobj) {
    console.log(productobj);
    try {
      let response = await axios.post(`${URL}/product/adddata`, productobj, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      toast(response.data.message);
      if (response.status == 200) {
        setProductData([...productData, response.data])
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error ${error}`);
    }
  }

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        id: 0,
        productName: "",
        description: "",
        image: "",
        price: "",
        releaseDate: "",
        categories: "",
        specifications: "",
        status: "true",
      },
      validationSchema: productSchemaValidation,
      onSubmit: (productobj) => {
        console.log(productobj);
        addproduct(productobj);
      },
    });
  return (
    <Sidebar>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header" style={{ textAlign: "left" }}>
              <h2>Add Product</h2>
            </div>
            <div className="card-body" style={{ textAlign: "left" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Id</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      name="id"
                      value={values.id}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.id && errors.id ? (
                  <p style={{ color: "crimson" }}>{errors.ids}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>ProductName</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="productName"
                      value={values.productName}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.productName && errors.productName ? (
                  <p style={{ color: "crimson" }}>{errors.productName}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Categories</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="categories"
                      value={values.categories}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.categories && errors.categories ? (
                  <p style={{ color: "crimson" }}>{errors.categories}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="description"
                      value={values.description}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.description && errors.description ? (
                  <p style={{ color: "crimson" }}>{errors.description}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Specifications</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="specifications"
                      value={values.specifications}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.specifications && errors.specifications ? (
                  <p style={{ color: "crimson" }}>{errors.specifications}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="image"
                      value={values.image}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.image && errors.image ? (
                  <p style={{ color: "crimson" }}>{errors.image}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="Number"
                      name="price"
                      value={values.price}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.price && errors.price ? (
                  <p style={{ color: "crimson" }}>{errors.price}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>ReleaseDate</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="Date"
                      name="releaseDate"
                      value={values.releaseDate}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.releaseDate && errors.releaseDate ? (
                  <p style={{ color: "crimson" }}>{errors.releaseDate}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Product status</label>
                    <select
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="Boolean"
                      name="status"
                      value={values.status}
                    >
                      <option selected value={true}>
                        true{" "}
                      </option>
                      <option value={false}>false</option>
                    </select>
                  </div>
                </div>
                {touched.status && errors.status ? (
                  <p style={{ color: "crimson" }}>{errors.status}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: "left" }}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>{" "}
              |
              <Link className="btn btn-danger" to={"/dashboard"}>
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}

export default AddProduct;
