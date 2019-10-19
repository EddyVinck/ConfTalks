import styled from "styled-components";

const AsideBlock = styled.div(props => {
  return {
    background: "#36DEBA",
    color: "#33343c",
    borderRadius: 20,
    padding: "32px 24px",
    marginBottom: "3rem",
    width: "100%",
    boxShadow: "0px 8px 7px 0 rgba(104,120,125,0.25)",
    h2: {
      fontSize: "0.8rem",
      marginBottom: "1rem",
      letterSpacing: "2px",
      textTransform: "uppercase",
      opacity: 0.7
    },
    a: {
      textDecoration: "underline",
      color: "#33343c"
    }
  };
});

export default AsideBlock;
