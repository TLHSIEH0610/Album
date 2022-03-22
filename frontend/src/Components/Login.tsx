import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useForm } from "react-hook-form";

import { Box } from "@mui/material";
import { useLogin } from "services/auth";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { handleSubmit, register } = useForm<FormValues>();
  const { mutateAsync: loginMutation } = useLogin();
  const navigate = useNavigate();
  const onSubmit = (values: FormValues) => {
    loginMutation(values)
      .then((res) => {
        localStorage.setItem("token", res.token || "");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box sx={{}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label>Email</label>
            <Input {...register("email")} type="text" />
          </section>

          <section>
            <label>Password</label>
            <Input {...register("password")} type="text" />
          </section>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
