import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Platform from "./Platform";
import Product from "./Product";
import "./profile.css";

const ProfileCard = ({ profile }) => {
  const { results: links } = useSelector((state) => state.link);
  const { results: products } = useSelector((state) => state.product);

  const connectHandler = () => {
    var urlString =
      `${process.env.REACT_APP_API_URL}/profiles/contact-card/` + profile.id;
    window.open(urlString, "_self");
  };
  return (
    <Card>
      <div
        style={{
          background: profile.themeColor
            ? `linear-gradient(#${profile.themeColor.substring(3)},transparent)`
            : "transparent",
          borderRadius: "20px",
        }}
      >
        <div className="upper">
          <img
            src={
              profile.cover && profile.cover !== ""
                ? `${process.env.REACT_APP_API_URL}${profile.cover}`
                : `${process.env.PUBLIC_URL}/assets/cover_placeholder.png`
            }
            className="img-fluid bg-light"
            alt=""
          />
        </div>

        <div className="user text-center">
          <div className="profile">
            <img
              src={
                profile.image && profile.image !== ""
                  ? `${process.env.REACT_APP_API_URL}${profile.image}`
                  : `${process.env.PUBLIC_URL}/assets/user_placeholder.png`
              }
              className="rounded-circle"
              width="80"
              alt=""
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <br />
          <h4 className="mb-0 mt-3 ">{profile.name}</h4>
          <span className="text-muted d-block mb-0">{profile.location}</span>
          <span className="text-muted d-block mb-2">{profile.bio}</span>

          <button
            onClick={connectHandler}
            className="btn btn-primary btn-sm follow mb-5"
            style={{
              backgroundColor: `#${
                profile.themeColor && profile.themeColor !== "#ffffffff"
                  ? profile.themeColor.substring(3)
                  : "000000"
              }`,
            }}
          >
            Save Contact
          </button>
        </div>
      </div>
      <div className="row ml-4 mr-4">
        {links &&
          links.map((link, key) => {
            return link.status ? (
              <div className="col-4 text-center" key={key}>
                <Platform link={link} />
              </div>
            ) : (
              <></>
            );
          })}
      </div>
      <div>
        {products && products.length >= 1 ? (
          <div className="row m-2">
            <h4>{profile.category || "Products"}</h4>
            {products.map((product, key) => {
              return (
                <div className="card col-12 p-0" key={key}>
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
