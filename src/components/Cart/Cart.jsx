import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-content";
import Modal from "../UI/Modal";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
export default function Cart(props) {
  useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0; //判断按钮是否显示
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
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
  const modalActions = (
    <div className={styles.actions}>
      <button
        type="text"
        className={styles["button--alt"]}
        onClick={props.onClose}
      >
        Close
      </button>
      {hasItems && (
        <button type="text" className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  // 发送数据
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-d6ae0-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
      <button className={styles.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return <Modal onClose={props.onClose}>
      {/* 未提交 */}
      {!isSubmitting && !didSubmit && cartModalContent}
      {/* 提交中 */}
      {isSubmitting && isSubmittingModalContent}
      {/* 已提交 */}
      {!isSubmitting && didSubmit && didSubmitModalContent}
  </Modal>;
}
