import App from "next/app";
import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "next/router";
import * as gtag from "../utils/analytics/gtag";
import "semantic-ui-css/semantic.min.css";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    color: #240000;
    font-family: 'sans-serif'
  }
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    line-height: 1.125em;
    margin-bottom: 2rem;
  }
  p, li, blockquote, label {
    line-height: 1.25em;
    font-size: 1rem;
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 2.8rem;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 1.5rem;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
