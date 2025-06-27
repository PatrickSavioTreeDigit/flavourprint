import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../styles/Carousel.module.css";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

export default function XCarousel(props) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const router = useRouter();

  const handleNextClick = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handlePrevClick = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <div className={styles.x_carousel_container}>
      <div className={styles.x_carousel_title_wrapper}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: 9,
            alignSelf: "flex-start",
            pl: { xs: 1, sm: 6 },
            pt: 8,
            color: "white",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          {props.content.text1}
        </Typography>
      </div>
      <div className={styles.x_carousel_swiper_wrapper}>
        <Swiper
          centeredSlides={false}
          loop={true}
          navigation={{
            nextEl: `.${styles.swiper_button_next}`,
            prevEl: `.${styles.swiper_button_prev}`,
          }}
          slidesPerView={3}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Navigation]}
          className={styles.x_carousel_swiper_container}
          onSwiper={setSwiperInstance}
          speed={600}
          spaceBetween={30}
          allowTouchMove={true}
          watchSlidesProgress={true}
        >
          {/* Slide 1 */}
          <SwiperSlide
            className={styles.x_carousel_slide}
            data-index={0}
            onClick={() => router.push("/whisky")}
          >
            <div
              aria-label="What's Your Whisky?"
              role="button"
              tabIndex="0"
              className={styles.x_carousel_slide_container}
            >
              <div className={styles.x_slide_image_container}>
                <figure className={styles.x_slide_image_wrapper}>
                  <div className={styles.shadow_layer} />
                  <div className={styles.video_wrapper}>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={styles.x_slide_video}
                      preload="metadata"
                      loading="lazy"
                      onLoadedData={(e) => {
                        e.target.style.opacity = 1;
                      }}
                    >
                      <source src={"https:" + props.image1.fields.file.url} />
                    </video>
                    <div className={styles.video_head}>
                      <h2>{props.content.text2}</h2>
                    </div>
                  </div>
                </figure>
              </div>
              {/* <div className={styles.x_slide_text_container}>
                <p className={styles.x_slide_text}>{props.content.text2}</p>
              </div> */}
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide
            className={styles.x_carousel_slide}
            data-index={1}
            onClick={() => router.push("/tequila")}
          >
            <div
              aria-label="What's Your Tequila?"
              role="button"
              tabIndex="0"
              className={styles.x_carousel_slide_container}
            >
              <div className={styles.x_slide_image_container}>
                <figure className={styles.x_slide_image_wrapper}>
                  <div className={styles.shadow_layer} />
                  <div className={styles.video_wrapper}>
                    <Image
                      alt="What's Your Tequila?"
                      src={"https:" + props.content.image2.fields.file.url}
                      className={styles.x_slide_image}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      objectFit="cover"
                    />
                    <div className={styles.video_head}>
                      <h2>{props.content.text3}</h2>
                    </div>
                  </div>
                </figure>
              </div>
              {/* <div className={styles.x_slide_text_container}>
                <p className={styles.x_slide_text}>{props.content.text3}</p>
              </div> */}
            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide
            className={styles.x_carousel_slide}
            data-index={2}
            onClick={() => router.push("/beer")}
          >
            <div
              aria-label="What's Your Beer?"
              role="button"
              tabIndex="0"
              className={styles.x_carousel_slide_container}
            >
              <div className={styles.x_slide_image_container}>
                <figure className={styles.x_slide_image_wrapper}>
                  <div className={styles.shadow_layer} />
                  <div className={styles.video_wrapper}>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={styles.x_slide_video}
                      preload="metadata"
                      loading="lazy"
                      onLoadedData={(e) => {
                        e.target.style.opacity = 1;
                      }}
                    >
                      <source src={"https:" + props.image3.fields.file.url} />
                    </video>
                    <div className={styles.video_head}>
                      <h2>{props.content.text4}</h2>
                    </div>
                  </div>
                </figure>
              </div>
              {/* <div className={styles.x_slide_text_container}>
                <p className={styles.x_slide_text}>{props.content.text4}</p>
              </div> */}
            </div>
          </SwiperSlide>
          <div
            className={`${styles.swiper_button_prev} swiper-button-prev`}
            onClick={handlePrevClick}
          >
            <span className="arrow" />
          </div>
          <div
            className={`${styles.swiper_button_next} swiper-button-next`}
            onClick={handleNextClick}
          >
            <span className="arrow" />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
