import React, { useContext, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApi } from "../../Services/useApiServices";
import { CartContext } from "../../Context/CartContecxtProvider";
import toast, { Toaster } from "react-hot-toast";
import { FaCarSide } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { WishListContext } from "../../Context/WishListContextProvider";

export default function Products() {
  const { data, isLoading, error, refetch } = useApi("products");
  const { addProduct, setNumbersCartItem } = useContext(CartContext);
  const {
    addProductToWishList,
    wishListData,
    setWishListData,
    deletProductToWishList,
    setWishListProducts,
    wishListProducts,
  } = useContext(WishListContext);

  const [search, setSearch] = useState("");

  const filteredProducts = data?.data?.data?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  // add product to cart function
  function handleAddProduct(id) {
    // console.log(id);
    addProduct(id)
      .then((req) => {
        // console.log(req);
        setNumbersCartItem(req?.data?.numOfCartItems);
        toast.success(req?.data?.message, {
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
        toast.error("Failed to add product to cart", {
          position: "top-right",
        });
      });
  }

  //add item to wish list
  function handleAddingWishListItem(id) {
    addProductToWishList(id)
      .then((req) => {
        // console.log(req.data.data);
        setWishListProducts(req.data.data);
        toast.success(req?.data?.message, {
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
        toast.error("Failed to add product to wish list", {
          position: "top-right",
        });
      });
  }

  //delete item from wish list
  function handleDeleteWishListItem(id) {
    deletProductToWishList(id)
      .then((req) => {
        // console.log(req.data.data);
        setWishListProducts(req.data.data);
        toast.success(req?.data?.message, {
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
        toast.error("Failed to remove product from wish list", {
          position: "top-right",
        });
      });
  }

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center bg-green-100">
          <span className="loader"></span>
        </div>
      ) : error ? (
        <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-red-50 to-orange-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              {error?.response?.data?.message ||
                "Failed to load products. Please try again later."}
            </p>
            <button
              onClick={refetch}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          <Toaster />
          <div className="max-w-6xl mx-auto my-8 px-3 ">
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 focus:shadow-sm  transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap ">
              {filteredProducts?.map((product) => {
                const isInWishList = wishListProducts?.includes(product._id);
                return (
                  <div
                    key={product._id}
                    className=" lg:w-3/12 md:w-6/12 w-full p-5  "
                  >
                    <div className="bg-white rounded-xl border border-green-200 md:border-transparent md:hover:border-green-300 shadow-sm md:hover:shadow-md md:hover:shadow-green-600 transition-all duration-300 overflow-hidden group">
                      <Link to={`/productDetails/${product._id}`}>
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full  object-cover"
                        />
                        <div className="px-4">
                          <h3 className="text-green-600 text-sm font-medium mb-1">
                            {product.category.name}
                          </h3>
                          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-3">
                            {product.title.split(" ").slice(0, 2).join(" ")}
                          </h2>
                          <div className="flex justify-between items-center mb-5">
                            <span className="font-bold text-lg text-gray-800">
                              {product.price} EGp
                            </span>
                            <span className="flex items-center gap-1  font-medium">
                              <IoIosStar className="text-yellow-500 text-2xl" />
                              {product.ratingsAverage}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="text-end me-4">
                        <button
                          onClick={() => {
                            if (isInWishList) {
                              handleDeleteWishListItem(product._id);
                            } else {
                              handleAddingWishListItem(product._id);
                            }
                          }}
                        >
                          <FaHeart
                            className={`text-2xl ${
                              isInWishList ? "text-red-600" : "text-black"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            handleAddProduct(product?._id);
                          }}
                          className="bg-green-600 text-white w-[calc(100%-16px)] mx-2 py-2 rounded-lg hover:bg-green-700 translate-y-0 md:translate-y-20 md:group-hover:-translate-y-2 transition-all duration-500"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
