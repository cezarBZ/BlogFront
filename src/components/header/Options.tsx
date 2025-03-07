import React from "react";
import styles from "./Options.module.scss";
import Divider from "../divider/Divider";
import Logouticon from "@/icons/Logouticon";
import SettingsIcon from "@/icons/SettingsIcon";
import ProfileIcon from "@/icons/ProfileIcon";
import { logout } from "@/services/authService";

const Options = () => {
  const handleLogout = () => {
    logout();
  };
  return (
    <ul className={styles.optionsList}>
      <li>
        <ProfileIcon />
        Profile
      </li>
      <li>
        <SettingsIcon /> Settings
      </li>
      <Divider />
      <li style={{ fontSize: "10px", fontWeight: "bold" }} onClick={handleLogout}>
        <Logouticon />
        Logout
      </li>
    </ul>
  );
};

export default Options;
