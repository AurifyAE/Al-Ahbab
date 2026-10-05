import React from "react";
import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const NewsTicker = ({ newsItems = [] }) => {
  const items =
    newsItems.length > 0
      ? newsItems
      : [{ description: "Welcome to Al Ahbab Updates" }];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "38px",
          lg: "2.7vw",
        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backdropFilter: "blur(0.6vw)",
        background: `
          linear-gradient(
            90deg,
            rgba(26,11,4,0.92) 0%,
            rgba(45,19,8,0.85) 40%,
            rgba(20,8,2,0.92) 100%
          )
        `,
        borderTop: "0.08vw solid rgba(255,210,170,0.22)",
        borderBottom: "0.08vw solid rgba(255,210,170,0.12)",
        boxShadow: `
          inset 0 0 1vw rgba(255,180,120,0.04),
          0 0 1.5vw rgba(0,0,0,0.4)
        `,
      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          color: "#FFDFB2",
          background:
            "linear-gradient(135deg, rgba(58, 26, 8, 0.95) 0%, rgba(88, 44, 15, 0.95) 50%, rgba(38, 15, 4, 0.95) 100%)",
          borderRight: "0.1vw solid rgba(255, 210, 170, 0.35)",
          fontSize: {
            xs: "14px",
            lg: "1.35vw",
          },
          fontWeight: 900,
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
          padding: "0 3vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow:
            "inset 0 0 0.8vw rgba(255, 200, 120, 0.12), 2px 0 10px rgba(0,0,0,0.3)",
        }}
      >
        Al Ahbab
      </Typography>

      {/* NEWS TICKER */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Marquee
          speed={40} // Lower = slower
          gradient={false}
          autoFill={true}
          loop={0}
          direction="left" // Infinite
        >
          {items.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                textTransform: "capitalize",
                color: "#FFF4E3",
                fontSize: {
                  xs: "14px",
                  lg: "1.3vw",
                },
                fontWeight: 700,
                whiteSpace: "nowrap",
                mx: "1.5vw",
                flexShrink: 0,
              }}
            >
              {item?.description || ""}
            </Typography>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};

export default NewsTicker;
