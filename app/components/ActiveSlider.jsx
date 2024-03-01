import {Swiper, SwiperSlide} from 'swiper/react';
import CollectionSlider from '../data/CollectionSlider.json';
import {Controller} from 'swiper/modules';

import {FreeMode, Pagination} from 'swiper/modules';
import {RxArrowTopRight} from 'react-icons/rx';
import {useState} from 'react';

function ActiveSlider() {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  return (
    <section className="slider flex items-center justify-center flex-col ">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Controller]}
        className="max-w-[80%] lg:max-w-[80%]"
      >
        {CollectionSlider.map((item) => (
          <SwiperSlide key={item.name}>
            {/* <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.src})`}} /> */}

            <img
              src={item.src}
              alt=""
              className="object-cover swiper-slide__img"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0669/1186/3035/files/HOLDINGTEEMOCKUP.png?v=1704796150"
              alt=""
              className="object-cover swiper-slide__img1"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ActiveSlider;
