"use client";
import React, { useRef, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";

export default function WhiskyPage({ whiskyContent }) {
  const videoRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay failed:", err);
      });
    }
  }, []);

  return (
    <Box
      sx={{
        pl: { xs: 2, sm: 3, md: 5 },
        pr: { xs: 2, sm: 3, md: 0 },
        backgroundColor: "#F8F1E8",
        minHeight: "100vh",
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 1, md: 2 },
          pt: 2,
          pl: 0,
        }}
      >
        <IconButton
          sx={{ border: "none", mr: 1, ml: -2 }}
          onClick={() => router.push("/")}
          aria-label="Back to main page"
        >
          <ArrowBackIcon sx={{ color: "black", mr: 1 }} />
          <Typography
            fontWeight={700}
            sx={{ color: "black", fontSize: "1rem" }}
          >
            {whiskyContent.text1}
          </Typography>
        </IconButton>
      </Box>

      {/* Technologies Heading */}
      <Typography
        variant="h2"
        fontWeight={700}
        fontFamily="Helvetica Neue"
        sx={{ mb: { xs: 2, md: 4 }, fontSize: { xs: "1.5rem", md: "2.5rem" } }}
      >
        {whiskyContent.text2}
      </Typography>

      {/* Main Row: 3 Columns */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 4 },
          alignItems: "flex-start",
        }}
      >
        {/* Column 1: Video */}
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
            height: { xs: "40vh", md: "600px" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <video
              ref={videoRef}
              src={`https:${whiskyContent.video.fields.file.url}`}
              muted
              autoPlay
              playsInline
              loop
              preload="metadata"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>

        {/* Column 2: Content */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            height: { xs: "auto", md: "600px" },
            overflowY: "auto",
            mt: { xs: 2, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            fontFamily="Helvetica Neue"
            gutterBottom
            sx={{ fontSize: { xs: "1.25rem", md: "1.75rem" } }}
          >
            {whiskyContent.text3}
          </Typography>

          <Typography component="div" sx={{ mb: 2 }}>
            {documentToReactComponents(whiskyContent.content)}
          </Typography>

          <Typography component="div" sx={{ mb: 2 }}>
            {documentToReactComponents(whiskyContent.content1)}
          </Typography>

          <Typography component="div" sx={{ mb: 4 }}>
            {documentToReactComponents(whiskyContent.content2)}
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
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {documentToReactComponents(whiskyContent.link)}
          </Button>
        </Box>

        {/* Column 3: Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "8%" },
            height: { xs: "auto", md: "600px" },
            overflow: "hidden",
            position: "relative",
            mb: { xs: 4, md: 0 },
          }}
        >
          <Box
            component="img"
            src={"https:" + whiskyContent.image.fields.file.url}
            alt="Technology Visual"
            loading="lazy"
            decoding="async"
            sx={{
              width: { xs: "100%", md: "200%" },
              height: "100%",
              objectFit: { xs: "contain", md: "cover" },
              objectPosition: { xs: "center", md: "-120px center" },
              display: "block",
              transform: {
                xs: "none",
                md: "scaleY(1.9)",
              },
              transformOrigin: { xs: "center", md: "center" },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    const whiskyContent = await client.getEntries({
      content_type: "subSectionWhatsYourWhisky",
      "fields.text": "Sub Section - What's Your Whisky?",
    });

    return {
      props: {
        whiskyContent: whiskyContent.items[0]?.fields || null,
      },
    };
  } catch (error) {
    console.error("Error fetching content from Contentful:", error);
    return {
      props: {
        whiskyContent: null,
      },
    };
  }
}
