import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import XCarousel from "../components/XCarousel";
// import Footer from "../components/Footer";
// import TechnologyDropdown from "../components/TechnologyDropdown";
import { createClient } from "contentful";

const StorySection = dynamic(() => import("../components/StorySection"));
const TechnologyDropdown = dynamic(() =>
  import("../components/TechnologyDropdown")
);
const Footer = dynamic(() => import("../components/Footer"));

export default function Home({
  navContent,
  footerContent,
  homeBannerVideo,
  video,
  impactInNumbers,
  storyContent,
  technologyCarousel,
  preFooter,
  dropDownSection,
  technologyDropdown,
  cocktailContent,
  beerContent,
}) {
  const videoRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const path = window.location.pathname;
    const section = path.substring(1); // remove the leading '/'
    if (section) {
      setTimeout(() => {
        const targetElement = document.getElementById(section);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <main>
      <Header content={navContent} />

      {/* Video Section */}
      <section className={styles.videoSection}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={"https:" + homeBannerVideo.video.fields.file.url} />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Stats Section */}
      <section className={styles.sectionWrapper}>
        <div className={styles.container}>
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <h2>{impactInNumbers.text1}</h2>
              <p>
                {impactInNumbers.text2}
                <br />
                {impactInNumbers.text3}
              </p>
            </div>

            <div className={styles.statBox}>
              <p>{impactInNumbers.text4}</p>
              <h2>{impactInNumbers.text5}</h2>
              <p>{impactInNumbers.text6}</p>
            </div>

            <div className={styles.statBox}>
              <h2>{impactInNumbers.text7}</h2>
              <p>
                {impactInNumbers.text8}
                <br />
                {impactInNumbers.text9}
                <br />
                {impactInNumbers.text10}
              </p>
            </div>

            <div className={styles.statBox}>
              <h2>{impactInNumbers.text11}</h2>
              <p>{impactInNumbers.text12}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <StorySection
        id="story"
        content={storyContent}
        video={storyContent.video}
      />
      {/* Technology Dropdown Section */}
      <TechnologyDropdown id="technologies" content={dropDownSection} />
      {/* Carousel */}
      <XCarousel
        content={technologyCarousel}
        image1={technologyCarousel.image1}
        image3={technologyCarousel.image3}
      />

      {/* As Seen On Section - Sub Footer */}
      <Box className={styles.sectionSix}>
        <Container className={styles.sectionSixContent}>
          <Typography variant="h2" className={styles.sectionSixHeading}>
            {preFooter.text1}
          </Typography>

          <Box className={styles.imagesContainer}>
            <Image
              // loader={() => "https:" + preFooter.image1.fields.file.url}
              src={"https:" + preFooter.image1.fields.file.url}
              alt="As Seen On: Brand 1"
              width={100}
              height={80}
              className={styles.sectionSixImage}
              sizes="(max-width: 768px) 120px, 100px"
            />
            <Image
              // loader={() => "https:" + preFooter.image2.fields.file.url}
              src={"https:" + preFooter.image2.fields.file.url}
              alt="As Seen On: Brand 2"
              width={150}
              height={100}
              className={styles.sectionSixImage}
              sizes="(max-width: 768px) 120px, 150px"
            />
            <Image
              // loader={() => "https:" + preFooter.image3.fields.file.url}
              src={"https:" + preFooter.image3.fields.file.url}
              alt="As Seen On: Brand 3"
              width={150}
              height={80}
              className={styles.sectionSixImage}
              sizes="(max-width: 768px) 120px, 150px"
            />
          </Box>
        </Container>
        <Box className={styles.sectionSixShade} />
      </Box>

      {/* Footer */}
      <Footer id="contact" content={footerContent} />
    </main>
  );
}

export async function getStaticProps() {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    // Fetch all data in parallel
    const [
      res,
      footer,
      homeBannerVideo,
      impactInNumbers,
      storyContent,
      CarouselContent,
      dropDownSection,
      technologyDropdown,
      whiskyContent,
      cocktailContent,
      beerContent,
      preFooter,
    ] = await Promise.all([
      client.getEntries({ content_type: "header", "fields.text": "Header" }),
      client.getEntries({ content_type: "footer", "fields.text": "Footer" }),
      client.getEntries({
        content_type: "homeBannerVideo",
        "fields.text": "Home Banner Video",
      }),
      client.getEntries({
        content_type: "impactInNumbers",
        "fields.text": "Impact in numbers",
      }),
      client.getEntries({
        content_type: "storySection",
        "fields.text": "Story",
      }),
      client.getEntries({
        content_type: "technologyCarousel",
        "fields.text": "Technology-Carousel",
      }),
      client.getEntries({
        content_type: "technologiesSection",
        "fields.text": "Technologies - Section",
      }),
      client.getEntries({
        content_type: "subSectionWhatsYourTequila",
        "fields.text": "Sub Section - What's Your Tequila?",
      }),
      client.getEntries({
        content_type: "subSectionWhatsYourWhisky",
        "fields.text": "Sub Section - What's Your Whisky?",
      }),
      client.getEntries({
        content_type: "subSectionWhatsYourCocktail",
        "fields.text": "Sub Section - What's Your Cocktail?",
      }),
      client.getEntries({
        content_type: "subSectionWhatsYourBeer",
        "fields.text": "Sub Section - What's Your Beer?",
      }),
      client.getEntries({
        content_type: "preFooter",
        "fields.text": "Pre-Footer",
      }),
    ]);

    return {
      props: {
        navContent: res.items[0]?.fields || null,
        footerContent: footer.items[0]?.fields || null,
        homeBannerVideo: homeBannerVideo.items[0]?.fields || null,
        impactInNumbers: impactInNumbers.items[0]?.fields || null,
        storyContent: storyContent.items[0]?.fields || null,
        technologyCarousel: CarouselContent.items[0]?.fields || null,
        preFooter: preFooter.items[0]?.fields || null,
        technologyDropdown: technologyDropdown.items[0]?.fields || null,
        whiskyContent: whiskyContent.items[0]?.fields || null,
        cocktailContent: cocktailContent.items[0]?.fields || null,
        beerContent: beerContent.items[0]?.fields || null,
        dropDownSection: dropDownSection.items[0]?.fields || null,
      },
    };
  } catch (error) {
    console.error("Error fetching content from Contentful:", error);
    return {
      props: {
        navContent: null,
      },
    };
  }
}
