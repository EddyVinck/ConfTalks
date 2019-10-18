import styled from "styled-components";

const TalkListStyles = styled.ol({
  // maxWidth: "800px",
  // width: "80%",
  // margin: "0 auto",
  listStyle: "none",
  padding: 0,
  li: {
    a: {
      display: "block",
      position: "relative",
      color: "#33343c",
      textDecoration: "none",
      padding: "2rem 2rem 1rem 2rem",
      background: "white",
      boxShadow: "0px 7px 8px 0 rgba(104,120,125,0.2)",
      borderBottom: "2px solid #2ad1a9",
      transition: "0.2s",
      "*": {
        transition: "0.2s"
      },
      "&:hover": {
        boxShadow: "0px 8px 16px 0 rgba(104,120,125,0.3)",
        transform: "scale(1.02)",
        h3: {
          color: "#2ad1a9"
        }
      },
      "> p": {
        margin: "0.5rem 0 1.5rem"
      }
    },
    ".horizontal-list-wrapper": {
      marginBottom: "0.5rem"
    },
    "p.horizontal-list-label": {
      display: "inline-block",
      margin: "0 0.5rem 0 0"
    },
    ".horizontal-list": {
      display: "inline-flex",
      listStyle: "none",
      padding: 0,
      marginLeft: 0,
      li: {
        marginBottom: "0.6rem"
      },
      "li + li": {
        "::before": {
          content: "', '",
          border: ""
        }
      }
    },
    "&.no-video": {
      // TODO
    }
  }
});

export default TalkListStyles;
