import React from "react";

const Product = ({ product }) => {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noreferrer"
      style={{
        textDecoration: "none",
        color: "inherit",
        outline: 0,
        cursor: "auto",
      }}
    >
      <div
        className="row"
        style={{
          height: "120px",
        }}
      >
        <div className="col-4">
          <img
            src={
              product.image && product.image !== ""
                ? `${process.env.REACT_APP_API_URL}${product.image}`
                : `${process.env.PUBLIC_URL}/assets/cover_placeholder.png`
            }
            alt={product.image}
            className="card ml-2"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        </div>
        <div className="col-6 mt-auto mb-auto ml-0">
          <h6>{product.title}</h6>
          {product.description}
        </div>
      </div>
    </a>
  );
};

export default Product;
