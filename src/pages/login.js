import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { URL } from "../backend link";

const userSchemaValidation = yup.object({
  email: yup.string().required("Please fill in your Email"),
  password: yup.string().required("please write proper password"),
});

export function Login() {
  const navigate = useNavigate();
  const log = async ({ loginuser }) => {
    try {
      const response = await fetch(`${URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(loginuser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.token) {
        console.log(data);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("myRole", data.myRole);
        sessionStorage.setItem("myName", data.myname);
        sessionStorage.setItem("myid", data.myid);

        navigate("/");
        toast.success("User login successful");
      } else {
        toast.error("invalide userId password");
      }
    } catch (error) {
      console.log(error);
      toast("error");
    }
  };
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "user123@gmail.com",
        password: "user1234",
      },
      validationSchema: userSchemaValidation,
      onSubmit: (loginuser) => {
        log({ loginuser });
      },
    });

  return (
    <div id="loginpageImage" className="bg-cl back">
      <MDBContainer fluid style={{ height: "100vh" }}>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className=" my-5 mx-auto"
              style={{
                borderRadius: "1rem",
                maxWidth: "400px",
                background: "#f0808017",
              }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-white text-uppercase">
                  Login
                </h2>
                <p className="text-white mb-5">
                  Please enter your login and password!
                </p>
                <div style={{ textAlign: "center" }}>
                  <form onSubmit={handleSubmit} className="text-areas">
                    <MDBInput
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      wrapperClass="mb-4 w-100"
                      style={{ color: "white" }}
                      labelClass="text-white"
                      label="Email address"
                      id="fullWidth"
                      type="email"
                      name="email"
                      size="lg"
                    />
                    {touched.email && errors.email ? (
                      <p style={{ color: "crimson" }}>{errors.email}</p>
                    ) : (
                      ""
                    )}

                    <MDBInput
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      wrapperClass="mb-4 w-100"
                      labelClass="text-white"
                      style={{ color: "white" }}
                      label="Password"
                      id="formControlLg"
                      type="password"
                      name="password"
                      size="lg"
                    />
                    {touched.password && errors.password ? (
                      <p style={{ color: "crimson" }}>{errors.password}</p>
                    ) : (
                      ""
                    )}

                    <div>
                      <p>
                        <Link to="/forgotpassword" style={{ color: "white" }}>
                          Forgot password?
                        </Link>
                      </p>
                    </div>
                    <MDBBtn
                      outline
                      className="mx-2 px-5"
                      style={{ color: "#fff" }}
                      size="lg"
                      type="submit"
                    >
                      Login
                    </MDBBtn>
                  </form>
                </div>
                <div>
                  <p>Admin</p>
                  <p>email:<span>spragul33@gmail.com</span></p>
                  <p>password<span>Ragul123@</span></p>
                </div>

                <div>
                  <p className="mb-0 text-white">
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: "white" }}>
                      Sign Up
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
