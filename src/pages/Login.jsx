import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import meetusvr from "../assets/Imgs/mainmeetusvr.png";
import meetuslogo from "../assets/Imgs/meetusvr-logo.png";
import Loading from "../components/Loading";
import { userLogin } from "../Features/authLoginSlice";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.userAuth);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is Required").email("Email Invalid"),
    password: Yup.string().required("Passsword Is Required"),
  });

  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      isEmployee: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(userLogin(values));
      console.log(result);
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    },
  });

  return (
    <main className="bg-gradient-to-r from-[#f2f3f8] to-[#e8d0f8]">
      <div className="container px-4 min-h-dvh  grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-24 ">
        <div className="wrapper-form  text-center ">
          <hgroup className="mb-4">
            <h1 className="text-secondColor  text-[clamp(1.7rem,6vw,4rem)]">
              Welcome back
            </h1>
            <p className="text-[clamp(0.8rem,1.5vw,1.2rem)] text-colortext ">
              Step into our shopping metaverse for an unforgettable shopping
              experience
            </p>
          </hgroup>
          <form
            onSubmit={myFormik.handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="relative">
              <input
                className="w-full h-12 outline-none  border-2 border-white rounded-md px-10 bg-gray-50 "
                type="email"
                name="email"
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                placeholder="Email"
              />
              <i className="fa-regular fa-envelope absolute text-lg left-[7px] top-[50%] translate-y-[-50%] "></i>
              {myFormik.touched.email && myFormik.errors.email ? (
                <small className="text-red-600 font-semibold">
                  {myFormik.errors.email}
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <input
                className="w-full h-12 outline-none  border-2 border-white rounded-md px-10 bg-gray-50 "
                type={showPassword ? "text" : "password"}
                name="password"
                value={myFormik.values.password}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                placeholder="Password"
              />
              <i
                onClick={togglePassword}
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } absolute text-lg left-[7px] top-[50%] translate-y-[-50%]`}
              ></i>
              {myFormik.touched.password && myFormik.errors.password ? (
                <small className="text-red-600 font-semibold">
                  {myFormik.errors.password}
                </small>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              disabled={!(myFormik.isValid && myFormik.dirty)}
              className={`bg-maincolor text-white capitalize w-full h-10 rounded-md px-2  ${
                !(myFormik.isValid && myFormik.dirty)
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-maincolor/70 transition-all duration-300"
              }`}
            >
              {loading ? <Loading /> : "Login"}
            </button>
            {error && <p className="text-red-600">{error}</p>}
            <p className="text-colortext text-[clamp(1.1rem,1vw,2rem)]">
              Don't have an account? Sign up
            </p>
          </form>
        </div>
        <div className="wrapper-image relative  ">
          <img
            src={meetusvr}
            alt="meetusvr"
            loading ="lazy"
            className=" w-full max-h-[700px] object-contain"
          />
          <img
            src={meetuslogo}
            alt="meetusvr logo"
            loading"lazy"
            className="absolute left-[50%] translate-x-[-50%] top-[70%]"
          />
        </div>
      </div>
    </main>
  );
}

export default Login;
