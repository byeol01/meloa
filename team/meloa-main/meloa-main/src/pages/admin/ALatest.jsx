import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyPopularMusic } from "../../data/dummyPopularMusic";

const ALatest = () => {
  const navigate = useNavigate();
  const [musicData, setMusicData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // 백엔드 연동 시 fetchLatestMusic으로 대체 가능
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

  const handleEditClick = (item) => {
    navigate("/admin/upload", { state: { upload: item } });
  };

  return (
    <Container>
      <Header>
        <Title>최신곡 (관리자)</Title>
        <Time>{currentTime}</Time>
      </Header>

      <List>
        {musicData.length > 0 ? (
          musicData.map((item) => (
            <ListItem key={item.id}>
              <Thumbnail src={item.image} alt={`${item.title} 앨범 이미지`} />
              <Info>
                <SongTitle>{item.title}</SongTitle>
                <Artist>{item.artist}</Artist>
              </Info>
              <EditButton
                onClick={() => handleEditClick(item)}
                aria-label="수정"
              >
                <EditIcon src="/icons/border.svg" alt="수정 아이콘" />
              </EditButton>
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
                <EditButton disabled aria-label="no-action" />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Container>
  );
};

export default ALatest;

// styled-components
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

const EditButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  margin-left: 8px;
  cursor: pointer;
`;

const EditIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`;
