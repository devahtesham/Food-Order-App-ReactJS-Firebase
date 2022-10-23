import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value; // this value is always a string even input type is number so we need to convert in a number
    const enteredAmountNumber = +enteredAmount; // now here it typecast from string to Number
    // applying some validations
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    }
    console.log("clicked");
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "Amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button>+Add</button>
      {!isAmountValid && <p>Please Enter a Valid Amount (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
