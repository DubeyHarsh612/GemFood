import React, { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const cartStateContext = createContext();

const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let arr = [...state];
      console.log(arr);
      arr.find((a, idx) => {
        console.log(a, action);
        if (a.id === action.id) {
          console.log("updated", action, a);
          arr[idx] = {
            ...a,
            qty: parseInt(action.qty) + a.qty,
            price: action.price + a.price,
          }; // a is the array jo abhi tk cart m prda tha and action contains the updated object's details
        }
      });
      return arr;

    case "DROP":
      let empArr = [];
      return empArr;
    default:
      console.log("error");
      break;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatch = () => useContext(cartDispatchContext);
