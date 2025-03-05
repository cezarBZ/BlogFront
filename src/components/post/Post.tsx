import React, { useState } from "react";
import styles from "./Post.module.scss";
import Image from "next/image";
import memphis from "../../../public/memphis.jpg";
import example from "../../../public/example.png";
import Favorite from "../favorite/Favorite";
import CommentIcon from "@/icons/CommentIcon";
import LikeIcon from "@/icons/LikeIcon";
import Link from "next/link";
import { IPost } from "@/interfaces/IPost";
interface PostProps {
  post: IPost;
}
const Post = ({ post }: PostProps) => {
  const [isFavorite, setIsfavorite] = useState(false);
  const likeText = post.likeCount === 1 ? "Like" : "Likes";
  const commentText = post.commentCount === 1 ? "Comment" : "Comments";

  const favorite = () => {
    setIsfavorite(true);
  };
  const unfavorite = () => {
    setIsfavorite(false);
  };
  return (
    <div className={styles.post}>
      {post.coverImageUrl && (
        <div className={styles.cover}>
          <Image src={example} alt="cover" />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.userInfos}>
            <div className={styles.imgContainer}>
              <Image src={memphis} alt="author" />
            </div>
            <div className={styles.infos}>
              <Link href={""}>
                <h3>{post.createdBy}</h3>
              </Link>
              <p>{post.createdAt}</p>
            </div>
          </div>
          <Favorite
            isFavorite={isFavorite}
            favorite={favorite}
            unfavorite={unfavorite}
          />
        </div>
        <div className={styles.content}>
          <Link href={""}>
            <h1>{post.title}</h1>
          </Link>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <LikeIcon /> {post.likeCount} {likeText}
            </div>
            <div className={styles.stat}>
              <CommentIcon /> {post.commentCount} {commentText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
