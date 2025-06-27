import { Box, Container, Typography } from "@mui/material";
import styles from "../styles/Footer.module.css";
import Image from "next/image";

export default function Footer(props) {
  return (
    <Box component="section" className={styles.sectionSeven} id={props.id}>
      <Container className={styles.sectionSevenContent}>
        <Box className={styles.footerLinks}>
          <div className={styles.footerFirstLine}>
            {/* Footer links row 1 */}
            {[
              props.content.text1,
              props.content.text2,
              props.content.text3,
              props.content.text4,
            ].map((text, idx) => (
              <div key={idx} className={styles.footerItem}>
                <Typography
                  component="a"
                  href="#about"
                  className={styles.footerLink}
                >
                  {text}
                </Typography>
                <span className={styles.separator}>|</span>
              </div>
            ))}
          </div>

          <div className={styles.footerSecondLine}>
            {[
              props.content.text5,
              props.content.text6,
              props.content.text7,
              props.content.text8,
              props.content.text9,
            ].map((text, idx) => (
              <div key={idx} className={styles.footerItem}>
                <Typography
                  component="a"
                  href="#services"
                  className={styles.footerLink}
                >
                  {text}
                </Typography>
                <span className={styles.separator}>|</span>
              </div>
            ))}
            <div className={styles.footerItem}>
              <Typography className={styles.footerCopyright}>
                {props.content.text10}
              </Typography>
            </div>
          </div>

          <Typography className={styles.footerDisclaimer}>
            {props.content.text11}
          </Typography>

          {/* ✅ Move logo here to force bottom-left */}
          <Box className={styles.footerSvg}>
            <Image
              src={"https:" + props.content.image.fields.file.url}
              alt="DRINKIQ Logo"
              width={173}
              height={53}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
