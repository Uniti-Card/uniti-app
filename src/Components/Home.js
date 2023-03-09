import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUri } from "../config";
import Platforms from "./Platforms";
import Products from "./Products";
const Home = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [linksData, setLinksData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ------------------------>Profile API<-------------------------
    axios
      .get(`${baseUri}profiles/public/${id}`)
      .then((res) => {
        setData(res.data);
        console.log("Response from Profile API: ", res.data);
        console.log("testing image from direct object", res.data.direct.image)
        // console.log("<======ID for Links API is=======> :  ", res.data.id);
        // setPlatform(res.data.direct.platform);
        // console.log('platform Data: ',res.data.id)
        // setProfileId(res.data.id);
        getProducts(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });

    // ------------------------>Links API<-------------------------
    axios
      .get(`${baseUri}links?profile=${id}`)
      .then((res) => {
        //  console.log("Response from Links API: ", res.data.results);
        setLinksData(res.data.results);
        // console.log("=========Links Data from state========",linksData)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ----------used to extract platforms from links api------------------------
  const result = linksData.map((link) => ({ value: link.platform }));
  // console.log("Result Array",result)
  // ----------used to extract platforms from links api------------------------

  const getProducts = async (val) => {
    // ------------------------>Get Products<-------------------------
    await axios
      .get(`${baseUri}products?profile=${val}`)
      .then((res) => {
        setProducts(res.data.results);
        console.log(
          "==========Response from Get Product API=========",
          res.data.results
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            width: 500,
            height: "100%",
            boxShadow: "rgb(0 0 0 / 20%) 0px 2px 12px",
          }}
        >
          {/* <-------------------------top profile-----------------------> */}

          <img style={{ height: 238.11 }} src="/banners.png"></img>
          <div>
          {/* {data.direct.image? console.log("profile image exist") : console.log("profile image doesn't exist")} */}
            <img className="profileImg" src="/profile.png"></img>
            {/* <img className="profileImg" src={`https://api.uniticard.com/v1/${}`}></img> */}
          </div>
          <div>
            <p className="nameStyle">{data.name}</p>
            <p className="ocpStyle">{data.title}</p>
            <p className="cityStyle">{data.category}</p>
          </div>
          <div>
            <Button className="saveContact" variant="contained">
              Save Contact
            </Button>
          </div>

          {/* platform component */}

          <Platforms result={result} />

          {/* Product component */}

          <Products products={products} />
          <div>
            <Button className="createProfile" variant="contained">
              Create your own profile
            </Button>
          </div>
        </Box>
      </header>
    </div>
  );
};

export default Home;
