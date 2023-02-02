import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-content";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCardButton.module.scss";
export default function HeaderCardButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx=useContext(CartContext)

  const { items } = cartCtx;
  const numberOfCartItems=cartCtx.items.reduce((curNumber,item)=>{
    return curNumber + item.amount;
  },0)
  console.log(cartCtx);
  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button title="HeaderCardButton" type="button" className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>购物车</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
}
