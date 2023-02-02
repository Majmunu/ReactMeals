import React, { useContext } from "react";
import CartContext from "../../store/cart-content";
import Modal from "../UI/Modal";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem";
export default function Cart(props) {
  useContext(CartContext);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0; //判断按钮是否显示
  const cartItemRemoveHandler = (id) => { cartCtx.removeItem(id)};
 
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1})
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button
          type="text"
          className={styles["button--alt"]}
          onClick={props.onClose}
        >
          Close
        </button>
        {hasItems && (
          <button type="text" className={styles.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
}