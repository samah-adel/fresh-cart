import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { verifyResetCode } from "../../../Services/authServices";

export default function VerifyCode() {
  let nav = useNavigate();
  let [errorMessage, setErrorMessage] = useState();
  let validationInputs = Yup.object({
    resetCode: Yup.string().required("Code is required"),
  });
  let initialValues = {
    resetCode: "",
  };

  async function verifyCodeApi(data) {
    try {
      const { data: response } = await verifyResetCode(data);

      if (response.status === "Success") {
        nav("/reset-password");
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  }
  let verifyCodeForm = useFormik({
    initialValues,
    onSubmit: verifyCodeApi,
    validationSchema: validationInputs,
  });

  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold px-6 -pt-2 pb-8 max-w-5xl mx-auto space-y-4  ">
        Please enter your verification code
      </h1>

      <form
        onSubmit={verifyCodeForm.handleSubmit}
        className="max-w-5xl mx-auto p-6 space-y-4 "
      >
        <div className="mb-5">
          <label
            htmlFor="resetCode-alternative"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            resetCode :
          </label>
          <input
            value={verifyCodeForm.values.resetCode}
            onChange={verifyCodeForm.handleChange}
            onBlur={verifyCodeForm.handleBlur}
            name="resetCode"
            type="text"
            id="resetCode-alternative"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
          />
          {verifyCodeForm.touched.resetCode &&
          verifyCodeForm.errors.resetCode ? (
            <p className="max-w-5xl mx-auto outline-1 my-3 py-3 text-sm ps-3 outline-red-600 bg-red-200 text-red-500 rounded-md">
              {verifyCodeForm.errors.resetCode}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="text-start ">
          <button
            disabled={!(verifyCodeForm.isValid && verifyCodeForm.dirty)}
            type="submit"
            className=" text-white text-xl bg-green-600 box-border rounded-md  border border-transparent hover:bg-brand-strong focus:ring-1 focus:ring-green-700  shadow-xs font-semibold leading-5 rounded-base  px-6 py-4 focus:outline-none
          disabled:bg-gray-100 disabled:opacity-25 disabled:text-gray-900 disabled:border-2 disabled:border-gray-800 "
          >
            verify
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
