import { postsMock } from "@/mock/postsMock";
import React, { useState } from "react";
import styles from "./Post.module.scss";
import Image from "next/image";
import memphis from "../../../public/memphis.jpg";
import Favorite from "../favorite/Favorite";
import CommentIcon from "@/icons/CommentIcon";
import LikeIcon from "@/icons/LikeIcon";
import Link from "next/link";

const Post = () => {
  const [isFavorite, setIsfavorite] = useState(false);
  const post = postsMock[0];
  const likeText = post.LikeCount === 1 ? "Like" : "Likes";
  const commentText = post.CommentCount === 1 ? "Comment" : "Comments";

  const favorite = () => {
    setIsfavorite(true);
  };
  const unfavorite = () => {
    setIsfavorite(false);
  };
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <div className={styles.userInfos}>
          <div className={styles.imgContainer}>
            <Image src={memphis} alt="author" />
          </div>
          <div className={styles.infos}>
            <Link href={""}>
              <h3>{post.CreatedBy}</h3>
            </Link>
            <p>{post.CreatedAt}</p>
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
          <h1>{post.Title}</h1>
        </Link>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <LikeIcon /> {post.LikeCount} {likeText}
          </div>
          <div className={styles.stat}>
            <CommentIcon /> {post.CommentCount} {commentText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
