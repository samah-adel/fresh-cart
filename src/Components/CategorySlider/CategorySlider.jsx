import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useApi } from "../../Services/useApiServices";

export default function CategorySlider() {
  const { data } = useApi("categories");

  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 2000,
      }}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
      className="my-8  h-96"
    >
      {data?.data?.data.map((cat) => {
        return (
          <>
            <SwiperSlide key={cat._id}>
              <img
                src={cat.image}
                className="w-full h-72 md:w-72 md:h-60 sm:w-52 sm:h-44  object-cover"
                alt=""
              />
              <h3> {cat.name}</h3>
            </SwiperSlide>
          </>
        );
      })}
    </Swiper>
  );
}
