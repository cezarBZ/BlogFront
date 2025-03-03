import React from "react";
import styles from "./Divider.module.scss";

interface DividerProps {
  width?: string;
  height?: string;
  margin?: string;
}

const Divider = ({ width = "100%", height = "2px", margin }: DividerProps) => {
  return <div style={{ width, height, margin }} className={styles.divider} />;
};

export default Divider;
