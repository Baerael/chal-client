import React, { useState } from 'react';
import { Card, TextField, Button, Typography, Grid } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080'

function Input() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [result, setResult] = useState(0)

  const calculate = async (operation) => {
    console.log('here', x, y)
    try {
        const res = await axios.post(`${BASE_URL}/calculate`, { x, y, operation })
        console.log(res.data)
        setResult(res.data.result)
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <Grid container justifyContent="center">
    <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: 2, p: 2, width: 800 }} elevation={4}>
      <TextField 
        label="x" 
        value={x} 
        onChange={e => setX(e.target.value)} 
        variant="outlined" 
        fullWidth 
        sx={{m: 2}}
      />
      <TextField 
        label="y" 
        value={y} 
        onChange={e => setY(e.target.value)} 
        variant="outlined" 
        fullWidth 
      />
      <Grid sx={{ display: "flex", flexDirection: "row", alignItems: "center", m: 2, p: 2, width: 800 }} elevation={4}>
        <Button variant="contained" color="primary" onClick={() => calculate('+')} sx={{ mt: 2 }}> + </Button>
        <Button variant="contained" color="primary" onClick={() => calculate('-')} sx={{ mt: 2 }}> - </Button>
        <Button variant="contained" color="primary" onClick={() => calculate('*')} sx={{ mt: 2 }}> * </Button>
        <Button variant="contained" color="primary" onClick={() => calculate('/')} sx={{ mt: 2 }}> / </Button>
      </Grid>
      <Typography variant="body1" color={green[500]} sx={{ mt: 2 }}>
        Calculated result = { result }
      </Typography>
    </Card>
  </Grid>
  );
}

export default Input;
