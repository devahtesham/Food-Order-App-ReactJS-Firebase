import CartContext from "./cart-context";
// ham cart ki state ko yahan islye manage krrahy hen kiun k koi item cart men add ya remove hoga tu ye component re-evaluated hoga because yahin add r remove items k functions create huy hen
import { useReducer } from "react"; // useReducer hook yahan items r totalAmount ko manage krne k lye lia hy mene

// my initial state which i am going to manage
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
// reducer function
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // total amount ty hamen har haal men chahye hi chahye chahy item pehly se add hochukaa ho ya first time add horaha hoo.....
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount; // ham yahn jo item recieve krrahy hen tyu .(dot) notation se uski properties ko access krrahy hen tu yahn se hamen pta lagraha hy k hamara item aek object hogaa
    // ab array men agr ham koi item ko concat krwarahy hen tu pehly ham yahan check krengy k wo item already us array men hy tu nahi  agr hy tu usy alag se as a new item add na kren usi previously added item ki amount men uski amount merge krden alag se aek new item add nahi krna hamen .....That is our goal
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // jis item ki id is newly adding item se match hogai us ka index number return krdega ye finIndex ka method kiun k ye array k har element pr chlta hy
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      // yahan if block men wo jb aega jb hamara wo item jo ham add krwarahy hen(action.item) wo existing array(state.item) men mojood hyy r kis position/index pr hy wo hmne findIndex() k zarye nikal li r yahan us ka index (existingCartItemIndex) variiable mn store hy
      let updatedItem;
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items]; // hamari complete array of objects ko hamne simply is array men assign krdia
      updatedItems[existingCartItemIndex] = updatedItem; //  r yahn hamne uper wali entire array men se bs is khaas index waly item ko overwrite kia hy ......yahn hamne ye kia hy k jis index pr wo item find hua tha  jo hamary abhi newly added item se match kia tha tu bs is object ko mene apni array k usi index pr bhyjdiaa jahn findIndex() ne isy grap kia thaa
    } else {
      // yahan else men wo case hy jb wo item jis ko aap add krwarahy ho(action.item) wo previously add na ho array men , very first time add horaha ho tu ham simply bs usko apni existing array men concat krwadengn
      updatedItems = state.items.concat(action.item);
    }
    return {
      // now we are returning a new state snapshot
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    let updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      let updatedItem;
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // if we submit our order form so we want to reset our cart
  if (action.type === "CLEAR") {
    return defaultCartState;
  } // The KeyPoint is that if we dont do this if check we also get our defaultCartSatate bcz below this reducer function return this
  return defaultCartState; // it means it returns the defaultCartState when i have another action which is not defined above...the only purpose of returning this is that .....
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
