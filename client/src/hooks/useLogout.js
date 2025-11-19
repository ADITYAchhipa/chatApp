import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { use } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
const useLogout = () => {
  const {handleLogout} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
      handleLogout();
  },
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;
