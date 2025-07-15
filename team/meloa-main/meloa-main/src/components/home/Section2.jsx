import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePlayer } from "../../components/user/Player";
import { dummyPopularMusic } from "../../data/dummyPopularMusic";
// import { fetchPopularMusic } from "../../data/dummyPopularMusic"; // 백엔드 연동 시

const Section2 = () => {
  const navigate = useNavigate();
  const { setCurrentTrack, setIsPlaying } = usePlayer();
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    // 백엔드 연동 시 아래 코드 주석 해제
    /*
    const fetchTopTracks = async () => {
      const data = await fetchPopularMusic();
      setTopTracks(data.slice(0, 3));
    };
    fetchTopTracks();
    */

    // 임시 데이터 사용
    setTopTracks(dummyPopularMusic.slice(0, 3));
  }, []);

  const goToBestPage = () => {
    navigate("/best");
  };

  const goToMusicDetail = (track) => {
    if (!track.id) return;
    navigate(`/music-detail/${track.id}`);
  };

  const displayTracks = [...topTracks];
  while (displayTracks.length < 3) {
    displayTracks.push({});
  }

  return (
    <SectionContainer>
      <HeaderRow>
        <TitleButton onClick={goToBestPage}>인기차트</TitleButton>
        <MoreButton onClick={goToBestPage} aria-label="Go to Best Chart Page">
          &gt;
        </MoreButton>
      </HeaderRow>

      <TrackList>
        {displayTracks.map((item, idx) => {
          const isEmpty = !item.id;
          return (
            <TrackItem key={idx}>
              <Rank>{idx + 1}</Rank>

              {isEmpty ? (
                <>
                  <EmptyAlbumBox />
                  <TrackInfo>
                    <EmptyTrackTitle />
                    <EmptyTrackArtist />
                  </TrackInfo>
                </>
              ) : (
                <ClickableArea onClick={() => goToMusicDetail(item)}>
                  <AlbumImage src={item.image} alt={item.title} />
                  <TrackInfo>
                    <TrackTitle>{item.title}</TrackTitle>
                    <TrackArtist>{item.artist}</TrackArtist>
                  </TrackInfo>
                </ClickableArea>
              )}

              <PlayButton
                onClick={() => {
                  if (!isEmpty) {
                    setCurrentTrack(item);
                    setIsPlaying(true);
                  }
                }}
              >
                <PlayIcon src="/icons/play_button.svg" alt="Play" />
              </PlayButton>
            </TrackItem>
          );
        })}
      </TrackList>
    </SectionContainer>
  );
};

// 아래 스타일은 이전과 동일
const SectionContainer = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  padding: 16px;
  background-color: white;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const TitleButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MoreButton = styled.button`
  font-size: 20px;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #1f2937;
  }
`;

const TrackList = styled.div`
  border-top: 1px solid #e5e7eb;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
`;

const Rank = styled.span`
  width: 24px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #6b7280;
`;

const TrackTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClickableArea = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;

  &:hover ${TrackTitle} {
    text-decoration: underline;
  }
`;

const AlbumImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  margin: 0 8px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrackArtist = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

const PlayIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`;

const EmptyAlbumBox = styled.div`
  width: 48px;
  height: 48px;
  background-color: #e5e7eb;
  border-radius: 6px;
  margin: 0 8px;
`;

const EmptyTrackTitle = styled.div`
  width: 120px;
  height: 16px;
  background-color: #e5e7eb;
  margin-bottom: 4px;
  border-radius: 4px;
`;

const EmptyTrackArtist = styled.div`
  width: 80px;
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 4px;
`;

export default Section2;
