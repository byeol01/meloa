// src/pages/admin/ABest.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyPopularMusic } from "../../data/dummyPopularMusic";

const ABest = () => {
  const navigate = useNavigate();
  const [musicData, setMusicData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // 추후 fetchPopularMusic 사용 가능
    setMusicData(dummyPopularMusic);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleEdit = (musicItem) => {
    navigate("/admin/upload", { state: { upload: musicItem } });
  };

  return (
    <Container>
      <Header>
        <Title>인기차트 (관리자)</Title>
        <Time>{currentTime}</Time>
      </Header>

      <List>
        {musicData.map((item, index) => (
          <ListItem key={item.id}>
            <Rank>{index + 1}</Rank>
            <Thumbnail src={item.image} alt={`${item.title} 앨범 이미지`} />
            <Info>
              <SongTitle>{item.title}</SongTitle>
              <Artist>{item.artist}</Artist>
            </Info>
            <EditButton
              onClick={() => handleEdit(item)}
              aria-label="수정하기"
            >
              <EditIcon src="/icons/border.svg" alt="수정 아이콘" />
            </EditButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ABest;

// styled-components
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;

const Time = styled.span`
  font-size: 14px;
  color: #888;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #fdf1f6;
  }
`;

const Rank = styled.div`
  width: 24px;
  text-align: center;
  font-weight: bold;
  color: #ff2c68;
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 12px;
`;

const Info = styled.div`
  flex: 1;
`;

const SongTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

const Artist = styled.div`
  font-size: 14px;
  color: #666;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
`;

const EditIcon = styled.img`
  width: 24px;
  height: 24px;
`;
