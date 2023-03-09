import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUri } from "../config";
const Home = () => {
  
  const {id} = useParams();
  const [data, setData] = useState({});
  const [platform, setPlatform] = useState({});
  const [linksData, setLinksData] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
    // ------------------------>Links API<-------------------------
    axios
      .get(
        `${baseUri}links?profile=63e679c9a4e473e381061f62`
      )
      .then((res) => {
        //  console.log("Response from Links API: ", res.data.results);
        setLinksData(res.data.results);
        console.log("=========Links Data from state========",linksData)
      })
      .catch((err) => {
        console.log(err);
      });

    // ------------------------>Profile API<-------------------------
    axios
      .get(
        `${baseUri}profiles/public/${id}`
      )
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
      .get(`${baseUri}products?profile=${val}`)
      .then((res) => {
        setProducts(res.data.results)
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
                        src={`${baseUri}${val.value.image}`}
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


          <h4 style={{ textAlign: "start", marginLeft: 20 }}>Products</h4>

          <Container style={{ marginLeft: 45, marginTop: 15 }}>
            <Box>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {products.map((value, index) => (
                  <Grid item xs={12} sm={12} md={12} key={index}>

                    <Card sx={{ maxWidth: 345, borderRadius: '15px' }}>

                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                      <CardMedia
                        sx={{ height: 140, margin:1, borderRadius: '17px'}}
                        image={`${baseUri}${value.image}`}
                        title="green iguana"
                      />
                      </Grid>
                      <Grid item xs={8}>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`$ ${value.price}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value.description}
                        </Typography>
                      </CardContent>
                      </Grid>
                    </Grid>
                    </Card>
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
};

export default Home;
