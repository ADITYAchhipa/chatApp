import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
const useSignUp = () => {
  const queryClient = useQueryClient();
  const {handleLogin} = useContext(AuthContext);

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
      handleLogin(data);
    },

  });

  return { isPending, error, signupMutation: mutate };
};
export default useSignUp;
