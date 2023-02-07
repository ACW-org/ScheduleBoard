import React from "react";
import { Input, InputText, SearchContainer } from "./search_style";

export default function SeachComponent({ children, ...restProps }) {
  return (
    <SearchContainer>
      <InputText>{children}</InputText>
      <Input {...restProps} />
    </SearchContainer>
  );
}
