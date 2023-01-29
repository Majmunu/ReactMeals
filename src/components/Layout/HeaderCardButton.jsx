import React from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCardButton.module.scss";
export default function HeaderCardButton(props) {
  return (
    <button title="HeaderCardButton" type="button" className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>购物车</span>
      <span className={styles.badge}>3</span>
    </button>
  );
}
