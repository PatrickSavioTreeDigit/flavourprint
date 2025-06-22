import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/Story.module.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
export default function StorySection(props, storyContent,video ) {
  return (
    <Box component="section" className={styles.sectionThree}>
      <video
        className={styles.sectionThreeVideo}
        autoPlay
        muted
        loop
        playsInline
      >
        {props.video?.fields?.file?.url && (
          <source src={`https:${props.video.fields.file.url}`} />
        )}
        Your browser does not support the video tag.
      </video>

      <Box className={styles.sectionThreeOverlay} />

      <Container maxWidth="xl" className={styles.sectionThreeContainer}>
        <Box className={styles.sectionThreeContent}>
          {/* Text Content */}
          <Box className={styles.textSection}>
            <Typography variant="h2" className={styles.sectionTitle}>
              {props.content.text1}
            </Typography>
            <Typography className={styles.sectionDescription}>
              {documentToReactComponents(props.content.storyContent1)}
            </Typography>
            <Typography className={styles.sectionDescription}>
              {documentToReactComponents(props.content.storyContent2)}
            </Typography>
            <Typography className={styles.sectionDescription}>
              {documentToReactComponents(props.content.storyContent3)}
            </Typography>
            <Typography className={styles.sectionDescriptionBold}>
              {documentToReactComponents(props.content.story2)}
            </Typography>
          </Box>

          {/* Image Content */}
          <Box className={styles.imageSection}>
            <Box className={styles.imageWrapper}>
              <Image
                loader={() => "https:" + props.content.image.fields.file.url}
                src={"https:" + props.content.image.fields.file.url}
                alt="Innovation Image"
                width={500}
                height={500}
                quality={75}
                className={styles.sectionImage}
                priority
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
