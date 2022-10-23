import { useState } from "react";
import "./CheckoutSecondThirdApproach.css";

// Helper functions for  validating input logic
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;
const NewCheckout = (props) => {
  // for name
  const [enteredName, setEnteredName] = useState("");
  const [isNameTouch, setIsNameTouch] = useState(false);
  //   for address
  const [enteredAddress, setEnteredAddress] = useState("");
  const [isAddressTouch, setIsAddressTouch] = useState(false);
  //   for code
  const [enteredCode, setEnteredCode] = useState("");
  const [isCodeTouch, setIsCodeTouch] = useState(false);
  //   for city
  const [enteredCity, setEnteredCity] = useState("");
  const [isCityTouch, setIsCityTouch] = useState(false);
  //   value change handlers
  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const addressInputChangeHandler = (e) => {
    setEnteredAddress(e.target.value);
  };
  const codeInputChangeHandler = (e) => {
    setEnteredCode(e.target.value);
  };
  const cityInputChangeHandler = (e) => {
    setEnteredCity(e.target.value);
  };

  //   blur change handlers
  const nameInputBlurHandler = () => {
    setIsNameTouch(true);
  };
  const addressInputBlurHandler = () => {
    setIsAddressTouch(true);
  };
  const codeInputBlurHandler = () => {
    setIsCodeTouch(true);
  };
  const cityInputBlurHandler = () => {
    setIsCityTouch(true);
  };
  //   for name value and blur state validations
  const nameIsValid = !isEmpty(enteredName); //for value purpose
  const nameInputIsInValid = !nameIsValid && isNameTouch; //for style purpose
  //   for address value and blur state validations
  const addressIsValid = !isEmpty(enteredAddress); //for value purpose
  const addressInputIsInValid = !addressIsValid && isAddressTouch; //for style purpose

  //   for code value and blur state validations
  const codeIsValid = isFiveChar(enteredCode); //for value purpose
  const codeInputIsInValid = !codeIsValid && isCodeTouch; //for style purpose

  //   for city value and blur state validations
  const cityIsValid = !isEmpty(enteredCity); //for value purpose
  const cityInputIsInValid = !cityIsValid && isCityTouch; //for style purpose

  // manage overall form validity
  let formIsValid;
  if (nameIsValid && addressIsValid && codeIsValid && cityIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }
  const checkoutSubmitHandler = (e) => {
    e.preventDefault();
    setIsNameTouch(true);
    setIsAddressTouch(true);
    setIsCodeTouch(true);
    setIsCityTouch(true);

    // now we use these validity values in state updating function for styling
    if (!nameIsValid && addressIsValid && codeIsValid && cityIsValid) {
      return;
    } else {
      props.onOrderConfirm({
        name: enteredName,
        address: enteredAddress,
        city: enteredCity,
        code: enteredCode,
      });
    }
    setIsNameTouch(false);
    setIsAddressTouch(false);
    setIsCodeTouch(false);
    setIsCityTouch(false);
  };
  const nameInputClasses = nameInputIsInValid ? "control invalid" : "control";
  const addressInputClasses = addressInputIsInValid
    ? "control invalid"
    : "control";
  const cityInputClasses = cityInputIsInValid ? "control invalid" : "control";
  const codeInputClasses = codeInputIsInValid ? "control invalid" : "control";

  return (
    <form className="form" onSubmit={checkoutSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {!nameIsValid && isNameTouch && <p>Please Enter a Valid name ...</p>}
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="street">Address</label>
        <input
          type="text"
          id="street"
          onChange={addressInputChangeHandler}
          onBlur={addressInputBlurHandler}
        />
        {!addressIsValid && isAddressTouch && (
          <p>Please Enter a valid Address ...</p>
        )}
      </div>
      <div className={codeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={codeInputChangeHandler}
          onBlur={codeInputBlurHandler}
        />
        {!codeIsValid && isCodeTouch && <p>Please Enter a valid Code ...</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {!cityIsValid && isCityTouch && <p>Please Enter a valid City ...</p>}
      </div>
      <div className="actions">
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button className="submit" disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};
export default NewCheckout;
