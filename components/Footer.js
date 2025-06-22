import { Box, Container, Typography, Grid } from "@mui/material";
import styles from "../styles/Footer.module.css";
import Image from "next/image";

export default function Footer(props, footerContent) {
  return (
    <Box component="section" className={styles.sectionSeven}>
      <Container className={styles.sectionSevenContent}>
        <Box className={styles.footerLinks}>
          <div className={styles.footerFirstLine}>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text1}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text2}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text3}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text4}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
          </div>

          <div className={styles.footerSecondLine}>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text5}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text6}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text7}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text8}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
            <div className={styles.footerItem}>
              <Typography component="a" href="#" className={styles.footerLink}>
                {props.content.text9}
              </Typography>
              <span className={styles.separator}>|</span>
            </div>
            <div className={styles.footerItem}>
              <Typography className={styles.footerCopyright}>
                {props.content.text10}
              </Typography>
            </div>
          </div>

          <Typography className={styles.footerDisclaimer}>
            {props.content.text11}
          </Typography>
        </Box>

        <Box className={styles.footerSvg}>
          <Image
            loader={() => "https:" + props.content.image.fields.file.url}
            src={"https:" + props.content.image.fields.file.url}
            alt="DRINKIQ Logo"
            width={173}
            height={53}
            priority
          />
        </Box>
      </Container>
    </Box>
  );
}
