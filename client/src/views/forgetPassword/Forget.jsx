import React, { useEffect, useState } from "react";
import "./Forget.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";

const Forget = () => {
  const navigate = useNavigate();

  // global state variables from React Redux
  const { currentUser } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auths/forget-password",
        {
          email,
        }
      );
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="forget-password-page">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <section className="forget-password-container">
        <h1 className="title">Forget Password</h1>
        <form onSubmit={handleSubmit} action="" className="form">
          <div className="input-container">
            <MdEmail className="icon" />

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="input-field"
            />

            <label htmlFor="email" className="input-label">
              Email Address
            </label>

            <span className="input-highlight"></span>
          </div>

          <button className="forget-btn">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Forget;
