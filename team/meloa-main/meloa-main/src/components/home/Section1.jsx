import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; // ✅ 백엔드 연동 시 사용
import { dummyPopularMusic } from "../../data/dummyPopularMusic";

const GAP_PX = 16;

const Section1 = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [musicData, setMusicData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔁 1. 백엔드 연동 방식
    /*
    const fetchMusicData = async () => {
      try {
        const res = await axios.get("/api/popular-music/latest"); // ⚙️ 실제 API 경로로 교체
        // 서버에서 최신순으로 데이터를 받아온다고 가정
        setMusicData(res.data);
      } catch (err) {
        console.error("최신 음악 데이터 불러오기 실패:", err);
      }
    };
    fetchMusicData();
    */

    // ✅ 2. 임시 데이터 (개발 중 UI 확인용)
    const sortedLatest = [...dummyPopularMusic].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
    setMusicData(sortedLatest);
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const onScroll = () => {
      const slide = scrollEl.firstChild;
      if (!slide) return;
      const slideWidth = slide.getBoundingClientRect().width + GAP_PX;
      const index = Math.round(scrollEl.scrollLeft / slideWidth);
      setActiveIndex(Math.max(0, Math.min(index, musicData.length - 1)));
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [musicData]);

  const scrollToIndex = (idx) => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const slide = scrollEl.firstChild;
    if (!slide) return;

    const slideWidth = slide.getBoundingClientRect().width + GAP_PX;
    const containerWidth = scrollEl.clientWidth;

    let targetScroll = slideWidth * idx - (containerWidth - slideWidth) / 2;
    const maxScroll = scrollEl.scrollWidth - containerWidth;
    if (targetScroll > maxScroll) targetScroll = maxScroll;
    if (targetScroll < 0) targetScroll = 0;

    scrollEl.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const handleNavigation = () => {
    navigate("/latest");
  };

  return (
    <Container>
      <HeaderRow>
        <TitleButton onClick={handleNavigation}>최신 음악</TitleButton>
        <MoreButton onClick={handleNavigation} aria-label="Go to latest music page">
          &gt;
        </MoreButton>
      </HeaderRow>

      <Slider ref={scrollRef}>
        {musicData.length > 0 ? (
          musicData.map((item, idx) => (
            <SlideItem
              key={`${item.id}-${idx}`}
              onClick={() => navigate(`/music-detail/${item.id}`, { state: item })} // 클릭 시 MusicDetailP.jsx로 이동 (경로 수정됨)
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(`/music-detail/${item.id}`, { state: item });
              }}
            >
              <SlideImage src={item.image} alt={`${item.title} 앨범 이미지`} />
            </SlideItem>
          ))
        ) : (
          <SlideItem>
            <EmptyBox />
          </SlideItem>
        )}
      </Slider>

      <IndicatorWrapper>
        {musicData.length > 0 &&
          musicData.map((_, idx) => (
            <Dot
              key={idx}
              $active={activeIndex === idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
      </IndicatorWrapper>
    </Container>
  );
};




const Container = styled.div`
  width: 100%;
  max-width: 900px;
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

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: ${GAP_PX}px;
  padding-bottom: 12px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 반응형 처리 : 최소 360px, 최대 600px 크기에서 자연스럽게 변화
const SlideItem = styled.div`
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  outline: none;

  width: calc((100vw - ${GAP_PX * 1.5}px) / 2.5);
  max-width: 360px;  /* 최대 크기 고정 */
  min-width: 140px;  /* 최소 크기 설정 */

  @media (min-width: 900px) {
    width: calc((100vw - ${GAP_PX * 3}px) / 3.5);
    max-width: 450px; /* 900px 이상일 때 최대 크기 조금 더 키움 */
  }

  &:focus {
    box-shadow: 0 0 0 3px #3b82f6;
  }
`;


const SlideImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e5e7eb;
  border-radius: 10px;
`;

const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  background-color: ${({ $active }) => ($active ? "#2563eb" : "#cbd5e1")};
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

export default Section1;
