import React, { useEffect, useRef } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import Image from "next/image";

export default function BlackScreenPage({ drink, content }) {
  const router = useRouter();
  const videoRef = useRef(null);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    if (drink === "tequila" && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay failed:", err);
      });
    }
  }, [drink]);

  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (!content) {
    return (
      <Box
        sx={{ color: "white", background: "#000", minHeight: "100vh", p: 4 }}
      >
        No content found.
      </Box>
    );
  }

  const ResponsiveTypography = ({ children, ...props }) => (
    <Typography
      {...props}
      sx={{
        fontSize: { xs: "1.2rem", sm: "1.4rem", md: "2.2rem" },
        lineHeight: 1.3,
        pb: 2,
        ...props.sx,
      }}
    >
      {children}
    </Typography>
  );

  const SharedLayout = (
    mediaContent,
    isVideo = false,
    backgroundColor = "black"
  ) => (
    <Box
      sx={{
        pl: { xs: 2, sm: 3, md: 5 },
        pr: { xs: 2, sm: 3, md: 0 },
        backgroundColor,
        minHeight: "100vh",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
        <IconButton
          sx={{ border: "none", mr: 1, ml: -2 }}
          onClick={handleBackClick}
          aria-label="Back to main page"
        >
          <ArrowBackIcon sx={{ color: "white", mr: 1 }} />
          <Typography
            fontWeight={700}
            sx={{ color: "white", fontSize: "1rem" }}
          >
            {content.text1}
          </Typography>
        </IconButton>
      </Box>

      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          mb: 5,
          pl: { xs: 1, sm: 2 },
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        {content.text2}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Main Video/Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
            height: {
              xs: "350px",
              sm: "490px", // iPad size
              md: "700px",
            },
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
            mb: { xs: 4, sm: 6, md: 0 },
          }}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={`https:${content.video.fields.file.url}`}
              muted
              autoPlay
              playsInline
              loop
              preload="metadata"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Image
              src={`https:${content.video.fields.file.url}`}
              alt="Main Visual"
              fill
              className="mainVisualResponsiveImage"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          )}
        </Box>

        {/* Text Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            mt: { xs: 2, md: 8 },
            px: { xs: 1, sm: 2 },
            overflow: "hidden",
          }}
        >
          <ResponsiveTypography variant="h4" fontWeight={600}>
            {content.text3}
          </ResponsiveTypography>

          <Typography component="div" sx={{ mb: 2 }}>
            {documentToReactComponents(content.content)}
          </Typography>
          <Typography component="div" sx={{ mb: 2 }}>
            {documentToReactComponents(content.content1)}
          </Typography>
          {content.content2 && (
            <Typography component="div" sx={{ mb: 2 }}>
              {documentToReactComponents(content.content2)}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              px: 4,
              py: 1.5,
              mt: 2,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            {documentToReactComponents(content.link)}
          </Button>
        </Box>

        {/* Side Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "8%" },
            height: { xs: "250px", sm: "360px", md: "600px" },
            overflow: "hidden",
            position: "relative",
            pb: { xs: 4, sm: 5, md: 6 },
            mb: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <Image
            src={`https:${content.image.fields.file.url}`}
            alt="Side Visual"
            fill
            objectFit="cover"
            sizes="(max-width: 1024px) 100vw, 8vw"
            style={{
              objectPosition:
                typeof window !== "undefined" && window.innerWidth >= 1024
                  ? "-120px center"
                  : "center center",
              transform:
                typeof window !== "undefined" && window.innerWidth >= 1024
                  ? "scaleY(1.9)"
                  : "scale(1)",
              transformOrigin: "center",
              maxWidth: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  if (drink === "tequila") {
    return SharedLayout(content.video, true, "black");
  }

  if (drink === "beer") {
    return (
      <Box
        sx={{
          pl: { xs: 2, sm: 3, md: 5 },
          pr: { xs: 2, sm: 3, md: 0 },
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <Image
            src={`https:${content.image3.fields.file.url}`}
            alt="Beer background image"
            width={1200}
            height={800}
            objectFit="contain"
            style={{
              width: "100%",
              height: "100%",
              background: "#000",
              opacity: 1,
              pointerEvents: "none",
            }}
          />
        </Box>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {SharedLayout(content.video, false, "transparent")}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ color: "white", background: "#000", minHeight: "100vh", p: 4 }}>
      No content found.
    </Box>
  );
}
