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
        console.log("Response from Profile API: ", res.data.image);
        getProducts(res.data.id);
        getLinkData(res.data.id)

      })
      .catch((err) => {
        console.log(err)
      });

  }, []);

  // ----------used to extract platforms from links api------------------------
  const result = linksData.map((link) => ({ value: link.platform }));
  // console.log("Result Array",result)
  // ----------used to extract platforms from links api------------------------

  const getLinkData = async (val) =>{

    await axios
      .get(`${baseUri}links?profile=${val}`)
      .then((res) => {
        //  console.log("Response from Links API: ", res.data.results);
        setLinksData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

  }

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
            width:500,
            height: "100%",
            boxShadow: "rgb(0 0 0 / 20%) 0px 2px 12px",
           overflow:'hidden'
          }}
        >
          {/* <-------------------------top profile-----------------------> */}


          <img className="bannerImage" style={{ height: 238.11 }} src="/banners.png"></img>
          <div>
          {/* {data.direct.image? console.log("profile image exist") : console.log("profile image doesn't exist")} */}
            <img className="profileImg" src={`${baseUri}${data.image}`}></img>

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
