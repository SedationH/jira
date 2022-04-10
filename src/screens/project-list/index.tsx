import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import { cleanObject, useDebounce, useMount } from "src/utils";
import { useRequest } from "src/utils/request";
import List from "./list";

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
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
}

export default ProjectListScreen;
