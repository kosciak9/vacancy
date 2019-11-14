import React from "react";
import useFormal from "@kevinwolf/formal-web";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

type LoginViewProps = { setLoggedIn: Function };

const LoginView = ({ setLoggedIn }: LoginViewProps) => {
  const form = useFormal(
    { email: "", password: "" },
    {
      schema,
      onSubmit: values => {
        fetch("/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
          .then(response => response.text())
          .then(token => {
            localStorage.setItem("token", token);
            form.reset();
            setLoggedIn(true);
          });
      }
    }
  );

  return (
    <form {...form.getFormProps()}>
      <div>
        <label htmlFor="email">Email</label>
        <input {...form.getFieldProps("email")} type="email" />
        {form.errors.email && <div>{form.errors.email}</div>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input {...form.getFieldProps("password")} type="password" />
        {form.errors.password && <div>{form.errors.password}</div>}
      </div>

      <button {...form.getSubmitButtonProps()} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginView;
