import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { baseUri } from '../config'

const Platforms = ({result}) => {
  return (
    <>
    <Container style={{ marginLeft: 45, marginTop: 15 }}>
            <Box sx={{ flexGrow: 2 }}>
              <Grid sx={{ rowGap: 2 }} container spacing={-13}>
                {result.map((val, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
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

    </>
  )
}

export default Platforms