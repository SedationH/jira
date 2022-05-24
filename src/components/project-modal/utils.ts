import { useProject } from "src/screens/project-list/utils";
import { useSetUrlSearchParam, useUrlQueryParam } from "src/utils/url";

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

  const setUrlParams = useSetUrlSearchParam();
  const closeProjectModal = () => {
    setUrlParams({
      projectCreate: undefined,
      editingProjectId: undefined,
    });
  };

  const { value: editingProject, loading: projectLoading } = useProject(
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
    projectLoading,
  };
};
