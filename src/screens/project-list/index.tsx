import SearchPanel, { User } from "./search-panel";
import { cleanObject, useDebounce, useTitle } from "src/utils";
import { useRequest } from "src/utils/request";
import List, { Project } from "./list";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsyncRetry } from "react-use";
import { Row } from "src/components/lib";
import { useUrlQueryParam } from "src/utils/url";
import { useProject, useProjects, useUsers } from "src/service/project";

function ProjectListScreen() {
  useTitle("项目列表", false);

  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debouncedParam = useDebounce(param, 500);

  // TODO 解决每次从 Drawer 回 首页刷新的问题
  // 初步判断是因为 useUrlQueryParam 刷了一半 param 导致的
  const {
    value: list,
    loading: listLoading,
    error: listError,
    retry: listRetry,
  } = useProjects(debouncedParam);

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
