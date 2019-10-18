import React from "react";
import styled from "styled-components";

interface ButtonProps {
  variant?: string;
  outline?: boolean;
}

const Button = styled.button((props: ButtonProps) => ({
  "-webkit-appearance": "none !important",
  "-moz-appearnce": "none !important",
  border: "2px solid #fb5557",
  background: "#fb5557",
  transition: "0.2s",
  letterSpacing: "1px",
  cursor: "pointer",
  "&:hover": {
    background: "#EF1A1C",
    borderColor: "#EF1A1C",
    boxShadow: "0px 7px 8px 0 rgba(104,120,125,0.2)"
  },
  "&:focus": {
    outline: 0,
    boxShadow: "0 0 7px 2px rgba(255, 128, 128, 0.8)"
  },
  marginBottom: "1.5rem",
  color: "#fcfcfc",
  "text-transform": "uppercase",
  fontFamily: "'slabo', serif",
  fontSize: "15px",
  // lineHeight: "",
  fontWeight: 600,
  borderRadius: "8px",
  padding: "10px 20px",
  ...(props.variant &&
    props.variant === "secondary" && {
      color: "#0A1011",
      background: "#2AD1A9",
      borderColor: "#2AD1A9",
      "&:hover": {
        background: "#25977C",
        borderColor: "#25977C"
      },
      "&:focus": {
        boxShadow: "0 0 7px 2px rgba(54, 222, 186, 0.8)"
      },
      ...(props.outline && {
        color: "#2AD1A9",
        "&:hover": {
          color: "#0A1011",
          background: "#2AD1A9",
          borderColor: "#2AD1A9"
        }
      })
    }),
  ...(props.outline && {
    background: "none",
    borderColor: "currentColor"
  })
}));

export default Button;
