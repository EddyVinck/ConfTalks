import React from "react";
import styled from "styled-components";

const ThreeColumnLayoutStyles = styled.div({
  "@media (min-width: 640px)": {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: -16,
    marginRight: -16,
    ".flex-column": {
      flex: "0 0 50%",
      maxWidth: "50%",
      display: "flex",
      padding: "0 16px",
      marginBottom: "16px"
    }
  },
  "@media (min-width: 1000px)": {
    ".flex-column": {
      flex: "0 0 33.333%",
      maxWidth: "33.333%"
    }
  }
});

const ThreeColumnLayout = ({ children, ...props }) => {
  return (
    <ThreeColumnLayoutStyles {...props}>
      {React.Children.map(children, child => (
        <div className="flex-column">{React.cloneElement(child)}</div>
      ))}
    </ThreeColumnLayoutStyles>
  );
};

export default ThreeColumnLayout;
