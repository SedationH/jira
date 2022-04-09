import React, { useState, useEffect } from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import qs from "qs";
import { cleanObject } from "../../utils";
const apiURL = process.env.REACT_APP_API_URL;

function ProjectList() {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [list, setList] = useState([]); // projects
  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
}

export default ProjectList;
