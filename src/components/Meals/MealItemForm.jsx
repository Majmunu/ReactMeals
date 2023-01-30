import React from "react";
import Input from "../UI/Input";
import styles from "./MealItemForm.module.scss";
export default function MealItemForm(props) {
  return (
    <form className={styles.form}>
      <Input
        label="Amount"
        input={{
        id: 'amount_' + props.id, // this changed!
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button title="add">+ 添加</button>
    </form>
  );
}