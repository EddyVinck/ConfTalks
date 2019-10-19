import React from "react";
import styled from "styled-components";

const HamburgerStyles = styled.button({
  appearance: "none",
  background: "none",
  border: "none",
  width: "32px",
  height: "24px",
  position: "relative",
  span: {
    height: "4px",
    width: "100%",
    background: "#33343c",
    display: "block",
    position: "absolute",
    transition: "0.2s ease-in-out",

    "&:nth-of-type(1)": {
      left: 0,
      top: 0
    },
    "&:nth-of-type(2)": {
      left: 0,
      top: "50%",
      transform: "translateY(-50%)"
    },
    "&:nth-of-type(3)": {
      left: 0,
      bottom: 0
    }
  },
  "&.open": {
    span: {
      "&:nth-of-type(1)": {
        transform: "translate(0, 10px) rotate(45deg)"
      },
      "&:nth-of-type(2)": {
        opacity: 0
      },
      "&:nth-of-type(3)": {
        transform: "translate(0,-10px) rotate(-45deg)"
      }
    }
  }
});

interface HamburgerProps {
  isMenuOpen: boolean;
  onClick: () => void;
  className?: string;
}

const Hamburger = (props: HamburgerProps) => {
  const classNames = [props.isMenuOpen ? "open" : "closed"]
    .concat(props.className)
    .concat("menu-toggle")
    .join(" ");
  return (
    <HamburgerStyles {...props} className={classNames}>
      <span></span>
      <span></span>
      <span></span>
    </HamburgerStyles>
  );
};

export default Hamburger;
