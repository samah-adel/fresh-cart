import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishListProducts, setWishListProducts] = useState([]);
  const [wishListData, setWishListData] = useState([]);
  const baseURL = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const headerOption = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  //to get wishList of user
  function getUserWishList() {
    return axios.get(baseURL, headerOption);
  }

  // to add item to wish list
  function addProductToWishList(id) {
    let data = {
      productId: id,
    };
    return axios.post(baseURL, data, headerOption);
  }

  //delete item from
  function deletProductToWishList(id) {
    return axios.delete(`${baseURL}/${id}`, headerOption);
  }

  useEffect(() => {
    getUserWishList()
      .then((res) => {
        const ids = res.data.data.map((item) => item._id);
        setWishListProducts(ids);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <WishListContext.Provider
      value={{
        getUserWishList,
        setWishListData,
        wishListData,
        addProductToWishList,
        deletProductToWishList,
        setWishListProducts,
        wishListProducts,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
