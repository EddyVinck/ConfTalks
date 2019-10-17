import styled from "styled-components";

const FilterStyles = styled.div({
  background: "#faf5f5",
  borderRadius: 20,
  padding: "32px 24px",
  width: "100%",
  h2: {
    fontSize: "0.8rem",
    marginBottom: "1rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    opacity: 0.7
  },
  "input, select": {
    width: "100%"
  },
  "input[type=checkbox], input[type=radio]": {
    width: "auto"
  },
  label: {
    marginBottom: "0.5rem",
    display: "inline-block"
  },
  "input, select, textarea": {
    marginBottom: "1rem"
  },
  select: {
    appearance: "none",
    boxShadow: "0 2px 2px rgba(0,0,0,0.05)",
    textIndent: "0.01px",
    textOverflow: "",
    padding: ".5em 3em .5em .5em",
    /* Targetting Webkit browsers only. FF will show the dropdown arrow with so much padding. */
    "@media screen and (-webkit-min-device-pixel-ratio:0)": {
      paddingRight: "3em"
    },
    border: "1px solid #c7c7c7",
    borderRadius: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "textcolor",
    outline: "none",
    display: "inline-block",
    backgroundImage:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACgUlEQVR4nO3cSW7bQBBGYd8n3ZTY1VplkVNl8CRlOEMWOYgXvpyVhdEAIUiySFbP7wO8L+p/sjcG7+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEDzrMifwfnH3Hf0xjh3MM4dsh5hRX5v/O44iH8jgnSMc4eN3x03fne0IvssR4Txww8RpDEdP1sEdpRfp0cQQXznxg+fux3lOckRl8YngrgujZ80gsH5n9eOIII4Phr/JIKnKEfcOj4R6Lp1/KgRzD0iSZEdmPuli/Lls+P4ZckRRLDO0vGnn/un7fazyjFLfwMQwTIa46v/+SWCNIocPyCCuIoeP7AieyLQpzG+ce4hybFEoKuq8QMi0FHl+AERrFP1+AERLNPE+AERzNPU+IEV2Q/i34jguibHD+woz0RwWdPjB0Rwnsr4Ive5n+MmShGk+Q+XBD76J5qmxg+I4F2X4we9R9D1+EGvETD+RG8RMP4ZdpSnHiJg/Ctaj0BjfCvyI/dzRNVqBIw/Q2sRMP4CrUTA+CvUHgHjK6g1AsZXVFsEjB/B4PxjDRGojD/K99h3VkklgogvS2D8BEqN4PSNKIwf0doINl73tSmMn0EpETB+RrkjYPwC5IqA8QtinHtIGQHjFyhVBCrjO/8txWfSndgRMH4FYkXA+BXRjoDxK6QVAeNXTCMCxq+cEbnPEQHjFyR1BO9v43Jfcz83JlJFwPgFix0B41cgVgSMXxHtCBi/QloRMH7FrPP/1gZgnPub+zmwgtnK69LxrfiX3PdDwZIIGL8xcyJg/EbdEgHjN+5aBIzfiXMRMH5nphEwfqfMVl4ZHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlO4/4NIPH7tR+MsAAAAASUVORK5CYII=)",
    backgroundPosition: "calc(100% - 10px) 50%",
    backgroundSize: "15px",
    backgroundRepeat: "no-repeat",
    transition: "all .3s ease-in-out",

    // Fix for IE 11
    "&::-ms-expand": {
      display: "none"
    },
    "&:focus": {
      borderColor: "#569aff",
      boxShadow: "inset 0 0 4px #569aff"
    },
    "&:hover": {
      borderColor: "#888888"
    }
  }
});

export default FilterStyles;
