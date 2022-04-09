import React from "react";

function List({ list, users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.id)?.name || "无"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
