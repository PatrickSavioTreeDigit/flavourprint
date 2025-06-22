import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../styles/Header.module.css";

export default function Header( props, navContent ) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.navLeft}>
          {/* Mobile menu icon */}
          <IconButton
            onClick={toggleDrawer}
            className={styles.menuIcon}
            aria-label="menu"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop links */}
          <div className={styles.navLinks}>
            <a href="#story" className={styles.navLink}>
              {props.content.text1}
            </a>
            <a href="#about" className={styles.navLink}>
              {props.content.text2}
            </a>
            <a href="#services" className={styles.navLink}>
              {props.content.text3}
            </a>
          </div>
        </div>

        <div className={styles.navRight}>
          <Link href="/" className={styles.logoLink}>
            <Image
              loader={() => "https:" + props.content.image.fields.file.url}
              src={"https:" + props.content.image.fields.file.url}
              alt="FLAVOURPRINTLAB Logo"
              width={230}
              height={40}
              className={styles.navLogo}
              priority
            />
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        classes={{ paper: styles.drawerPaper }}
      >
        <div className={styles.drawerContainer}>
          <IconButton
            onClick={toggleDrawer}
            className={styles.closeIcon}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <ul className={styles.drawerList}>
            <li className={styles.drawerListItem}>
              <a
                href="#story"
                className={styles.drawerLink}
                onClick={toggleDrawer}
              >
                {props.content.text1}
              </a>
            </li>
            <li className={styles.drawerListItem}>
              <a
                href="#about"
                className={styles.drawerLink}
                onClick={toggleDrawer}
              >
                {props.content.text2}
              </a>
            </li>
            <li className={styles.drawerListItem}>
              <a
                href="#services"
                className={styles.drawerLink}
                onClick={toggleDrawer}
              >
                {props.content.text3}
              </a>
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
}
