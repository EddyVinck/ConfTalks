import styled from "styled-components";

const TalkListLayout = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  ".talk-list": {
    flex: "0 1 100%"
  },
  aside: {
    flex: "0 0 100%"
  },
  ".join-community": {
    display: "none"
  },
  "@media (min-width: 800px)": {
    flexDirection: "row",
    aside: {
      marginRight: "4rem",
      flex: "0 0 300px",
      marginBottom: "2rem"
    },
    ".join-community": {
      display: "block"
    }
  }
});

export default TalkListLayout;
