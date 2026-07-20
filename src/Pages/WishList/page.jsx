import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContextProvider";
import { FaCarSide, FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { CartContext } from "../../Context/CartContecxtProvider";
import toast, { Toaster } from "react-hot-toast";

export default function WishList() {
  //contexts
  const {
    getUserWishList,
    wishListData,
    setWishListData,
    deletProductToWishList,
  } = useContext(WishListContext);

  const { addProduct, setNumbersCartItem } = useContext(CartContext);

  //to handle loading
  const [isLoading, setIsLoading] = useState(false);

  //get wishListfor user
  useEffect(() => {
    handleGetUserWishList();
  }, []);
  function handleGetUserWishList() {
    setIsLoading(true);
    getUserWishList()
      .then((req) => {
        // console.log(req?.data);
        setWishListData(req?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //delete item from wish list
  function handleDeleteWishListItem(id) {
    setIsLoading(true);
    deletProductToWishList(id)
      .then(() => {
        handleGetUserWishList();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // add product to cart
  // function handleAddProduct(id) {
  //   setIsLoading(true);
  //   // console.log(id);
  //   addProduct(id)
  //     .then((req) => {
  //       // console.log(req.data?.data);
  //       setNumbersCartItem(req?.data?.numOfCartItems);

  //       // handleDeleteWishListItem(req?.data?.data?.products[i].product._id);
  // toast.success(req?.data?.message, {
  //   position: "top-right",
  //   icon: (
  //     <div>
  //       <FaCarSide /> <FaCheck />
  //     </div>
  //   ),
  // });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  //
  // }
  function handleAddProduct(id) {
    setIsLoading(true);

    addProduct(id)
      .then((req) => {
        setNumbersCartItem(req.data.numOfCartItems);

        return deletProductToWishList(id);
      })
      .then(() => {
        return getUserWishList();
      })
      .then((res) => {
        setWishListData(res.data);

        toast.success(res?.data?.message, {
          position: "top-right",
          icon: (
            <div>
              <FaCarSide /> <FaCheck />
            </div>
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center bg-green-100">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <Toaster />
          {wishListData?.data?.length > 0 ? (
            <>
              <div className="px-5">
                <div className="bg-gray-100 p-8 max-w-5xl mx-auto mt-14 mb-20  rounded-2xl shadow-lg">
                  <h1 className=" font-medium text-gray-800 mb-6 text-3xl">
                    My wish List
                  </h1>
                  <div className="divide-y-2 divide-gray-300  mt-3 ">
                    {wishListData?.data?.map((item) => {
                      return (
                        <div
                          key={item?._id}
                          className="flex flex-col md:flex-row items-center justify-between gap-6  pt-6 pb-14"
                        >
                          <div className="flex items-center gap-5 flex-1">
                            <div className="w-32 h-32 object-contain rounded-xl ">
                              <img src={item?.imageCover} alt={item?.title} />
                            </div>
                            <div className="w-10/12 ms-3">
                              <h3 className="text-xl font-semibold text-gray-800">
                                {item?.title}
                              </h3>
                              <h4 className="text-green-600 text-xl font-bold mt-2">
                                {item?.price} EGP
                              </h4>
                              <button
                                onClick={() => {
                                  handleDeleteWishListItem(item?._id);
                                }}
                                className="flex items-center gap-2 mt-4 text-red-500 hover:text-red-700 transition "
                              >
                                <FaRegTrashAlt /> Remove
                              </button>
                            </div>
                          </div>
                          <div className="w-2/12 flex items-center justify-around  ">
                            <button
                              onClick={() => {
                                handleAddProduct(item?._id);
                              }}
                              className=" bg-green-300 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition duration-300 whitespace-nowrap"
                            >
                              add to cart
                            </button>
                          </div>
                        </div>
                      );
                    })}{" "}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="px-5">
              <div className="bg-gray-100 max-w-5xl mx-auto mt-14 mb-20  rounded-2xl shadow-lg p-8">
                <h1 className=" font-medium text-gray-800 mb-6 text-3xl">
                  My wish List
                </h1>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
