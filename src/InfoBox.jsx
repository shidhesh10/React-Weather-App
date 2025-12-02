import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudIcon from "@mui/icons-material/Cloud";

export default function InfoBox({ info }) {
  /* -----------------------------------------------------
     1) BACKGROUND IMAGES (categorized by weather conditions)
     ----------------------------------------------------- */

  // Snow / Freezing
  const BG_SNOW =
    "https://images.unsplash.com/photo-1631315124498-41ebb8b10ede?q=80&w=1334&auto=format&fit=crop";
  const BG_FREEZING =
    "https://images.unsplash.com/photo-1631315124498-41ebb8b10ede?q=80&w=1334&auto=format&fit=crop";

  // Cold (0–15°C)
  const BG_COLD_CLEAR =
    "https://images.unsplash.com/photo-1571086104578-65de096e84d6?q=80&w=1074&auto=format&fit=crop";
  const BG_COLD_CLOUDY =
    "https://images.unsplash.com/photo-1668531387310-9c3c2f272d52?q=80&w=1170&auto=format&fit=crop";

  // Mild (15–25°C)
  const BG_MILD_CLEAR =
    "https://images.unsplash.com/photo-1652013033442-cc8337ff7395?q=80&w=1074&auto=format&fit=crop";
  const BG_MILD_CLOUDY =
    "https://images.unsplash.com/photo-1731737049505-762518bb6e3d?q=80&w=1074&auto=format&fit=crop";

  // Warm / Hot (25–35°C)
  const BG_HOT_CLEAR =
    "https://images.unsplash.com/photo-1761069606357-48efa2fd9f3b?q=80&w=1170&auto=format&fit=crop";
  const BG_HOT_CLOUDY =
    "https://images.unsplash.com/photo-1700975211064-b1e6f55d5c06?q=80&w=1074&auto=format&fit=crop";

  // Rain / Storm
  const BG_RAIN_LIGHT =
    "https://images.unsplash.com/photo-1564055737782-31ab005a3903?q=80&w=1074&auto=format&fit=crop";
  const BG_RAIN_HEAVY =
    "https://images.unsplash.com/photo-1656495782911-06e6a5f9bef5?q=80&w=1080&auto=format&fit=crop";
  const BG_STORM =
    "https://images.unsplash.com/photo-1662568579864-0c659132730b?q=80&w=1170&auto=format&fit=crop";

  // Fog / Mist / Haze
  const BG_FOG =
    "https://images.unsplash.com/photo-1654156109203-ecc428de882d?q=80&w=1170&auto=format&fit=crop";

  /* -----------------------------------------------------
     2) WEATHER & TEMP VALUES
     ----------------------------------------------------- */
  const t = info.temp;
  const w = info.weather.toLowerCase();

  /* -----------------------------------------------------
     3) WEATHER TYPE MATCHES
     ----------------------------------------------------- */
  const isSnow = /snow|sleet|blizzard/.test(w);
  const isStorm = /thunder|storm/.test(w);
  const isRain = /rain|drizzle|shower/.test(w);
  const isFog = /fog|mist|haze|smoke/.test(w);
  const isCloud = /cloud/.test(w);
  const isClear = /clear/.test(w);

  /* -----------------------------------------------------
     4) TEMPERATURE RANGES
     ----------------------------------------------------- */
  const isFreezing = t <= 0;
  const isCold = t > 0 && t <= 15;
  const isMild = t > 15 && t <= 25;
  const isWarm = t > 25 && t <= 35;
  const isVeryHot = t > 35;

  /* -----------------------------------------------------
     5) DEFAULTS (fallback)
     ----------------------------------------------------- */
  let bg = BG_MILD_CLEAR;
  let icon = <WbSunnyIcon className="weather-icon" />;

  /* -----------------------------------------------------
     6) WEATHER PRIORITY LOGIC
     ----------------------------------------------------- */

  // ❄ Snow / Freezing
  if (isSnow || isFreezing) {
    bg = isCloud ? BG_SNOW : BG_FREEZING;
    icon = <AcUnitIcon className="weather-icon" />;
  }

  // 🌩 Thunderstorms
  else if (isStorm) {
    bg = BG_STORM;
    icon = <ThunderstormIcon className="weather-icon" />;
  }

  // 🌧 Rain
  else if (isRain) {
    bg = isCold || isMild ? BG_RAIN_LIGHT : BG_RAIN_HEAVY;
    icon = <ThunderstormIcon className="weather-icon" />;
  }

  // 🌫 Fog / Mist / Haze
  else if (isFog) {
    bg = BG_FOG;
    icon = <CloudIcon className="weather-icon" />;
  }

  // ☁ Cloudy
  else if (isCloud) {
    if (isCold || isFreezing) bg = BG_COLD_CLOUDY;
    else if (isMild) bg = BG_MILD_CLOUDY;
    else if (isWarm || isVeryHot) bg = BG_HOT_CLOUDY;
    icon = <CloudIcon className="weather-icon" />;
  }

  // 🌤 Clear / Sunny
  else if (isClear || true) {
    if (isFreezing || isCold) {
      bg = BG_COLD_CLEAR;
      icon = <AcUnitIcon className="weather-icon" />;
    } else if (isMild) {
      bg = BG_MILD_CLEAR;
      icon = <WbSunnyIcon className="weather-icon" />;
    } else if (isWarm) {
      bg = BG_HOT_CLEAR;
      icon = <WbSunnyIcon className="weather-icon" />;
    } else if (isVeryHot) {
      bg = BG_HOT_CLEAR;
      icon = <WbSunnyIcon className="weather-icon" />;
    }
  }

  /* -----------------------------------------------------
     7) UI RENDERING (Card + Weather Details)
     ----------------------------------------------------- */

  return (
    <div className="InfoBox">
      <Card
        className="glass-card"
        sx={{
          width: "100%",
          maxWidth: 350,
          maxHeight: 500,
          borderRadius: "26px",
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7))",
          color: "#e5e7eb",
          boxShadow: "0 24px 60px rgba(15,23,42,0.8)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(148,163,184,0.4)",
          paddingBottom: "8px",
        }}
      >
        {/* Card Top Image (Weather Background) */}
        <CardMedia
          sx={{ height: 170, overflow: "hidden" }}
          image={bg}
        />

        <CardContent>
          {/* City + Icon */}
          <div className="city-row">
            <Typography variant="h5" className="city-name">
              {info.city}
            </Typography>
            {icon}
          </div>

          {/* Weather Details */}
          <Typography variant="body2" className="weather-details">
            <p className="temp-main">{Math.round(info.temp)}°C</p>
            <p className="temp-sub">
              Feels like <b>{Math.round(info.feelsLike)}°C</b>
            </p>
            <p>
              Min: {Math.round(info.tempMin)}°C • Max:{" "}
              {Math.round(info.tempMax)}°C
            </p>
            <p>Humidity: {info.humidity}%</p>
            <p>
              Condition: <i>{info.weather}</i>
            </p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
