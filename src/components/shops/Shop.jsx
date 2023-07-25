import React from "react";
// import Catg from "./Catg"
import ShopCart from "./ShopCart";
import "./style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Shop = ({ addToCart, shopItems }) => {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [idcategory, setIdcategory] = useState(1);

  useEffect(() => {
    axios
      .get("http://26.30.1.50:8080/api/v1.0/Categories")
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setCategorys(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get("http://26.30.1.50:8080/api/v1.0/bestSellingByCategoryId/" + idcategory)
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setProducts(response.data);
      })
      .catch((error) => {});
  }, [idcategory]);
  return (
    <section className="shop background">
      <div className="container d_flex container_item">
        {/* <Catg /> */}
        <div className="contentWidth content__items">
          {categorys.map((category) => {
            return (
              <>
                <div className="heading d_flex">
                  <div className="heading-left row  f_flex">
                    <h2 onChange={() => setIdcategory(category.id)}>
                      {category.categoryName}
                    </h2>
                  </div>

                  <div className="category_child">
                    {category.children.slice(0, 4).map((categorychild) => {
                      return (
                        <span key={categorychild.id}>
                          {categorychild.categoryName}
                        </span>
                      );
                    })}
                  </div>
                
                    <div className="heading-right row ">
                    <Link to="/catedetail">
                      <span className="heading-right_text">View all</span>
                      <i className="fa-solid fa-caret-right"></i>
                      </Link>
                    </div>
              
                </div>
                <div className="product-content  grid1">
                  {products.map((product, index) => {
                    return (
                      <ShopCart key={index} addToCart={addToCart} shopItems={product} />
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Shop;
