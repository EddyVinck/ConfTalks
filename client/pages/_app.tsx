import App from "next/app";
import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "next/router";
import * as gtag from "../utils/analytics/gtag";
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

// pallette
// ["#2AD1A9", "#FCFCFC", "#33343c", "#0A1011", "#25977C", "#22584B", "#EF1A1C", "#36DEBA", "#A3C8C1"]
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 16px;
  }
  body {
    margin: 0;
    color: #0A1011;
    font-family: 'slabo', serif;
    background: #FCFCFC;
  }
  a {
    color: #178269;

    &:hover {
      color: #22584B;
    }
  }
  h1, h2, h3, h4, h5, h6, p, li, blockquote, label, a {
    overflow-wrap: break-word;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    line-height: 1.125em;
    margin-bottom: 2rem;
    font-family: 'roboto mono', monospace;
  }
  p, li, blockquote, label {
    line-height: 1.25em;
    margin-bottom: 1.25em;
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
  .ui.menu {
    font-family: monospace;
  }
  @media (max-width: 600px) {
    h1 {
    font-size: 2.8rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.5rem;
    }
    h4 {
      font-size: 1rem;
    }
  }
  blockquote {
    font-size: 1rem;
    width: 60%;
    margin: 50px 0;
    font-style: italic;
    color: #0A1011;
    padding: 1.2em 30px 1.2em 50px;
    border-left: 8px solid #2AD1A9;
    line-height: 1.6;
    position: relative;
    background: #e4fffa;
    
    &::before {
      content: '\\201C';
      font-family: sans-serif;
      color: #2AD1A9;
      font-size: 4em;
      position: absolute;
      left: 10px;
      top: -10px;
    }
    ::after {
      content: '';
    }
    strong,  b {
      display: block;
      color: #333333;
      font-style: normal;
      font-weight: bold;
      margin-top: 1em;
    } 
  }
`;

const HeadTags = ({ description = "ConfTalks is an open source index of already recorded and scheduled conference talks to help you decide if you should go."}) => (
  <Head>
    <title>ConfTalks.org</title>
    <meta name="description" content={description}/>
    <link rel="stylesheet" href="/fonts/fonts.css" />
    <link rel="icon" href="/favicon/favicon.ico" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/favicon/safari-pinned-tab.svg"
      color="#202020"
    />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <meta name="msapplication-TileColor" content="#000000" />
    <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
    <meta name="theme-color" content="#36DEBA" />
    <meta property="og:title" content="ConfTalks"/>
    <meta property="og:url" content="https://conftalks.org"/>
    <meta property="og:image" content="/conftalks.jpg"/>
    <meta property="og:site_name" content="ConfTalks"/>
    <meta property="og:description" content={description}/>
  </Head>
);

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <HeadTags />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
