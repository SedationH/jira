import React, { FormEvent } from "react";
import { useAuth } from "src/context/auth-context";

function RegisterScreen() {
  const { register, user } = useAuth();

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <label>
          用户名
          <input type="text" />
        </label>
      </div>
      <div>
        <label>
          密码
          <input type="text" />
        </label>
      </div>
      <button type="submit">注册</button>
    </form>
  );
}

export default RegisterScreen;
