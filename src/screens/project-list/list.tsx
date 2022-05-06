import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "./search-panel";

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

function List({ users, ...props }: ListProps) {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(_, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render: (_, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(_, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
}

export default List;
