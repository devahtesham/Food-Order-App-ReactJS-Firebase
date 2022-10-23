/*
STEPS TO CREATE CONTEXT
1. create context
2. provider
3. consumer
*/
import React from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
}); // this inside's data is optional, this is only for auto completion
export default CartContext;
