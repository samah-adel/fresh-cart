import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { resetPassword } from "../../../Services/authServices";
export default function ResetPassword() {
  let nav = useNavigate();
  let [errorMessage, setErrorMessage] = useState();
  let { setToken } = useContext(AuthContext);
  let validationInputs = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email pattern is invalid"),
    newPassword: Yup.string()
      .required("newPassword is required")
      .matches(
        /^[a-zA-Z][a-zA-Z0-9]{5,8}$/,
        `must be
         * Start with a letter (either uppercase or lowercase).
         * Be between 6 and 9 characters in total.
         * Can only contain letters (A-Z or a-z) and numbers (0-9)`,
      ),
  });
  let initialValues = {
    email: "",
    newPassword: "",
  };

  async function resetPasswordApi(data) {
    try {
      const { data: response } = await resetPassword(data);

      if (response.token) {
        setToken(response.token);
        localStorage.setItem("token", response.token);
        nav("/");
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  }
  let resetPasswordForm = useFormik({
    initialValues,
    onSubmit: resetPasswordApi,
    validationSchema: validationInputs,
  });

  return (
    <div className="py-20">
      <h1 className="text-2xl font-semibold px-6 -pt-2 pb-8 max-w-5xl mx-auto space-y-4  ">
        Reset your account password
      </h1>

      <form
        onSubmit={resetPasswordForm.handleSubmit}
        className="max-w-5xl mx-auto p-6 space-y-4 "
      >
        <div className="mb-5">
          <label
            htmlFor="email-alternative"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email :
          </label>
          <input
            value={resetPasswordForm.values.email}
            onChange={resetPasswordForm.handleChange}
            onBlur={resetPasswordForm.handleBlur}
            name="email"
            type="email"
            id="email-alternative"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
          />
          {resetPasswordForm.touched.email && resetPasswordForm.errors.email ? (
            <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
              {resetPasswordForm.errors.email}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="newPassword-alternative"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            newPassword :
          </label>
          <input
            value={resetPasswordForm.values.newPassword}
            onChange={resetPasswordForm.handleChange}
            onBlur={resetPasswordForm.handleBlur}
            name="newPassword"
            type="password"
            id="newPassword-alternative"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
          />
          {resetPasswordForm.touched.newPassword &&
          resetPasswordForm.errors.newPassword ? (
            <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
              {resetPasswordForm.errors.newPassword}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className=" text-start">
          <button
            disabled={!(resetPasswordForm.isValid && resetPasswordForm.dirty)}
            type="submit"
            className=" text-white text-lg bg-green-600 box-border rounded-md  border border-transparent hover:bg-brand-strong focus:ring-1 focus:ring-green-700  shadow-xs font-semibold leading-5 rounded-base  px-6 py-4 focus:outline-none
          disabled:bg-gray-100 disabled:opacity-25 disabled:text-gray-900 disabled:border-2 disabled:border-gray-800 "
          >
            reset password
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
