import React from "react";
import Products from "../Products/page";
import MainSlider from "../../Components/mainSlider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
