import { useUrlQueryParam } from "src/utils/url";

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate", //projectCreate:url中的参数
  ]);

  const openProjectModal = () => setProjectCreate({ projectCreate: true }); //设置参数的值
  const closeProjectModal = () =>
    setProjectCreate({ projectCreate: undefined }); //设置参数的值

  return {
    projectModalOpen: projectCreate === "true",
    openProjectModal,
    closeProjectModal,
  };
};
