import { useEffect, useState } from "react";
import { Project } from "src/screens/project-list/list";
import { useProject } from "src/screens/project-list/utils";
import { useUrlQueryParam } from "src/utils/url";

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  const openProjectModal = () => setProjectCreate({ projectCreate: true }); //设置参数的值
  const closeProjectModal = () => {
    // 不能分两次设置，合并会有问题
    setProjectCreate({ projectCreate: undefined });
    setEditingProjectId({ editingProjectId: undefined });
  };

  const { value: editingProject, loading } = useProject(
    Number(editingProjectId)
  );

  return {
    projectModalOpen:
      projectCreate === "true" || editingProjectId !== undefined,
    openProjectModal,
    closeProjectModal,
    startEdit,
    editingProjectId,
    editingProject,
    loading,
  };
};
