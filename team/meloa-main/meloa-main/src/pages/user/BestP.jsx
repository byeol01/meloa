import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePlayer } from "../../components/user/Player";
import { dummyPopularMusic } from "../../data/dummyPopularMusic";
// import { fetchPopularMusic } from "../../data/dummyPopularMusic"; // 백엔드 연동 시

const BestP = () => {
  const { setCurrentTrack, setIsPlaying } = usePlayer();
  const navigate = useNavigate();
  const [musicData, setMusicData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // 백엔드 연동 시 아래 코드 주석 해제
    /*
    const fetchData = async () => {
      const data = await fetchPopularMusic();
      setMusicData(data);
    };
    fetchData();
    */

    // 임시 데이터 사용
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

  return (
    <Container>
      <Header>
        <Title>인기차트</Title>
        <Time>{currentTime}</Time>
      </Header>

      <List>
        {musicData.map((item, index) => (
          <ListItem
            key={item.id}
            onClick={() => navigate(`/music-detail/${item.id}`)}
            tabIndex={0}
          >
            <Rank>{index + 1}</Rank>
            <Thumbnail src={item.image} alt={`${item.title} 앨범 이미지`} />
            <Info>
              <SongTitle>{item.title}</SongTitle>
              <Artist>{item.artist}</Artist>
            </Info>
            <PlayButton
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTrack(item);
                setIsPlaying(true);
              }}
            >
              <PlayIcon src="/icons/play_button.svg" alt="Play" />
            </PlayButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};


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

const Rank = styled.span`
  width: 24px;
  font-size: 14px;
  text-align: center;
  color: #6b7280;
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

export default BestP;
