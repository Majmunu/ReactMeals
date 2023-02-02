import React, { Fragment } from "react";
import styles from './Header.module.scss'
import mealsImage from "../../static/image/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";
export default function Header(props) {
  return (
    
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
            <HeaderCardButton onClick={props.onShowCart}/> 
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="???" />
      </div>
    </Fragment>
  );
}
