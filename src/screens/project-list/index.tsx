import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import { cleanObject, useDebounce, useMount } from "src/utils";
import { useRequest } from "src/utils/request";
import List from "./list";
import styled from "@emotion/styled";

function ProjectListScreen() {
  const client = useRequest();

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 500);
  const [list, setList] = useState([]); // projects
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  const [users, setUsers] = useState([]);
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <ScreenContainer>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
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
