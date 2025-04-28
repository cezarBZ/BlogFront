import React, { useState } from "react";
import styles from "./Post.module.scss";
import Image from "next/image";
import NoProfilePic from "../../../public/NoProfilePic.jpg";
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
    <div className={styles.post} data-testid="post-component">
      {post.coverImageUrl && (
        <div className={styles.cover}>
          <Image src={example} alt="cover" />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.userInfos}>
            <div className={styles.imgContainer}>
              <Image
                src={post.user.profilePictureUrl ?? NoProfilePic}
                alt="author"
                width={50}
                height={50}
              />
            </div>
            <div className={styles.infos}>
              <Link href={""}>
                <h3 data-testid="post-author">{post.user.username}</h3>
              </Link>
              <p data-testid="post-date">{post.createdAt}</p>
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
            <h1 data-testid="post-title">{post.title}</h1>
          </Link>

          <div className={styles.stats}>
            <div className={styles.stat} data-testid="post-likes">
              <LikeIcon /> {post.likeCount} {likeText}
            </div>
            <div className={styles.stat} data-testid="post-comments">
              <CommentIcon /> {post.commentCount} {commentText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
