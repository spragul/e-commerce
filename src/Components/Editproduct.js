import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { AppState } from "./provider/provider";
import { URL } from "../backend link";

const productSchemaValidation = yup.object({
  id: yup.string().required("Please fill in id"),
  productName: yup.string().required("please write proper productName"),
  description: yup.string().required("Please fill in product description"),
  image: yup.string().required("Please fill in product image"),
  price: yup.string().required("Please fill in product price"),
  releaseDate: yup.string().required("Please fill in product releaseDate"),
  categories: yup.string().required("Please fill in product categories"),
  specifications: yup.string().required("Please fill in product specifications"),
  status: yup.string().required("Please fill in product status"),
});

function EditProduct() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const {productData,setProductData,}=AppState();
  const { idx } = useParams();
  const selectedProduct = productData.find((bk) => bk._id === idx);

  //add data
  async function editproduct(productobj) {
    console.log(productobj)
    try {
      let response = await axios.put(
        `${URL}/product/update/${idx}`,
        productobj,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response)
      setProductData([...productData])
      toast(response.data.message);
      if (response.status==200) {
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
        id: selectedProduct.id,
        productName: selectedProduct.productName,
        description: selectedProduct.description,
        image: selectedProduct.image,
        price:selectedProduct.price,
        releaseDate: selectedProduct.releaseDate,
        categories: selectedProduct.categories,
        specifications: selectedProduct.specifications,
        status:selectedProduct.status,
      },
      validationSchema: productSchemaValidation,
      onSubmit: (productobj) => {
        
        const editindex = productData.findIndex(bk => bk._id === idx);
        productData[editindex] = productobj;
        console.log(productobj);
        editproduct( productobj );
      },
    });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Edit Product</h2>
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
  );
}

export default EditProduct;
