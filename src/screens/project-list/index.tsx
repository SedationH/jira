import React, { useMemo, useState } from "react";
import SearchPanel, { User } from "./search-panel";
import { cleanObject, useDebounce, useTitle } from "src/utils";
import { useRequest } from "src/utils/request";
import List, { Project } from "./list";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsyncRetry } from "react-use";
import { Row } from "src/components/lib";
import { useUrlQueryParam } from "src/utils/url";
import { useUsers } from "./utils";

function ProjectListScreen() {
  const client = useRequest();
  useTitle("项目列表", false);
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  const debouncedParam = useDebounce(param, 500);
  const {
    value: list,
    loading: listLoading,
    error: listError,
    retry: listRetry,
  } = useAsyncRetry<Project[]>(
    () => client("projects", { data: cleanObject(debouncedParam) }),
    [debouncedParam]
  );

  const { users, userLoading, usersError, usersRetry } = useUsers();

  return (
    <ScreenContainer>
      <SearchPanel
        param={param as any}
        setParam={setParam}
        users={users || []}
      />
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
        retry={listRetry}
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
