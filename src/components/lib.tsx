import styled from "@emotion/styled";
import { Button, Spin } from "antd";

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

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//页面loading
export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;
