import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const CartContext = createContext();
export default function CartContecxtProvider({ children }) {
  //to set numbers
  const [numbersCartItem, setNumbersCartItem] = useState(0);

  function getHeaderOption() {
    return {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
  }
  const baseURL = "https://ecommerce.routemisr.com/api/v1/cart";

  //to get cart of user
  function getUserCart() {
    return axios.get(baseURL, getHeaderOption());
  }

  //to get numbers of items in cart
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserCart()
        .then((req) => {
          setNumbersCartItem(req.data.numOfCartItems);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  //add product to cart
  function addProduct(id) {
    let data = {
      productId: id,
    };
    return axios.post(baseURL, data, getHeaderOption());
  }

  //delete product from cart
  function deleteProduct(id) {
    return axios.delete(`${baseURL}/${id}`, getHeaderOption());
  }

  // clear cart
  function clearCart() {
    return axios.delete(baseURL, getHeaderOption());
  }

  //update items count
  function updateItemsCount(id, count) {
    let data = {
      count: count,
    };
    return axios.put(`${baseURL}/${id}`, data, getHeaderOption());
  }

  return (
    <CartContext.Provider
      value={{
        getUserCart,
        numbersCartItem,
        setNumbersCartItem,
        addProduct,
        deleteProduct,
        clearCart,
        updateItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
