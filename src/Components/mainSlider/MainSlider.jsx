import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import slider1 from "../../assets/imgs/slider1.jpg";
import slider2 from "../../assets/imgs/slider2.jpg";
import slider3 from "../../assets/imgs/slider3.jpg";
import bannel1 from "../../assets/imgs/bannel.jpg";
import bannel2 from "../../assets/imgs/bannel2.jpg";

export default function MainSlider() {
  return (
    <div className="max-w-xl mx-auto my-8 px-4">
      <div className="grid grid-cols-2  ">
        {/* Slider */}
        <div className=" h-full">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <img src={slider1} className="w-72  object-contain" alt="" />
            </SwiperSlide>

            <SwiperSlide>
              <img src={slider2} className="w-72 h-80 object-contain" alt="" />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={slider3}
                className="w-72 h-80   object-contain "
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="flex flex-col  h-80 ">
          <img src={bannel1} className="h-1/2 w-full object-cover" alt="" />

          <img src={bannel2} className="h-1/2 w-full object-cover" alt="" />
        </div>
      </div>
    </div>
  );
}
