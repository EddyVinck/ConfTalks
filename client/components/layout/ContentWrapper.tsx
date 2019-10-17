import styled from "styled-components";

interface StyledProps {
  variant?: string;
}

const ContentWrapper = styled.div(<T extends StyledProps>(props: T) => ({
  maxWidth: "540px",
  width: "100%",
  ...(props.variant === "center" && {
    marginLeft: "auto",
    marginRight: "auto"
  })
}));

export default ContentWrapper;
