import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../styles/Header.module.css";

export default function Header(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTargetId, setActiveTargetId] = useState(null);
  const router = useRouter();

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

  const handleNavClick = (event, targetId) => {
    event.preventDefault();

    if (activeTargetId === targetId) {
      router.push("/");
      setActiveTargetId(null);
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.history.pushState({}, "", `/${targetId}`);
        targetElement.scrollIntoView({ behavior: "smooth" });
        setActiveTargetId(targetId);
      } else {
        router.push(`/#${targetId}`);
        setActiveTargetId(targetId);
      }
    }

    if (mobileOpen) {
      toggleDrawer();
    }
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.navLeft}>
          {/* Mobile menu icon */}
          <IconButton
            onClick={toggleDrawer}
            className={styles.menuIcon}
            aria-label="Toggle navigation menu"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop links */}
          <div className={styles.navLinks}>
            <a
              href="/story"
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, "story")}
            >
              {props.content.text1}
            </a>
            <a
              href="/technologies"
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, "technologies")}
            >
              {props.content.text2}
            </a>
            <a
              href="/contact"
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, "contact")}
            >
              {props.content.text3}
            </a>
          </div>
        </div>

        <div className={styles.navRight}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={"https:" + props.content.image.fields.file.url}
              alt="FLAVOURPRINTLAB Logo"
              width={230}
              height={40}
              className={styles.navLogo}
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
                href="/story"
                className={styles.drawerLink}
                onClick={(e) => handleNavClick(e, "story")}
              >
                {props.content.text1}
              </a>
            </li>
            <li className={styles.drawerListItem}>
              <a
                href="/technologies"
                className={styles.drawerLink}
                onClick={(e) => handleNavClick(e, "technologies")}
              >
                {props.content.text2}
              </a>
            </li>
            <li className={styles.drawerListItem}>
              <a
                href="/contact"
                className={styles.drawerLink}
                onClick={(e) => handleNavClick(e, "contact")}
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
