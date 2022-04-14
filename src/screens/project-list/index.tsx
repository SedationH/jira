import React, { useState } from "react";
import SearchPanel from "./search-panel";
import { cleanObject, useDebounce } from "src/utils";
import { useRequest } from "src/utils/request";
import List from "./list";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsyncRetry } from "react-use";
import { Row } from "src/components/lib";

function ProjectListScreen() {
  const client = useRequest();

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 500);
  const {
    value: list,
    loading: listLoading,
    error: listError,
    retry: listRetry,
  } = useAsyncRetry(
    () => client("projects", { data: cleanObject(debouncedParam) }).catch(),
    [debouncedParam]
  );

  const {
    value: users,
    loading: userLoading,
    error: usersError,
    retry: usersRetry,
  } = useAsyncRetry(() => client("users"));

  return (
    <ScreenContainer>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <Row gap marginBottom style={{ justifyContent: "center" }}>
        <Typography.Text type="danger">{listError?.message}</Typography.Text>
        <Typography.Text type="danger">{usersError?.message}</Typography.Text>
        {listError || usersError ? (
          <Button
            type="primary"
            onClick={() => {
              if (listError) {
                listRetry();
              }
              if (usersError) {
                usersRetry();
              }
            }}
          >
            Retry
          </Button>
        ) : null}
      </Row>
      <List
        loading={listLoading || userLoading}
        dataSource={listError || usersError ? [] : list}
        users={users || []}
      />
    </ScreenContainer>
  );
}

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default ProjectListScreen;
