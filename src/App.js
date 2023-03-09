import { Box, Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState({});
  const [platform, setPlatform] = useState({});
  const [linksData, setLinksData] = useState([]);
  useEffect(() => {
    // ------------------------>Links API<-------------------------
    axios
      .get(
        `https://api.uniticard.com/v1/links?profile=63e679c9a4e473e381061f62`
      )
      .then((res) => {
        //  console.log("Response from Links API: ", res.data.results);
        setLinksData(res.data.results);
        // console.log("=========Links Data from state========",linksData)
      })
      .catch((err) => {
        console.log(err);
      });

    // ------------------------>Profile API<-------------------------
    axios
      .get(`https://api.uniticard.com/v1/profiles/public/63e679c9a4e473e381061f60`)
      .then((res) => {
        setData(res.data);
        // console.log("Response from Profile API: ", res.data);
        setPlatform(res.data.direct.platform);
        // console.log('platform Data: ',res.data.id)
        // setProfileId(res.data.id);
        getProducts(res.data.id);
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
      .get(`https://api.uniticard.com/v1/products?profile=${val}`)
      .then((res) => {
        // console.log(
        //   "==========Response from Get Product API=========",
        //   res.data.results
        // );
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
          <img style={{ height: 238.11 }} src="/banners.png"></img>
          <div>
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
          <Container style={{ marginLeft: 45, marginTop: 15 }}>
            <Box sx={{ flexGrow: 2 }}>
              <Grid sx={{ rowGap: 2 }} container spacing={-13}>
                {result.map((val) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <div>
                      <img
                        style={{ height: 80 }}
                        src={`https://api.uniticard.com/v1/${val.value.image}`}
                      />
                    </div>
                    <div style={{ marginTop: -15 }}>
                      <span style={{ fontSize: 11 }}>{val.value.title}</span>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>

          <div>
            <Button className="createProfile" variant="contained">
              Create your own profile
            </Button>
          </div>
        </Box>
      </header>
    </div>
  );
}

export default App;
