"use client";
import Post from "@/components/post/Post";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.feed}>
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
