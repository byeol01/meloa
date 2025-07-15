// src/pages/admin/AUpDetail.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const dummyUploads = [
  {
    id: 1,
    uploadedAt: "2025-06-15T10:00:00Z",
    title: "노래1",
    artist: "가수1",
    price: 5000,
    imageUrl: "https://placehold.co/80x80?text=앨범1",
  },
  {
    id: 2,
    uploadedAt: "2025-06-02T12:30:00Z",
    title: "노래2",
    artist: "가수2",
    price: 3000,
    imageUrl: "https://placehold.co/80x80?text=앨범2",
  },
  {
    id: 3,
    uploadedAt: "2025-05-01T09:15:00Z",
    title: "노래3",
    artist: "가수3",
    price: 4000,
    imageUrl: "https://placehold.co/80x80?text=앨범3",
  },
];

function AUpDetail({ uploads }) {
  const navigate = useNavigate();

  const [filteredUploads, setFilteredUploads] = useState([]);

  useEffect(() => {
    const sourceUploads = Array.isArray(uploads) ? uploads : dummyUploads;

    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - 30);

    const filtered = sourceUploads.filter((item) => {
      const uploadedDate = new Date(item.uploadedAt);
      return uploadedDate >= cutoffDate;
    });

    setFilteredUploads(filtered);
  }, [uploads]);

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (item) => {
    navigate("/admin/upload", { state: { upload: item } });
  };

  return (
    <Container>
      <HeaderText>최근 30일 이내에 업로드 한 목록만 보여집니다</HeaderText>
      <Divider />
      {filteredUploads.length === 0 ? (
        <NoData>최근 30일 이내 업로드된 파일이 없습니다.</NoData>
      ) : (
        <Table>
          <thead>
            <tr>
              <ThCheck>
                <input type="checkbox" />
              </ThCheck>
              {/* 앨범 이미지 헤더 삭제 */}
              <Th>곡정보</Th>
              <Th>가격</Th>
              <Th>수정</Th>
            </tr>
          </thead>
          <tbody>
            {filteredUploads.map((item) => (
              <Tr key={item.id}>
                <TdCheck>
                  <input type="checkbox" />
                </TdCheck>
                {/* 이미지 + 텍스트 같이 한 셀에 */}
                <TdInfo>
                  <AlbumImage src={item.imageUrl} alt={`${item.title} 앨범 이미지`} />
                  <div>
                    <Title>{item.title}</Title>
                    <Artist>{item.artist}</Artist>
                  </div>
                </TdInfo>
                <TdPrice>{item.price.toLocaleString()}원</TdPrice>
                <TdEdit>
                  <IconButton onClick={() => handleEditClick(item)}>
                    <img src="/icons/border.svg" alt="수정 아이콘" />
                  </IconButton>
                </TdEdit>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AUpDetail;

// styled components

const Container = styled.div`
  max-width: 600px;
  min-width: 360px;
  width: 90vw; /* 화면 너비의 90% 차지 */
  padding: 24px 16px;
  background-color: #fff;
  font-family: "Noto Sans", sans-serif;
`;

const HeaderText = styled.h2`
  color: #ff2c68;
  font-weight: 700;
  font-size: clamp(14px, 4vw, 24px);
  margin-bottom: 8px;
  border-bottom: 2px solid #ff2c68;
  padding-bottom: 6px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

const NoData = styled.div`
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 40px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th`
  text-align: end;
  padding: 12px 10px;
  font-weight: 600;
  font-size: clamp(12px, 2.5vw, 14px);
  color: #555;
  border-bottom: 2px solid #eee;
  user-select: none;
`;

const ThCheck = styled(Th)`
  width: 40px;
  text-align: center;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fff0f5;
  }
`;

const TdCheck = styled.td`
  width: 40px;
  text-align: center;
  padding: 12px 10px;
`;

const TdInfo = styled.td`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AlbumImage = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const TdPrice = styled.td`
  width: 100px;
  padding: 12px 10px;
  font-weight: 600;
  text-align: right;
  color: #ff2c68;
  font-size: clamp(12px, 2.5vw, 16px);
`;

const TdEdit = styled.td`
  width: 60px;
  padding: 12px 10px;
  text-align: right; /* 아이콘을 오른쪽 끝으로 정렬 */
  vertical-align: middle;
`;


const Title = styled.div`
  font-weight: 700;
  font-size: clamp(14px, 3vw, 18px);
  color: #222;
`;

const Artist = styled.div`
  margin-top: 4px;
  color: #666;
  font-size: clamp(10px, 2.5vw, 14px);
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;

  img {
    width: clamp(18px, 4vw, 24px);  /* 최소 18px, 최대 24px */
    height: clamp(18px, 4vw, 24px);
    object-fit: contain;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

