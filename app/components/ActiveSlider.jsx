import {Swiper, SwiperSlide} from "swiper/react"
import CollectionSlider from "../data/CollectionSlider.json"
import { Controller } from 'swiper/modules';

import {FreeMode, Pagination} from "swiper/modules"
import {RxArrowTopRight} from "react-icons/rx"
import { useState } from "react";

function ActiveSlider() {
    const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

    return (
        <section className="slider flex items-center justify-center flex-col ">
            <Swiper 
            breakpoints={{
                340: {
                    slidesPerView: 1,
                    spaceBetween: 30
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                900: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }}
            freeMode={true}
            pagination={{
                clickable: true
            }}
            modules={[FreeMode, Pagination, Controller]}
            className="max-w-[90%] lg:max-w-[80%]"
            >
                {CollectionSlider.map((item) => (
                    <SwiperSlide key={item.name}>
                    
                     {/* <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.src})`}} /> */}
                    
                    
                    <img src={item.src} alt="" className="object-cover" />
                        
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
        
    )
}

export default ActiveSlider