"use client";
import React from "react";
import styles from "./page.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signup } from "@/services/authService";
interface FormValues {
  username: string;
  email: string;
  password: string;
}
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await signup(data).then();
  };

  return (
    <main className={styles.page}>
      <section>
        <h1>Register</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              {...register("username", {
                required: { message: "Username is required", value: true },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
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
          <button onClick={() => handleSubmit(onSubmit)()}>Signup</button>
        </form>
        <div className={styles.divider}>
          <span />
          <p>Or</p>
          <span />
        </div>
        <div className={styles.register}>
          <p>
            Already have an account? <Link href="/signin">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
