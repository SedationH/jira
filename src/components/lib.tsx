import styled from "@emotion/styled";

// 垂直居中，按行排布子元素
export const Row = styled.div<{
  gap?: number | boolean;
  marginBottom?: number | boolean;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) =>
    typeof props.marginBottom === "number"
      ? props.marginBottom + "rem"
      : props.marginBottom
      ? "2rem"
      : undefined};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
