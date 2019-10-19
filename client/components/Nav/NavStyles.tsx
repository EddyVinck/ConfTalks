import React from "react";
import styled from "styled-components";

const NavStyles = styled.div({
  h1: {
    fontSize: "32px",
    lineHeight: 1
  },
  a: {
    color: "#33343c",
    lineHeight: "inherit"
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  "@media (max-width: 759.9px)": {
    padding: "8px 0",
    position: "relative",
    ".menu-wrapper": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    ".menu-left": {
      order: 0
    },
    ".menu-toggle": {
      order: 1
    },
    ".menu-right": {
      position: "absolute",
      background: "#fff",
      width: "100%",
      right: "-100%",
      top: "100%",
      transition: "0.2s"
    },
    ".menu-right ul": {
      padding: "0 16px"
    },
    ".menu-right li": {
      marginBottom: 0
    },
    ".menu-right li a": {
      padding: "8px 0px",
      display: "block"
    },
    "&.open": {
      ".menu-right": {
        transform: "translate(-100%, 0)"
      }
    }
  },
  "@media (min-width: 760px)": {
    ul: {
      display: "flex"
    },
    li: {
      marginBottom: 0
    },
    "li a": {
      padding: "8px 16px"
    },
    ".menu-wrapper": {
      padding: "16px 0",
      display: "flex",
      justifyContent: "space-between"
    },
    ".menu-right": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    ".menu-toggle": { display: "none" }
  }
});

export default NavStyles;
