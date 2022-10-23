import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "../Meals/MealItem/MealItem";
//-------- now we are fetching the above data from firebase
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]); // responsible for displaying meals that comes from backend
  const [isLoading, setIsLoading] = useState(true); // state just before fetching the meals
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    // one thing you must remember that we cant make effect function asynchronous or we cant put async before this bcz it only return cleanup function which is always sychronous so thats why we create a nested function inside an effect function
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-app---reactjs-default-rtdb.firebaseio.com/meals.json"
      ); // after firebase url we put node name (like in this case meals) and .json which is firebase specific
      //checking for successfully fetched or not?
      if (!response.ok) {
        // --------------------we could also use response.status!==200
        throw new Error("Something Went Wrong !!");
        // ye throw interpreter ko is async function se foran bahr nikaldegaa r neechy ka jitnna code hy wo execute nahi hogaa
      }
      const responseData = await response.json();
      // here the responseData is a data which came from firebase and now it is an object, but you know we need an array for our component so we transform this object into array with the help of for in loop like this
      const loadedMeals = []; // helper constant
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    // here fetchMeals() is an async function so it always returns a promise so we also use .then() and catch() here for managing successful and error conditions in our response
    // yahan try catch block k bajaye promise chaining use krnaa paregaa because fetchMeals() async fn hy tu us se pehly await laagana paregaa r useEffect men effect function is cheez kii perm nahi detaa .

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      // yahn return is complete component fuunction se bahr nikaal rahaa hyyy islye jb ye condition true hogii tu bss ye return hojaegaa neechy wala code nahi execute hogaa
      <section>
        <h4 className={classes.loading}>Loading...</h4>
      </section>
    );
  }
  if (httpError) {
    return (
      <section>
        <h1 className={classes.error}>{httpError}</h1>
      </section>
    );
  }
  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
