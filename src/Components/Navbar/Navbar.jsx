import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { CartContext } from "../../Context/CartContecxtProvider";

export default function Navbar() {
  const { numbersCartItem } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, setToken } = useContext(AuthContext);

  function logoutFn() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brand" },
  ];

  return (
    <>
      <nav className="bg-gray-100 sticky w-full z-50 top-0 shadow-lg shadow-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-linear-to-br from-green-400 to-green-600 p-2 rounded-xl shadow-lg group-hover:shadow-green-400/50 transition-shadow duration-300">
                <FaShoppingCart className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Fresh Cart
              </span>
            </Link>

            {token ? (
              <>
                <div className="hidden lg:flex items-center gap-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "text-green-600 bg-green-50 shadow-md"
                            : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>

                <div className="hidden lg:flex items-center gap-6">
                  {/* Wish List Icon */}
                  <NavLink
                    to="/wishList"
                    className={({ isActive }) =>
                      `relative group transition-transform duration-300 hover:scale-110 ${
                        isActive
                          ? "text-green-600"
                          : "text-gray-700 hover:text-green-600"
                      }`
                    }
                  >
                    <FaHeart className="text-xl" />
                    <span className="absolute inset-0 bg-green-400 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </NavLink>

                  {/* Cart Icon */}
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `relative group transition-transform duration-300 hover:scale-110 ${
                        isActive
                          ? "text-green-600"
                          : "text-gray-700 hover:text-green-600"
                      }`
                    }
                  >
                    <FaShoppingCart className="text-xl" />
                    {numbersCartItem > 0 && (
                      <span className="absolute -top-3 -right-3 bg-linear-to-r from-green-500 to-green-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
                        {numbersCartItem}
                      </span>
                    )}
                    <span className="absolute inset-0 bg-green-400 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </NavLink>

                  {/* Logout Button */}
                  <button
                    onClick={logoutFn}
                    className="px-6 py-2 bg-linear-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Link to="/login" className="block">
                      Logout
                    </Link>
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-6 py-2 font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-6 py-2 font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                    }`
                  }
                >
                  Register
                </NavLink>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl text-gray-700" />
              ) : (
                <FaBars className="text-2xl text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-gray-200 pt-4 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-2 mb-6">
                {token ? (
                  <>
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                            isActive
                              ? "text-green-600 bg-green-50 border-l-4 border-green-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}
                    <NavLink
                      to="/wishList"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "text-green-600 bg-green-50 border-l-4 border-green-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      Wish List
                    </NavLink>
                    <NavLink
                      to="/cart"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `  px-4 py-3 rounded-lg font-medium transition-all duration-300 flex justify-between items-center ${
                          isActive
                            ? "text-green-600 bg-green-50 border-l-4 border-green-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      Cart
                      {numbersCartItem > 0 && (
                        <span className="bg-linear-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {numbersCartItem}
                        </span>
                      )}
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "text-green-600 bg-green-50 border-l-4 border-green-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "text-green-600 bg-green-50 border-l-4 border-green-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>

              {token && (
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => {
                      logoutFn();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-linear-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <Link to="/login" className="block">
                      Logout
                    </Link>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
