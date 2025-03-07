"use client";
import React from "react";
import styles from "./page.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { login } from "@/services/authService";
interface FormValues {
  email: string;
  password: string;
}
const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await login(data).then();
  };

  return (
    <main className={styles.page}>
      <section>
        <h1>Login</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: { message: "Email is required", value: true },
                pattern: {
                  message: "Enter a valid email format",
                  value: /^\S+@\S+$/i,
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: { message: "Password is required", value: true },
                minLength: {
                  message: "Password must have at least 8 characters",
                  value: 8,
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Link href="">Forgot your password?</Link>
          </div>
          <button onClick={() => handleSubmit(onSubmit)()}>Login</button>
        </form>
        <div className={styles.divider}>
          <span />
          <p>Or</p>
          <span />
        </div>
        <div className={styles.register}>
          <p>
            Dont have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signin;
