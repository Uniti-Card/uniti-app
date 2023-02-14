import React from "react";

const Platform = ({ link }) => {
  return (
    <div className="">
      <a
        href={
          link.platform.type === "url" && !link.value.startsWith("http")
            ? "https://" + link.value
            : link.platform.webBaseURL + link.value
        }
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            link.platform.image &&
            link.platform.image !== "" &&
            link.image &&
            link.image === ""
              ? `${process.env.REACT_APP_API_URL}${
                  link.image && link.image !== ""
                    ? link.image
                    : link.platform.image
                }`
              : `${process.env.PUBLIC_URL}/assets/link.png`
          }
          alt="link"
          className="card-img-top p-1"
        />
      </a>
      <p>
        {link.image === "" || link.image === undefined
          ? link.platform.title
          : link.title}
      </p>
    </div>
  );
};

export default Platform;
