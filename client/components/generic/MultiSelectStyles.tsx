import styled from "styled-components";

const MultiSelectStyles = styled.div({
  li: {
      font: "400 13.3333px Arial",
      position: "relative",
      cursor: "pointer",
      display: "block",
      border: "none",
      height: "auto",
      textAlign: "left",
      borderTop: "none",
      lineHeight: "1em",
      color: "rgba(0,0,0,.87)",
      textTransform: "none",
      fontWeight: 400,
      boxShadow: "none",
      padding: "12px 16px",
      whiteSpace: "normal",
      wordWrap: "normal",
      marginBottom: 0,
      backgroundColor: "white",
      "&.highlighted": {
        backgroundColor: "rgba(240,240,240,1)"
      },
      "&.selected": {
        fontWeight: "bold"
      }
  },
  input: {
      border: "none",
      marginLeft: 6,
      flex: 1,
      fontSize: 14,
      minHeight: 27,
      width: "100%",
      wordWrap: "break-word",
      outline: 0,
      whiteSpace: "normal",
      background: "#fff",
      display: "inline-block",
      color: "rgba(0,0,0,.87)",
      boxShadow: "none",
      //border: "1px solid rgba(34,36,38,.15)",
      marginBottom: "1px",
      paddingRight: "32px",
      transition: "box-shadow .1s ease,width .1s ease",
      "&:hover, &:focus": {
        borderColor: "#96c8da",
        boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)"
      }
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: 10
  },
  ul: {
      padding: 0,
      marginTop: 0,
      position: "absolute",
      backgroundColor: "white",
      width: "100%",
      maxHeight: "20rem",
      overflowY: "auto",
      overflowX: "hidden",
      outline: "0",
      transition: "opacity .1s ease",
      boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)",
      borderColor: "#96c8da",
      borderTopWidth: 0,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderStyle: "solid"
  },
  ".control-button": {
    backgroundColor: "transparent",
    border: "none",
    position: "absolute",
    right: 0,
    top: 0,
    cursor: "pointer",
    width: 32,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  ".remove-button": {
      border: "none",
      marginLeft: 6,
      flex: 1,
      fontSize: 14,
      minHeight: 27
  },
  ".select-list-wrapper": {
      position: "relative",
      marginBottom: "1em"
  },
  ".select-input-wrapper": {
    position: "relative"
  },
  ".added-item": {
    display: 'grid',
    gridGap: 6,
    gridAutoFlow: 'column',
    alignItems: 'center',
  },
  ".added-item-wrapper": {
    margin: 2,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'inline-block',
    // wordWrap: 'none',
    backgroundColor: '#ccc',
    borderRadius: 2
  },
  ".input-inner-wrapper": {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  ".input-outer-wrapper": {
      color: "black",
      backgroundColor: "white",
      cursor: 'pointer',
      position: 'relative',
      //borderRadius: '6px',
      //borderTopRadius: 6,
      // borderBottomRightRadius: isOpen ? 0 : 6,
      // borderBottomLeftRadius: isOpen ? 0 : 6,
      padding: 10,
      paddingRight: 50,
      //boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
      //borderColor: '#96c8da',
      //borderTopWidth: '1',
      //borderRightWidth: 1,
      //borderBottomWidth: 1,
      //borderLeftWidth: 1,
      //borderStyle: 'solid',
  }
})
  
function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#333333"
      strokeWidth="1.5px"
      transform={isOpen ? "rotate(180)" : undefined}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      fill="transparent"
      stroke="#333333"
      strokeWidth="1.5px"
    >
      <path d="M1,1 L19,19" />
      <path d="M19,1 L1,19" />
    </svg>
  )
}

export {
    ArrowIcon,
    XIcon,
    MultiSelectStyles,
  }