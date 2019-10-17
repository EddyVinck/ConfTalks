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
  "@media (min-width: 800px)": {
    flexDirection: "row",
    aside: {
      marginRight: "24px",
      flex: "0 0 300px",
      marginBottom: "2rem"
    }
  }
});

export default TalkListLayout;
