import React, { useState, useEffect } from "react";
import { playlists as dummyPlaylists } from "../../data/dummyData";
import { useNavigate } from "react-router-dom"; // 연결용

const List = () => {
  const [sortType, setSortType] = useState("latest");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(dummyPlaylists.map((item, idx) => ({ ...item, id: idx + 1 })));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <div style={containerStyle}>
      <div style={topBarStyle}>
        <h2 style={sectionTitleStyle}>플레이리스트</h2>
        <div style={sortButtonsStyle}>
          <button
            style={{
              ...sortButtonStyle,
              fontWeight: sortType === "latest" ? "600" : "400",
              color: sortType === "latest" ? "#000" : "#666"
            }}
            onClick={() => setSortType("latest")}
          >
            최신순
          </button>
          <button
            style={{
              ...sortButtonStyle,
              fontWeight: sortType === "popular" ? "600" : "400",
              color: sortType === "popular" ? "#000" : "#666"
            }}
            onClick={() => setSortType("popular")}
          >
            인기순
          </button>
        </div>
      </div>

      <div style={gridContainerStyle}>
        {data.map((item) => (
          <div key={item.id} style={gridItemStyle} onClick={() => handleCardClick(item.id)}>
            <img src={item.image || "https://placehold.co/360"} alt={item.title} style={thumbnailStyle} />
            <h3 style={titleStyle}>{item.title}</h3>
            <p style={editorStyle}>{item.editor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ 스타일 정의 (그리드 기반)
const containerStyle = {
  maxWidth: "768px",
  margin: "0 auto",
  background: "#FAFAFA",
  minHeight: "100vh",
  padding: "0 16px",
};

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 0",
  background: "white",
  position: "sticky",
  top: "0",
  zIndex: "10"
};

const sectionTitleStyle = {
  fontWeight: "700",
  fontSize: "18px",
  color: "#000",
  margin: "0"
};

const sortButtonsStyle = {
  display: "flex",
  gap: "8px"
};

const sortButtonStyle = {
  fontSize: "14px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "4px",
  transition: "background-color 0.2s"
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  paddingBottom: "40px"
};

const gridItemStyle = {
  background: "#fff",
  borderRadius: "2px",
  overflow: "hidden",
  boxShadow: "0 0 4px rgba(0,0,0,0.05)",
  cursor: "pointer",
  textAlign: "left"
};

const thumbnailStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover"
};

const titleStyle = {
  fontSize: "15px",
  fontWeight: "600",
  margin: "8px 12px 4px 12px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
};

const editorStyle = {
  fontSize: "13px",
  color: "#666",
  margin: "0 12px 12px 12px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

export default List;
