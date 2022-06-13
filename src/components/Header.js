import React from "react";
import theme from "../theme";

import {
    Typography, ThemeProvider, CssBaseline
  } from '@material-ui/core'


const Header = () => {
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <center>
            <Typography variant="h3">邑南町の地名 <br></br> クイズ</Typography>
            <br></br>
            <Typography variant="h5">未完成のデモンストレーション版</Typography>
            </center>
            <br></br>
        </ThemeProvider>
    )
}

export default Header;



