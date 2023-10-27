import React, { useEffect, useState } from "react";
import "./ResetPas.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineEye } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

const ResetPass = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  // global state variables from React Redux
  const { currentUser } = useSelector((state) => state.user);

  // Local variables
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // If the user is logged in, user cannot access forget password page
  useEffect(() => {
    //! currentUser || !token
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser, token]);

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Reset all state variables for the login form
  const reset = () => {
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  // Handle submit
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auths/reset-password", {
        password,
        token,
      });
      navigate("/login");
      toast.success("Password updated successfully");
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="reset-password-page">
      <Helmet>
        <title> Reset password </title>
      </Helmet>
      <section className="reset-password-container">
        <h1 className="title">Reset Password</h1>

        <form onSubmit={submitHandler} action="" className="form">
          {/* Password */}
          <div className="input-container">
            <RiLockPasswordFill className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //onBlur={checkPasswordFormat}
              placeholder="Enter Password"
              className="input-field"
            />
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <span className="input-highlight"></span>
            <span onClick={displayPassword} className="password-display">
              {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
            </span>
          </div>

          {/* Password */}
          <div className="input-container">
            <RiLockPasswordFill className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              //onBlur={checkPasswordFormat}
              placeholder="Enter Confirm Password"
              className="input-field"
            />
            <label htmlFor="confirmPassword" className="input-label">
              Confirm Password
            </label>
            <span className="input-highlight"></span>
            <span onClick={displayPassword} className="password-display">
              {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
            </span>
          </div>

          <button className="reset-password-btn"> Reset Password </button>
        </form>
      </section>
    </main>
  );
};

export default ResetPass;
