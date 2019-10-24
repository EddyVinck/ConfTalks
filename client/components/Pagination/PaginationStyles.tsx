import React from "react";
import styled from "styled-components";

const PaginationStyles = styled.div({
  ".ui.pagination.menu": {
    marginBottom: "2rem"
  },
  "@media (max-width: 460px)": {
    ".ui.menu .item, .ui.pagination.menu .active.item, .ui.pagination.menu .item": {
      padding: "8px 10px 8px 10px",
      minWidth: 0
    }
  }
});

export default PaginationStyles;
