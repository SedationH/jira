import { useAsync, useAsyncFn, useAsyncRetry } from "react-use";
import { Project } from "src/screens/project-list/list";
import { User } from "src/screens/project-list/search-panel";
import { cleanObject } from "src/utils";
import { useRequest } from "src/utils/request";

export const useProject = (id?: number) => {
  const client = useRequest();
  const URL = id ? `projects/${id}` : "projects";
  return useAsync(() => client(URL), [id]);
};

export const useProjects = (
  params: Partial<Record<"personId" | "name", string>>
) => {
  const client = useRequest();

  return useAsyncRetry<Project[]>(
    () => client("projects", { data: cleanObject(params) }),
    [params]
  );
};

export const useEditProject = () => {
  const client = useRequest();

  return (params: Partial<Project>) =>
    client(`projects/${params.id}`, {
      method: "PATCH",
      data: params,
    });
};

export const useDeleteProject = () => {
  const client = useRequest();

  return (id: number) =>
    client(`projects/${id}`, {
      method: "DELETE",
    });
};

export const useAddProject = () => {
  const client = useRequest();

  return (params: Partial<Project>) =>
    client(`projects`, {
      data: params,
      method: "POST",
    });
};

export const useUsers = () => {
  const client = useRequest();

  const {
    value: users,
    loading: userLoading,
    error: usersError,
    retry: usersRetry,
  } = useAsyncRetry<User[]>(() => client("users"));

  return {
    users: users ? users : [],
    userLoading,
    usersError,
    usersRetry,
  };
};
