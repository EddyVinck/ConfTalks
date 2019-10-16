import React from "react";
import styled from "styled-components";

const Container = styled.div({
  width: "100%",
  maxWidth: "95%",
  margin: "0 auto",
  [`@media (min-width: 1000px)`]: {
    maxWidth: "900px"
  },
  [`@media (min-width: 1280px)`]: {
    maxWidth: "1200px"
  }
});

export default Container;
