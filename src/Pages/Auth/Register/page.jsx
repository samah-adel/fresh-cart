import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../../../Services/authServices";

export default function Register() {
  let nav = useNavigate();

  let [errorMessage, setErrorMessage] = useState();
  let validationInputs = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name min length is 3")
      .max(20),
    email: Yup.string()
      .required("email is required")
      .email("email pattern is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[a-zA-Z][a-zA-Z0-9]{5,8}$/,
        `must be
         * Start with a letter (either uppercase or lowercase).
         * Be between 6 and 9 characters in total.
         * Can only contain letters (A-Z or a-z) and numbers (0-9)`,
      ),
    rePassword: Yup.string()
      .required("re-Password is required")
      .oneOf([Yup.ref("password"), "Passwords must match"]),
    phone: Yup.string().required("phone is required"),
  });
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function registerApi(data) {
    try {
      const { data: response } = await register(data);

      if (response.message === "success") {
        nav("/login");
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  }
  let registrationForm = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: validationInputs,
  });

  return (
    <div className="py-20">
      <h1 className="text-2xl font-semibold  px-6  -pt-2 pb-8 max-w-5xl mx-auto space-y-4  ">
        Register now
      </h1>

      <form
        onSubmit={registrationForm.handleSubmit}
        className="max-w-5xl mx-auto p-6  space-y-4 "
      >
        <div className="mb-5">
          <label
            htmlFor="name-alternative"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Name :
          </label>
          <input
            value={registrationForm.values.name}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            name="name"
            type="text"
            id="name-alternative"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
          />

          {registrationForm.touched.name && registrationForm.errors.name ? (
            <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
              {registrationForm.errors.name}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email-alternative"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email :
          </label>
          <input
            value={registrationForm.values.email}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            name="email"
            type="email"
            id="email-alternative"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
          />
          {registrationForm.touched.email && registrationForm.errors.email ? (
            <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
              {registrationForm.errors.email}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password-alternative"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password :
          </label>
          <input
            value={registrationForm.values.password}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            name="password"
            type="password"
            id="password-alternative"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
          />
          {registrationForm.touched.password &&
          registrationForm.errors.password ? (
            <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
              {registrationForm.errors.password}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="re-password-alternative"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Re-password :
          </label>
          <input
            value={registrationForm.values.rePassword}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            name="rePassword"
            type="password"
            id="re-password-alternative"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
          />
          {registrationForm.touched.rePassword &&
          registrationForm.errors.rePassword ? (
            <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
              {registrationForm.errors.rePassword}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone-alternative"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Phone :
          </label>
          <input
            type="text"
            value={registrationForm.values.phone}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
            name="phone"
            id="phone-alternative"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
          />
          {registrationForm.touched.phone && registrationForm.errors.phone ? (
            <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
              {registrationForm.errors.phone}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className=" text-end">
          <button
            disabled={!(registrationForm.isValid && registrationForm.dirty)}
            type="submit"
            className=" text-white text-lg bg-green-600 box-border rounded-md  border border-transparent hover:bg-brand-strong focus:ring-1 focus:ring-green-700  shadow-xs font-semibold leading-5 rounded-base  px-10 py-4 focus:outline-none
          disabled:bg-gray-100 disabled:opacity-25 disabled:text-gray-900 disabled:border-2 disabled:border-gray-800"
          >
            Register now
          </button>
        </div>
        {errorMessage ? (
          <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
            {errorMessage}
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
