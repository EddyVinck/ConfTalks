import styled from "styled-components";

const Hero = styled.section({
  color: "##0A1011",
  background: "#36DEBA",
  padding: "80px 0 60px",
  p: {
    fontWeight: 600,
    fontSize: "1.6rem",
    lineHeight: "1.4em",
    marginBottom: "1.4em"
  },
  "p, label": {
    color: "#185146",
    a: {
      color: "inherit",
      textDecoration: "underline"
    }
  }
});

export default Hero;
