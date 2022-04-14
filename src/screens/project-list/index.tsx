import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import { cleanObject, useDebounce, useMount } from "src/utils";
import { useRequest } from "src/utils/request";
import List from "./list";
import styled from "@emotion/styled";
import { Typography } from "antd";

function ProjectListScreen() {
  const client = useRequest();

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const debouncedParam = useDebounce(param, 500);
  const [list, setList] = useState([]); // projects
  useEffect(() => {
    setLoading(true);
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setError(error);
        setList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedParam]);

  const [users, setUsers] = useState([]);
  useMount(() => {
    setLoading(true);
    client("users")
      .then(setUsers)
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <ScreenContainer>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {<Typography.Text type="danger">{error?.message}</Typography.Text>}
      <List loading={loading} dataSource={list} users={users} />
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
