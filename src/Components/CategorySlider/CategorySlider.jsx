import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useApi } from "../../Services/useApiServices";

export default function CategorySlider() {
  const { data, isLoading } = useApi("categories");

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={6}
      spaceBetween={20}
      loop={true}
      autoplay={{
        delay: 2000,
      }}
      className="my-8  h-96"
    >
      {data?.data?.data.map((cat) => {
        return (
          <>
            <SwiperSlide key={cat._id}>
              <img
                src={cat.image}
                className="w-full h-72 md:w-72 md:h-60 sm:w-60 sm:h-56  object-cover"
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
