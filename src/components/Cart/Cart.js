import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store context/cart-context";
import CartItem from "./CartItem";
import NewCheckout from "./NewCheckout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isOrder, setIsOrder] = useState(false);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false); // this is when we click on confirm button and form/request is in submtting state
  const [didFormIsSubmitted, setDidFormIsSubmitted] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const isItem = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsOrder(true);
  };
  const orderConfirmHandler = async (userData) => {
    // for (const key in userData) {
    //   console.log(userData[key]);
    // }
    setFormIsSubmitting(true);
    await fetch(
      "https://food-order-app---reactjs-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          userItems: cartCtx.items,
        }),
      }
    );
    setFormIsSubmitting(false);
    setDidFormIsSubmitted(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const btns = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {isItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = // we do this bcz we need conditional rendering of cart content means when we submi our order we want that submit message will display instead of cart so we will wrap entire cart content in a variable
    (
      <React.Fragment>
        <div className={classes["cart-items"]}>{cartItems}</div>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isOrder && (
          <NewCheckout
            onClick={props.onClose}
            onOrderConfirm={orderConfirmHandler}
          />
        )}
        {!isOrder && btns}
      </React.Fragment>
    );
  const formSubmittingModalContent = (
    <p className={classes.feedback}>Sending Your Data ...</p>
  );
  const formSubmittedModalContent = (
    <React.Fragment>
      <p className={classes.feedback}>
        Your Details has Submitted.. Thank You !
      </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    //   we should display this cart as a modal with backdrop so we wrap this cart return in modal component which will rendered by using create portals
    <Modal onClick={props.onClose}>
      {!formIsSubmitting && !didFormIsSubmitted && cartModalContent}
      {formIsSubmitting && !didFormIsSubmitted && formSubmittingModalContent}
      {didFormIsSubmitted && formSubmittedModalContent}
    </Modal>
  );
};
export default Cart;
