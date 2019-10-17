import styled from "styled-components";

const TalkListStyles = styled.ol({
  // maxWidth: "800px",
  // width: "80%",
  // margin: "0 auto",
  listStyle: "none",
  li: {
    a: {
      display: "block",
      position: "relative",
      color: "#000",
      textDecoration: "none",
      padding: "1rem 0.5rem",
      background: "white",
      borderBottom: "2px solid lightgray",
      "&:visited": {
        color: "#666"
      },
      "&:hover": {
        color: "blue"
      },
      "> p": {
        margin: "0.5rem 0 0.5rem"
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
