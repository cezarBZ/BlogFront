"use client";
import Post from "@/components/post/Post";
import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axiosClient";
import { IPost } from "@/interfaces/IPost";
interface response {
  data: IPost[];
  isFound: boolean;
  message: string;
  isSuccess: boolean;
}
export default function Home() {
  const { data: response } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axiosClient.get<response>("/Post"),
  });

  return (
    <div className={styles.page}>
      <div className={styles.feed}>
        {response?.data.data.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
