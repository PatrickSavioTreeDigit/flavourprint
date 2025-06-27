import React, { useEffect, useRef } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import Image from "next/image";

export default function WhiteScreenPage({ drink, content }) {
  const router = useRouter();
  const videoRef = useRef(null);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    if (drink === "whisky" && videoRef.current) {
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
        sx={{ color: "black", background: "#F8F1E8", minHeight: "100vh", p: 4 }}
      >
        No content found.
      </Box>
    );
  }

  const renderLayout = () => (
    <Box
      sx={{
        pl: { xs: 2, sm: 3, md: 5 },
        pr: { xs: 2, sm: 3, md: 0 },
        backgroundColor: "#F8F1E8",
        minHeight: "100vh",
        color: "black",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", pt: 2, pb: 1 }}>
        <IconButton
          sx={{ border: "none", mr: 1, ml: -2 }}
          onClick={handleBackClick}
          aria-label="Back to main page"
        >
          <ArrowBackIcon sx={{ color: "black", mr: 1 }} />
          <Typography
            fontWeight={700}
            sx={{ color: "black", fontSize: "1rem" }}
          >
            {content.text1}
          </Typography>
        </IconButton>
      </Box>

      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          mb: 6,
          alignSelf: "flex-start",
          pl: { xs: 2, sm: 6 },
          fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        {content.text2}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
            height: { xs: "40vh", md: "600px" },
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {drink === "whisky" ? (
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
              alt="Visual"
              fill
              objectFit="cover"
              sizes="(max-width: 900px) 100vw, 35vw"
            />
          )}
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            mt: { xs: 2, md: 8 },
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={drink === "whisky" ? 750 : 600}
            fontFamily={
              drink === "cocktail"
                ? "'Playfair Display', 'Georgia', serif"
                : "'Helvetica Neue', Helvetica, Arial, sans-serif"
            }
            textTransform="uppercase"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              transform: "scaleY(1.2)",
              pb: 2,
            }}
          >
            {content.text3}
          </Typography>

          <Typography
            component="div"
            sx={{ mb: 2, fontSize: { xs: "0.95rem", sm: "1rem" } }}
          >
            {documentToReactComponents(content.content)}
          </Typography>

          <Typography
            component="div"
            sx={{ mb: 2, fontSize: { xs: "0.95rem", sm: "1rem" } }}
          >
            {documentToReactComponents(content.content1)}
          </Typography>

          <Typography
            component="div"
            sx={{ mb: 4, fontSize: { xs: "0.95rem", sm: "1rem" } }}
          >
            {documentToReactComponents(content.content2)}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {documentToReactComponents(content.link)}
          </Button>
        </Box>

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

  return renderLayout();
}
