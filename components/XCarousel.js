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
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const handlePrevClick = () => {
    if (swiperInstance) swiperInstance.slidePrev();
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
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={30}
          speed={600}
          allowTouchMove={true}
          watchSlidesProgress={true}
          navigation={{
            nextEl: `.${styles.swiper_button_next}`,
            prevEl: `.${styles.swiper_button_prev}`,
          }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Navigation]}
          onSwiper={setSwiperInstance}
          className={styles.x_carousel_swiper_container}
        >
          {/* Slide 1 */}
          <SwiperSlide className={styles.x_carousel_slide}>
            <div
              className={styles.x_carousel_slide_container}
              onClick={() => router.push("/whisky")}
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
                    >
                      <source src={"https:" + props.image1.fields.file.url} />
                    </video>
                    <div className={styles.video_head}>
                      <h2>{props.content.text2}</h2>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide className={styles.x_carousel_slide}>
            <div
              className={styles.x_carousel_slide_container}
              onClick={() => router.push("/tequila")}
            >
              <div className={styles.x_slide_image_container}>
                <figure className={styles.x_slide_image_wrapper}>
                  <div className={styles.shadow_layer} />
                  <div className={styles.video_wrapper}>
                    <Image
                      alt="Tequila"
                      src={"https:" + props.content.image2.fields.file.url}
                      width={400}
                      height={600}
                      className={styles.x_slide_image}
                    />
                    <div className={styles.video_head}>
                      <h2>{props.content.text3}</h2>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide className={styles.x_carousel_slide}>
            <div
              className={styles.x_carousel_slide_container}
              onClick={() => router.push("/beer")}
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
                    >
                      <source src={"https:" + props.image3.fields.file.url} />
                    </video>
                    <div className={styles.video_head}>
                      <h2>{props.content.text4}</h2>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 4 */}
          {/* <SwiperSlide className={styles.x_carousel_slide}>
            <div
              className={styles.x_carousel_slide_container}
              onClick={() => router.push("/cocktail")}
            >
              <div className={styles.x_slide_image_container}>
                <figure className={styles.x_slide_image_wrapper}>
                  <div className={styles.shadow_layer} />
                  <div className={styles.video_wrapper}>
                    <Image
                      alt="Tequila"
                      src={"https:" + props.content.image4.fields.file.url}
                      width={400}
                      height={600}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.x_slide_image}
                      style={{ objectFit: "contain" }}
                    />
                    <div className={styles.video_head}>
                      <h2>{props.content.text6}</h2>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </SwiperSlide> */}
          {/* Navigation Buttons */}
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
