// src/pages/user/LatestP.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePlayer } from "../../components/user/Player";
import { dummyPopularMusic } from "../../data/dummyPopularMusic";
// import axios from "axios";  // ⚠️ 백엔드 연동 시 주석 해제하세요

const LatestP = () => {
  const { setCurrentTrack } = usePlayer();
  const navigate = useNavigate();
  const [musicData, setMusicData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // 백엔드 연동 시 아래 주석 해제 후 사용하세요
    /*
    const fetchLatestMusic = async () => {
      try {
        const res = await axios.get("/api/music/latest");
        setMusicData(res.data);
      } catch (err) {
        console.error("최신 음악 데이터를 불러오는 데 실패했습니다:", err);
        setMusicData(dummyPopularMusic); // 실패 시 임시 데이터 fallback
      }
    };
    fetchLatestMusic();
    */

    // 임시 데이터 세팅 (백엔드 연동 전용)
    setMusicData(dummyPopularMusic);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setCurrentTime(timeStr);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <Header>
        <Title>최신곡</Title>
        <Time>{currentTime}</Time>
      </Header>

      <List>
        {musicData.length > 0 ? (
          musicData.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => navigate(`/playlist/${item.id}`, { state: item })}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(`/playlist/${item.id}`, { state: item });
              }}
            >
              <Thumbnail src={item.image} alt={`${item.title} 앨범 이미지`} />
              <Info>
                <SongTitle>{item.title}</SongTitle>
                <Artist>{item.artist}</Artist>
              </Info>
              <PlayButton
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentTrack(item);
                  // setIsPlaying(true); // 재생 상태가 있으면 활성화
                }}
              >
                <PlayIcon src="/icons/play_button.svg" alt="Play" />
              </PlayButton>
            </ListItem>
          ))
        ) : (
          <>
            {[...Array(3)].map((_, idx) => (
              <ListItem key={"empty-" + idx} aria-hidden="true">
                <EmptyThumbnail />
                <Info>
                  <EmptyText />
                  <EmptyText small />
                </Info>
                <PlayButton disabled aria-label="No data" />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Container>
  );
};


// 스타일 관련 코드는 기존 것 사용 또는 별도 작성하세요


const Container = styled.div`
  padding: 16px;
  max-width: 550px;
  margin: 0 auto;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
`;

const Time = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const List = styled.div`
  border-top: 1px solid #e5e7eb;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }

  &[aria-hidden="true"] {
    cursor: default;
    pointer-events: none;

    &:hover {
      background-color: transparent;
    }
  }
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  margin: 0 12px;
`;

const EmptyThumbnail = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 12px;
  border-radius: 6px;
  border: 2px dashed #e5e7eb;
  background-color: #f9fafb;
`;

const Info = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SongTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyText = styled.div`
  height: ${(props) => (props.small ? "12px" : "16px")};
  width: ${(props) => (props.small ? "80px" : "140px")};
  margin: 4px 0;
  background-color: #e5e7eb;
  border-radius: 4px;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  margin-left: 8px;
  cursor: pointer;
`;

const PlayIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`;

export default LatestP;
