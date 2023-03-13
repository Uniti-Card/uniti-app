import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { baseUri } from '../config'

const Products = ({products}) => {
  return (
    <>

    <h4 style={{ textAlign: "start", marginLeft: '10vh' }}>Products</h4>
          <Container style={{ marginLeft: '7vh'}}>

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
                        title="products"
                      />
                      </Grid>
                      <Grid item xs={8}>
                      <CardContent style={{textAlign:'initial'}}>
                        <Typography gutterBottom variant="h6" component="div">
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="black">
                          {`$ ${value.price}`}
                        </Typography>
                        <Typography variant="body2" color="black">
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
    </>
  )
}

export default Products