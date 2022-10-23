import classes from "./Input.module.css";
import React from "react";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        // id={props.input.id} this could be
        {...props.input} // this is an easy trick because outside we gave a attribute input as an object and in this way we apply all attributes directly instead of giving indivisually like above id attribute
        ref={ref}
      />
    </div>
  );
});
export default Input;
