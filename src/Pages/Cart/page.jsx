import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { CartContext } from "../../Context/CartContecxtProvider";

export default function Cart() {
  //contexts
  const {
    getUserCart,
    numbersCartItem,
    setNumbersCartItem,
    deleteProduct,
    clearCart,
    updateItemsCount,
  } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);
  //to handle loading
  const [isLoading, setIsLoading] = useState(false);

  //to get user cart
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    setIsLoading(true);
    getUserCart()
      .then((req) => {
        // console.log(req.data.data);
        setCartData(req.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //to remove product
  function handleDeleteProduct(id) {
    setIsLoading(true);
    deleteProduct(id)
      .then((req) => {
        // console.log(req);
        setNumbersCartItem(req?.data?.numOfCartItems);
        setCartData(req?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //to clear cart
  function handleClearCart() {
    setIsLoading(true);
    clearCart()
      .then((req) => {
        // console.log(req);
        if (req.data.message === "success") {
          setCartData(null);
          setNumbersCartItem(0);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //update items count
  function handleUpdateItemsCount(id, count) {
    // console.log(id, count);
    setIsLoading(true);
    updateItemsCount(id, count)
      .then((req) => {
        setCartData(req?.data?.data);
        setNumbersCartItem(req?.data?.numOfCartItems);
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
          {cartData?.products?.length > 0 ? (
            <div className="max-w-5xl mx-auto mt-14 mb-20 px-5  ">
              <div className="bg-gray-100  rounded-2xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">
                  <div>
                    <h1 className="text-3xl font-medium text-gray-800">
                      Cart Shop
                    </h1>
                    <h4 className="mt-4 text-lg font-medium">
                      total price:
                      <span className="text-green-600 font-bold ml-2">
                        {cartData?.totalCartPrice}
                      </span>
                    </h4>
                  </div>
                  <div className="text-center mt-2">
                    <button className=" bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                      check out
                    </button>
                    <h4 className="mt-4 text-lg">
                      total number of items:
                      <sapn className="text-green-600 ps-1 font-semibold">
                        {numbersCartItem}
                      </sapn>
                    </h4>
                  </div>
                </div>
                <div className="divide-y-2  divide-gray-300 ">
                  {cartData?.products?.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="flex flex-col md:flex-row items-center justify-between gap-6 py-6"
                      >
                        <div className="flex justify-between items-center w-10/12">
                          <div>
                            <img
                              src={product?.product?.imageCover}
                              alt={product?.product?.title}
                              className="w-28 h-28 object-contain rounded-xl"
                            />
                          </div>
                          <div className="w-10/12 ms-3">
                            <h3 className="text-lg font-semibold text-gray-600">
                              {product?.product?.title}
                            </h3>
                            <h4 className="text-lg font-semibold text-gray-800 my-2">
                              {product?.price} EGP
                            </h4>
                            <button
                              onClick={() => {
                                handleDeleteProduct(product?.product?._id);
                              }}
                              className="flex items-center gap-2 mt-4 text-red-500 hover:text-red-700 transition"
                            >
                              <FaRegTrashAlt /> Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => {
                              handleUpdateItemsCount(
                                product?.product?._id,
                                product?.count + 1,
                              );
                            }}
                            className="w-10 h-10 rounded-lg border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition flex justify-center items-center"
                          >
                            <FaPlus />
                          </button>
                          <span className="text-xl font-semibold w-8 text-center">
                            {product?.count}
                          </span>
                          <button
                            onClick={() => {
                              handleUpdateItemsCount(
                                product?.product?._id,
                                product?.count - 1,
                              );
                            }}
                            className="w-10 h-10 rounded-lg border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition flex justify-center items-center"
                          >
                            <FaMinus />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center my-2">
                  <button
                    onClick={() => {
                      handleClearCart();
                    }}
                    className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition px-6 py-3 rounded-xl font-semibold"
                  >
                    Clear Your Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-10/12 mx-auto my-5 ">
              <div className="bg-gray-100 p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl">cart shop </h1>
                    <h4 className="mt-4 text-lg">
                      total price:
                      <span className="text-green-600 ps-1 font-semibold">
                        0
                      </span>
                    </h4>
                  </div>
                  <div className="text-center mt-2">
                    <button className=" text-white border rounded-lg bg-blue-700 px-4 py-2 text-lg">
                      check out
                    </button>
                    <h4 className="mt-4 text-lg">
                      total number of items:
                      <sapn className="text-green-600 ps-1 font-semibold">
                        0
                      </sapn>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
