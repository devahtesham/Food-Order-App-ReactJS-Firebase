import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// Helper functions for  validating input logic
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    // yahan is state ko lene ka srf aek purpose hy r wo hy styling invalid fields ki
    name: true,
    address: true,
    code: true,
    city: true,
  });
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const codeInputRef = useRef();
  const cityInputRef = useRef();

  const checkoutSubmitHandler = (e) => {
    e.preventDefault();
    // for reading values
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCode = codeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    // for validating values
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCodeIsValid = isFiveChar(enteredCode);
    const enteredCityIsValid = !isEmpty(enteredCity);
    // now we use these validity values in state updating function for styling
    setFormInputValidity({
      // for invalid styling purpose
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      code: enteredCodeIsValid,
      city: enteredCityIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    } else {
      props.onOrderConfirm({
        name: enteredName,
        address: enteredAddress,
        city: enteredCity,
        code: enteredCode,
      });
    }
    nameInputRef.current.value = "";
    addressInputRef.current.value = "";
    codeInputRef.current.value = "";
    cityInputRef.current.value = "";
  };
  // classes for invalid fields
  const nameInputClasses = !formInputValidity.name ? classes.invalid : "";
  const addressInputClasses = !formInputValidity.address ? classes.invalid : "";
  const codeInputClasses = !formInputValidity.code ? classes.invalid : "";
  const cityInputClasses = !formInputValidity.city ? classes.invalid : "";
  return (
    <form className={classes.form} onSubmit={checkoutSubmitHandler}>
      <div className={`${classes.control} ${nameInputClasses}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please Enter a Valid name ...</p>}
      </div>
      <div className={`${classes.control} ${addressInputClasses}`}>
        <label htmlFor="street">Address</label>
        <input type="text" id="street" ref={addressInputRef} />
        {!formInputValidity.address && <p>Please Enter a valid Address ...</p>}
      </div>
      <div className={`${classes.control} ${codeInputClasses}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={codeInputRef} />
        {!formInputValidity.code && <p>Please Enter a valid Code ...</p>}
      </div>
      <div className={`${classes.control} ${cityInputClasses}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please Enter a valid City ...</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
