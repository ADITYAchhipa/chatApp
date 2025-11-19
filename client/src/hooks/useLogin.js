import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
const useLogin = () => {
  const {handleLogin} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      handleLogin(data);
  },
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;
