import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import Router from "next/router";
import * as gtag from "../utils/analytics/gtag";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
