"use client";
import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";

export default function WhiskyPage({ beerContent }) {
  const router = useRouter();

  return (
    <Box
      sx={{
        pl: { xs: 2, sm: 3, md: 5 },
        pr: { xs: 2, sm: 3, md: 0 },
        pb: { xs: 4, md: 6 },
        backgroundColor: "#000",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Background image as an <img> tag */}
      <Box
        component="img"
        loader={() => "https:" + beerContent.image3.fields.file.url}
        src={"https:" + beerContent.image3.fields.file.url}
        alt="Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 1,
          pointerEvents: "none",
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>
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
            <ArrowBackIcon sx={{ color: "white", mr: 1 }} />
            <Typography
              fontWeight={700}
              sx={{ color: "white", fontSize: "1rem" }}
            >
              {beerContent.text1}
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
            color: "white",
          }}
        >
          {beerContent.text2}
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
          {/* Column 1: Image */}
          {/* <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              height: { xs: "auto", md: "600px" },
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src="/beer.jpg"
              alt="Cocktail"
              sx={{
                width: "100%",
                height: { xs: "auto", md: "100%" },
                objectFit: { xs: "contain", md: "cover" },
                display: "block",
              }}
            />
          </Box> */}

          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              height: { xs: "auto", md: "500px" }, // 🔧 update this
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={"https:" + beerContent.video.fields.file.url}
              alt="Cocktail"
              sx={{
                width: "100%",
                height: { xs: "auto", md: "100%" },
                objectFit: { xs: "contain", md: "contain" }, // 🔧 change cover → contain
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
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              fontFamily="Helvetica Neue"
              gutterBottom
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                color: "white",
              }}
            >
              {beerContent.text3}
            </Typography>
            <Typography
              component="div"
              sx={{
                mb: 2,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                color: "white",
              }}
            >
              {documentToReactComponents(beerContent.content)}
            </Typography>

            <Typography
              component="div"
              sx={{
                mb: 4,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                color: "white",
              }}
            >
              {documentToReactComponents(beerContent.content1)}
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <span style={{ color: "black" }}>
                {" "}
                {documentToReactComponents(beerContent.link)}
              </span>
            </Button>
          </Box>

          {/* Column 3: Side Slider Image */}
          <Box
            sx={{
              width: { xs: "100%", md: "8%" },
              height: { xs: "auto", md: "500px" },
              overflow: "hidden",
              position: "relative",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Box
              component="img"
              src={"https:" + beerContent.image.fields.file.url}
              alt="Technology Visual"
              sx={{
                width: { xs: "100%", md: "200%" },
                height: { xs: "auto", md: "100%" },
                objectFit: { xs: "contain", md: "cover" },
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
    </Box>
  );
}

export async function getStaticProps() {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    const beerContent = await client.getEntries({
      content_type: "subSectionWhatsYourBeer",
      "fields.text": "Sub Section - What's Your Beer?",
    });
    console.log("Dropdown Content:", beerContent.items[0]?.fields);

    return {
      props: {
        beerContent: beerContent.items[0]?.fields || null,
      },
    };
  } catch (error) {
    console.error("Error fetching content from Contentful:", error);
    return {
      props: {
        beerContent: null,
      },
    };
  }
}
