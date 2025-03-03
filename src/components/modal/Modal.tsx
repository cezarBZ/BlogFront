"user client";
import React, { useRef } from "react";
import styles from "./Modal.module.scss";
import { useOnClickOutside } from "usehooks-ts";

interface modalProps {
  //   open: boolean;
  top?: number;
  right?: number;
  width?: number;
  padding?: number;
  close: () => void;
  children: React.ReactNode;
}

const Modal = ({
  children,
  right,
  top,
  width,
  close,
  padding = 10,
}: modalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, close);

  return (
    <div
      ref={ref}
      style={{ right, top, width, padding }}
      className={styles.modalContainer}
    >
      {children}
    </div>
  );
};

export default Modal;
