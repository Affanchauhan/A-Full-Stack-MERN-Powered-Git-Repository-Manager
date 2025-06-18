import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// Function to generate random activity
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("T")[0], //YYY-MM-DD
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const getPanelColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${greenValue}, 0)`;
  }

  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2001-01-01";
      const endDate = "2001-01-31";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));
      setPanelColors(getPanelColors(maxCount));
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        padding: "24px",
        border: "1px solid #30363d",
        borderRadius: "6px",
        marginBottom: "16px",
        width: "200%",
        maxWidth: "896px", // GitHub's approximate width
        marginTop: "1rem",
      }}
    >
      <h4
        style={{
          color: "#c9d1d9",
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "16px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        }}
      >
        Recent Contributions
      </h4>
      <div
        style={{
          width: "100%",
          height: "440px", // Increased height
          overflow: "hidden", // Ensures clean edges
        }}
      >
        <HeatMap
          value={activityData}
          weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]} // GitHub-style labels
          startDate={new Date("2001-01-01")}
          rectSize={16} // Slightly larger squares
          space={4} // More spacing
          rectProps={{
            rx: 3, // Slightly rounded corners
            style: {
              stroke: "rgba(27, 31, 35, 0.06)", // Subtle border
            },
          }}
          panelColors={panelColors}
          style={{
            width: "100%",
            height: "100%",
            color: "#8b949e",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
            fontSize: "11px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "8px",
          color: "#8b949e",
          fontSize: "11px",
        }}
      >
        <span style={{ marginRight: "4px" }}>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: panelColors[level],
              margin: "0 2px",
              borderRadius: "3px",
            }}
          />
        ))}
        <span style={{ marginLeft: "4px" }}>More</span>
      </div>
    </div>
  );
};

export default HeatMapProfile;
