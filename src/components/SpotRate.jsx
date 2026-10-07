import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.screen.width <= 768); // 🔥 screen.width ignores zoom
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
    platinumBid: null,
    platinumAsk: null,
  });

  const detectChange = (prevVal, currVal, setDir) => {
    if (prevVal === null) return currVal;

    if (currVal > prevVal) {
      setDir("rise");
      setTimeout(() => setDir("neutral"), 800);
    } else if (currVal < prevVal) {
      setDir("fall");
      setTimeout(() => setDir("neutral"), 800);
    }

    return currVal;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(
      prev.current.goldBid,
      goldData.bid,
      setGoldBidDir,
    );
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(
      prev.current.goldAsk,
      goldData.ask,
      setGoldAskDir,
    );
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(
      prev.current.silverBid,
      silverData.bid,
      setSilverBidDir,
    );
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(
      prev.current.silverAsk,
      silverData.ask,
      setSilverAskDir,
    );
  }, [silverData.ask]);

  const getColors = (dir, isSilver) => {
    if (dir === "rise")
      return {
        bgColor: "rgba(34, 197, 94, 0.25)",
        border: "1px solid rgba(74, 222, 128, 0.45)",
        color: "#ffffff",
      };
    if (dir === "fall")
      return {
        bgColor: "rgba(239, 68, 68, 0.25)",
        border: "1px solid rgba(248, 113, 113, 0.45)",
        color: "#ffffff",
      };
    return {
      bgColor: "rgba(0, 0, 0, 0.45)",
      border: isSilver
        ? "1px solid rgba(180, 210, 245, 0.28)"
        : "1px solid rgba(255, 210, 170, 0.28)",
      color: "#ffffff",
    };
  };

  const PricePulse = ({ label, value, dir, isSilver }) => {
    const { bgColor, border, color } = getColors(dir, isSilver);
    const hasPulse = dir !== "neutral";

    return (
      <Box
        sx={{
          position: "relative",
          flex: 1,
          mb: ".5vw",
          overflow: "hidden",
          ...(hasPulse && {
            animation:
              dir === "rise"
                ? "pulseRise 0.8s ease-out"
                : "pulseFall 0.8s ease-out",
          }),
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.4vw",
            },
            fontWeight: 700,
            letterSpacing: "0.2vw",
            color: isSilver ? "#CFE1F2" : "#FFDEB5",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "18px",
              sm: "2.5vw",
              md: "1.8vw",
              lg: "2.4vw",
              xl: "2.4vw",
            },
            fontWeight: 800,
            letterSpacing: "0.15vw",
            textAlign: "center",
            bgcolor: bgColor,
            color: color,
            border: border,
            borderRadius: "1vw",
            py: "0.2vw",
            fontVariantNumeric: "tabular-nums",
            transition: "all 0.4s ease",
            boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1)",
          }}
        >
          {value != null && value !== 0 && value !== "0.00" && value !== "0"
            ? value
            : "0"}
        </Typography>
      </Box>
    );
  };

  const MetalPanel = ({ data, bidDir, askDir, theme }) => {
    const isSilver = theme === "silver";

    const title = isSilver ? "SILVER" : "GOLD";

    return (
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "1.8vw",
          backdropFilter: "blur(0.8vw)",
          background: isSilver
            ? `linear-gradient(135deg, rgba(18, 24, 34, 0.65) 0%, rgba(28, 38, 52, 0.75) 50%, rgba(12, 16, 22, 0.85) 100%)`
            : `linear-gradient(135deg, rgba(46, 18, 5, 0.65) 0%, rgba(72, 34, 12, 0.75) 50%, rgba(30, 10, 3, 0.85) 100%)`,
          border: isSilver
            ? "0.14vw solid rgba(180, 210, 245, 0.28)"
            : "0.14vw solid rgba(255, 210, 170, 0.28)",
          boxShadow: `
            inset 0 0 0.08vw rgba(255,255,255,0.15),
            0 0 1vw rgba(0,0,0,0.3)
          `,
          padding: {
            xs: "2vw 3vw",
            sm: "0.5vw 2vw",
            md: "1.5vw 1vw",
          },
          display: "grid",
          alignItems: "center",
          gap: "1vw",
          gridTemplateColumns: ".7fr 1fr 1fr",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            padding: "0.08vw",
            borderRadius: "inherit",
            background: isSilver
              ? `linear-gradient(150deg, rgba(255, 255, 255, 0.45) 0%, #d0e4f7 35%, #3d5066 70%, #bcdbf7 100%)`
              : `linear-gradient(150deg, rgba(255, 210, 170, 0.35) 0%, #fce0c7 35%, #7a3c18 70%, #FFD7A8 100%)`,
            WebkitMask: `
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0)
            `,
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "4.5vw",
              height: "4.5vw",
              objectFit: "contain",
            }}
            component="img"
            src={isSilver ? "/images/silver-bar.png" : "/images/gold-bar.png"}
            alt={title}
          />

          <Box
            sx={{
              fontSize: { xs: "14px", md: "1.7vw" },
              fontWeight: 800,
              letterSpacing: "0.1em",
              background: isSilver
                ? "linear-gradient(90deg, #E8F4FF, #9AC6FF)"
                : "linear-gradient(90deg, #FFF7CC, #FFCD9A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1",
            }}
          >
            {title}
          </Box>
        </Box>

        <Box
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.6vw",
              lg: "1.4vw",
              xl: "1.2vw",
            },
            color: "#fff",
            fontWeight: "700",
          }}
        >
          <PricePulse
            label="BID"
            value={data.bid}
            dir={bidDir}
            isSilver={isSilver}
          />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>LOW </span>
          <span className="hl-value-low" style={{ color: "#F87171" }}>
            {data.low != null ? data.low : "—"}
          </span>
        </Box>

        {/* Price Boxes */}
        <Box
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.6vw",
              lg: "1.4vw",
              xl: "1.2vw",
            },
            color: "#fff",
            fontWeight: "700",
          }}
        >
          <PricePulse
            label="ASK"
            value={data.ask}
            dir={askDir}
            isSilver={isSilver}
          />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>HIGH </span>
          <span className="hl-value-high" style={{ color: "#4ADE80" }}>
            {data.high != null ? data.high : "—"}
          </span>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: "1vw",
        width: "100%",
        alignItems: "end",
        marginTop: {
          xs: "20px", // mobile
          sm: "0vw", // small tablets
        },
        gridTemplateColumns: { xs: "1fr" },
      }}
    >
      <MetalPanel
        data={goldData}
        bidDir={goldBidDir}
        askDir={goldAskDir}
        theme="gold"
      />

      <MetalPanel
        data={silverData}
        bidDir={silverBidDir}
        askDir={silverAskDir}
        theme="silver"
      />
    </Box>
  );
};

export default SpotRate;
