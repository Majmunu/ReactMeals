import React, { useEffect, useState } from "react";
import { Empty,Spin} from "antd";
import Card from "../UI/Card";
import MealItem from "./MealItem";

import classes from "./AvailableMeals.module.scss";
export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();


  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-d6ae0-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      console.log(responseData);
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setIsLoading(false);
      setMeals(loadedMeals);
    };
    
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  // 处理数据状态
  let content = <Empty description={false} />;;

  if (meals.length > 0) {
    content = <ul className={classes.ul}>{mealsList}</ul>;
  }

  if (isLoading) {
    content =  <Spin className={classes.MealsLoading} size="large" />;
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section>
      <Card>
        {content}
      </Card>
    </section>
  );
}
