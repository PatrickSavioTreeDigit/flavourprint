"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Collapse, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";

export default function TechnologyDropdown(props, dropDownSection) {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen((prev) => !prev);
  const router = useRouter();

  const boxWidth = { xs: "90%", sm: "80%", md: "60%" };

  return (
    <Box
      sx={{
        py: { xs: 1, md: 2 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#000",
        pb: { xs: 12, md: 10 },
      }}
    >
      {/* Background Section Starts */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: { xs: 2, md: 3 },
        }}
      >
        {/* Heading */}
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: 9,
            alignSelf: "flex-start",
            pl: { xs: 2, sm: 6 },
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          {props.content.text1}
        </Typography>

        {/* Dropdown Container */}
        <Box sx={{ width: boxWidth }}>
          {/* Collapsed View */}
          {!open && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  m: 0,
                  p: 0,
                }}
                onClick={toggleDropdown}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                    m: 0,
                    p: 0,
                  }}
                >
                  {props.content.text2}
                </Typography>
                <IconButton
                  sx={{
                    color: "#fff",
                    transition: "transform 0.3s ease",
                    p: 0,
                    m: 0,
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                    }}
                  />
                </IconButton>
              </Box>

              <Divider
                sx={{
                  backgroundColor: "#fff",
                  mt: 0,
                  mb: 0,
                }}
              />
            </>
          )}

          {/* Expanded View */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                backgroundColor: "#5a5a5a",
                px: 4,
                py: { xs: 6, sm: 10 },
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                width: "100%",
                minHeight: { xs: 420, sm: 540 },
              }}
            >
              {/* Collapse icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={toggleDropdown}
              >
                <IconButton
                  sx={{
                    color: "#fff",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    p: 0,
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                    }}
                  />
                </IconButton>
              </Box>

              <Divider
                sx={{
                  backgroundColor: "#fff",
                  width: "100%",
                  mt: 0,
                  mb: 0,
                }}
              />

              {/* Dropdown Images */}
              <Box
                component="img"
                loader={() => "https:" + props.content.image1.fields.file.url}
                src={"https:" + props.content.image1.fields.file.url}
                alt="What's Your Tequila?"
                sx={{
                  width: { xs: "90%", sm: "60%" },
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={() => router.push("/tequila")}
              />
              <Box
                component="img"
                loader={() => "https:" + props.content.image2.fields.file.url}
                src={"https:" + props.content.image2.fields.file.url}
                alt="What's Your Whisky?"
                sx={{
                  width: { xs: "90%", sm: "60%" },
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={() => router.push("/whisky")}
              />
              <Box
                component="img"
                loader={() => "https:" + props.content.image3.fields.file.url}
                src={"https:" + props.content.image3.fields.file.url}
                alt="What's Your Beer?"
                sx={{
                  width: { xs: "90%", sm: "60%" },
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={() => router.push("/cocktail")}
              />
              <Box
                component="img"
                src="/images/Dropdown4.png"
                alt="What's Your Cocktail?"
                sx={{
                  width: { xs: "90%", sm: "60%" },
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={() => router.push("/beer ")}
              />
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}
