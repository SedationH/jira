import { Button, Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import Pin from "src/components/pin";
import { useProjectModal } from "src/components/project-modal/utils";
import { useDeleteProject, useEditProject } from "src/service/project";
import { useRequest } from "src/utils/request";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  // TODO 想办法让 retry 不需要向下传
  retry: () => void;
}

function List({ users, retry, ...props }: ListProps) {
  const editProject = useEditProject();
  // 函数 curry
  const pinProject = (id: number) => (pin: boolean) =>
    editProject({ id, pin }).then(retry);

  const deleteProject = useDeleteProject();
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject(id).then(retry);
      },
    });
  };

  const { startEdit } = useProjectModal();

  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(_, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
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
        {
          title: "Action",
          render(_, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item onClick={() => startEdit(project.id)} key="edit">
                      编辑
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => confirmDeleteProject(project.id)}
                      key="delete"
                    >
                      删除
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button type={"link"}>...</Button>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
}

export default List;
