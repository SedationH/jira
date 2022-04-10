import React, { useState, useEffect } from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import qs from "qs";
import { apiURL, cleanObject, useDebounce, useMount } from "../../utils";

function ProjectList() {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 500);
  const [list, setList] = useState([]); // projects
  useEffect(() => {
    fetch(
      `${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  const [users, setUsers] = useState([]);
  useMount(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
}

export default ProjectList;
