import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.scss";
import { loginUser } from "../../../app/slices/session";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

const LoginForm: React.FC = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const messages = useAppSelector((state) => state.session.messages);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id, username: globalUsername } = useAppSelector(
    (state) => state.session
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { username, password };
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/owner/orders");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && globalUsername === "Piskes") {
      navigate("/owner/orders");
    }
  }, [globalUsername, id, navigate]);

  return (
    <div className={styles.loginForm}>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className={styles.requiredField}>
            Username:
          </label>
          <input
            id="username"
            name="username"
            placeholder="Please enter your username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          {messages.loginUsernameError &&
            messages.loginUsernameError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
        </div>
        <div>
          <label htmlFor="password" className={styles.requiredField}>
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {messages.loginPasswordError &&
            messages.loginPasswordError.split("\n").map((message, index) => (
              <p className={styles.error} key={index}>
                {message}
              </p>
            ))}
        </div>
        <p>Fields marked with * are mandatory to fill out.</p>
        <button>SUBMIT</button>
      </form>
    </div>
  );
};

export default LoginForm;
