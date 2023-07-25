import React from "react";
import logo from "../../components/assets/images/logo.svg";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

const Search = ({ CartItem }) => {
  // fixed Header
  // window.addEventListener("scroll", function () {
  //   const search = document.querySelector(".search");
  //   search.classList.toggle("active", window.scrollY > 100);
  // });

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const location = useLocation();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setIsLoggedIn(true);
  //   }
  // }, [location]);

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  // };

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <Link to="/">
              {" "}
              <img src={logo} alt="" />
            </Link>
          </div>
          <Navbar />

          <div className="icon f_flex width">
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
