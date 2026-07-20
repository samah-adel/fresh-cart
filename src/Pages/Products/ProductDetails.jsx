import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CartContext } from "../../Context/CartContecxtProvider";
import toast, { Toaster } from "react-hot-toast";
import { FaCarSide, FaCheck } from "react-icons/fa6";
import { WishListContext } from "../../Context/WishListContextProvider";

export default function ProductDetails() {
  // to get id
  const { id } = useParams();
  // contexts
  const { addProduct, setNumbersCartItem } = useContext(CartContext);
  const {
    addProductToWishList,

    deletProductToWishList,
    setWishListProducts,
    wishListProducts,
  } = useContext(WishListContext);

  //  get product details
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["productDetails"],
    queryFn: getProductDetails,
  });

  let details = data?.data?.data;
  let image = details?.images;
  const isInWishList = wishListProducts?.includes(details?._id);

  // to adding item to cart
  function handleAddProduct(ids) {
    // console.log(ids);
    addProduct(ids)
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
        toast.error(err, {
          position: "top-right",
          icon: (
            <div>
              <FaCarSide /> <FaCheck />
            </div>
          ),
        });
      });
  }

  // to addig item to wish list
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

  // to delete item from wish list
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
          <div className="max-w-5xl mx-auto my-20  px-6 ">
            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="w-full lg:w-5/12 bg-gray-50 rounded-2xl p-5 shadow-sm">
                <Swiper
                  modules={[Pagination]}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  className="-top-14"
                >
                  {image?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={details?.title}
                        className="w-full h-112.5 object-contain  "
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="w-full md:w-7/12 space-y-6">
                <h1 className="text-2xl text-gray-700 font-semibold">
                  {details?.title}
                </h1>
                <p className="text-gray-500 text-lg font-semibold">
                  {details?.description}
                </p>

                <div className="flex justify-between items-center py-3">
                  <span className="text-xl font-semibold text-gray-800">
                    {details?.price} EGp
                  </span>

                  <span className="flex items-center gap-1 text-xl font-medium">
                    <IoIosStar className="text-yellow-500 text-2xl" />
                    {details?.ratingsAverage}
                  </span>
                </div>

                <div className="flex items-center gap-4  ms-7 pt-3">
                  <button
                    onClick={() => {
                      handleAddProduct(details?._id);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Add To Cart
                  </button>

                  <div className="flex items-center justify-center text-3xl">
                    <button
                      onClick={() => {
                        if (isInWishList) {
                          handleDeleteWishListItem(details?._id);
                        } else {
                          handleAddingWishListItem(details?._id);
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
