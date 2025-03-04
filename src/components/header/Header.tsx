"use client";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import NewIcon from "@/icons/NewIcon";
import NotificationIcon from "@/icons/NotificationIcon";
import Image from "next/image";
import memphis from "../../../public/memphis.jpg";
import Modal from "../modal/Modal";
import Options from "./Options";

const Header = () => {
  const [openModal, setopenModal] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Meu blog</div>

      <div className={styles.search}>
        <input type="text" placeholder="Search" />
      </div>

      <div className={styles.actions}>
        <button className={styles.newPostButton}>
          <NewIcon /> New post
        </button>
        <button className={styles.notificationButton}>
          <NotificationIcon />
        </button>
        <div style={{ position: "relative" }}>
          <button
            className={styles.profileButton}
            onClick={() => setopenModal(!openModal)}
          >
            <Image src={memphis} alt="profile pic" width={50} height={50} />
          </button>

          {openModal && (
            <Modal top={45} right={20} width={200} close={() => setopenModal(false)}>
              <Options />
            </Modal>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
