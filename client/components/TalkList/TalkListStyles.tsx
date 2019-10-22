import styled from "styled-components";

const TalkListStyles = styled.ol({
  // maxWidth: "800px",
  // width: "80%",
  // margin: "0 auto",
  listStyle: "none",
  padding: 0,
  li: {
    ".talk": {
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
      "h3, h3 a": {
        color: "#33343c"
      },
      "&:hover": {
        boxShadow: "0px 8px 16px 0 rgba(104,120,125,0.3)",
        transform: "scale(1.02)",
        "h3, h3 a": {
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
      maxWidth: "100%",
      flexWrap: "wrap",
      li: {
        marginBottom: "0.6rem",
        ":after": {
          content: "',\\00a0'",
          border: ""
        },
        "&:last-of-type:after": {
          content: "''"
        }
      }
    },
    "&.no-video": {
      // TODO
    }
  },
  ".thumbnail-wrapper": {
    display: "none"
  },
  ".talk-buttons-wrapper": {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    "button, a": {
      marginBottom: "16px",
      marginRight: "16px"
    }
  },
  "@media (min-width: 800px)": {
    ".details-wrapper": {
      display: "flex",
      flexDirection: "column",
      flex: "0 1 60%"
    },
    ".talk-info": {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "space-between"
    },
    ".thumbnail-wrapper": {
      display: "flex",
      alignItems: "flex-start",
      maxWidth: "60%",
      marginBottom: "16px",
      img: {
        width: "280px",
        maxWidth: "100%"
      }
    }
  },
  "@media (min-width: 1280px)": {
    ".details-wrapper": {
      display: "flex",
      flexDirection: "column"
    },
    ".talk-info": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    ".thumbnail-wrapper": {
      marginBottom: 0
    }
  }
});

export default TalkListStyles;
