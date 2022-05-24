import { useQuery } from "react-query";
import { useAsync, useAsyncFn, useAsyncRetry } from "react-use";
import { useRequest } from "src/utils/request";
import { User } from "./search-panel";

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

export const useProject = (id?: number) => {
  const client = useRequest();
  return useAsync(() => client(`projects/${id}`), [id]);
};
