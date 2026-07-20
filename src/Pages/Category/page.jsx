import React from "react";
import { useApi } from "../../Services/useApiServices";
export default function Category() {
  const { data, isLoading, error, refetch } = useApi("categories");

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
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-6">
            {data?.data?.data.map((cat) => (
              <div
                key={cat._id}
                className="w-full sm:w-[45%] md:w-[45%] lg:w-[30%] bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-60 object-cover"
                />

                <div className="py-3">
                  <h3 className="text-center text-lg font-semibold text-green-600">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
