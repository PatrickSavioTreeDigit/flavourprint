"use client";
import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";

export default function WhiskyPage({ cocktailContent }) {
  const router = useRouter();

  return (
    // <Box
    //   sx={{
    //     p: { xs: 2, sm: 3, md: 5 },
    //     backgroundColor: "#F8F1E8",
    //     minHeight: "100vh",
    //   }}
    // >

    <Box
      sx={{
        pl: { xs: 2, sm: 3, md: 5 }, // keep left padding for image 1
        pr: { xs: 2, sm: 3, md: 0 },
        pb: { xs: 4, md: 6 }, // remove right padding in desktop
        backgroundColor: "#F8F1E8",
        minHeight: "100vh",
        overflowX: "hidden",
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
            {cocktailContent.text1}
          </Typography>
        </IconButton>
      </Box>

      {/* Technologies Heading */}
      <Typography
        variant="h2"
        fontWeight={700}
        fontFamily="Helvetica Neue"
        sx={{
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        {cocktailContent.text2}
      </Typography>

      {/* Main Row: 3 Columns */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 4 },
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
            height: { xs: "auto", md: "600px" },
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={"https:" + cocktailContent.video.fields.file.url}
            alt="Cocktail"
            sx={{
              width: "100%",
              height: { xs: "auto", md: "100%" },
              objectFit: { xs: "contain", md: "cover" },
              display: "block",
            }}
          />
        </Box>

        {/* Column 2: Content */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            height: "auto",
            overflowY: "auto",
            mt: { xs: 0, md: 8 },
            px: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            fontFamily="Helvetica Neue,sans-serif"
            gutterBottom
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            {cocktailContent.text3}
          </Typography>

          <Typography
            component="div"
            sx={{ mb: 2, fontSize: { xs: "0.95rem", sm: "1rem" } }}
          >
            {documentToReactComponents(cocktailContent.content)}
          </Typography>

          <Typography
            component="div"
            sx={{ mb: 4, fontSize: { xs: "0.95rem", sm: "1rem" } }}
          >
            {documentToReactComponents(cocktailContent.content1)}
          </Typography>

          <Typography
            component="div"
            sx={{ mb: 4, fontSize: { xs: "0.95rem", sm: "1rem" } }}
          >
            {documentToReactComponents(cocktailContent.content2)}
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
            {documentToReactComponents(cocktailContent.link)}
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "8%" },
            height: { xs: "auto", md: "600px" }, // allow natural height on mobile
            overflow: "hidden",
            position: "relative",
            mt: { xs: 2, md: 0 },
          }}
        >
          <Box
            component="img"
            src={"https:" + cocktailContent.image.fields.file.url}
            alt="Technology Visual"
            sx={{
              width: { xs: "100%", md: "200%" },
              height: { xs: "auto", md: "100%" }, // allow natural height on mobile
              objectFit: { xs: "contain", md: "cover" }, // full image on mobile
              objectPosition: { xs: "center", md: "-120px center" },
              display: "block",
              transform: {
                xs: "none",
                md: "scaleY(1.9)",
              },
              transformOrigin: "center",
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

    const cocktailContent = await client.getEntries({
      content_type: "subSectionWhatsYourCocktail",
      "fields.text": "Sub Section - What's Your Cocktail?",
    });
    console.log("Dropdown Content:", cocktailContent.items[0]?.fields);
    return {
      props: {
        cocktailContent: cocktailContent.items[0]?.fields || null,
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
