// src/components/admin/AHeader.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function AHeader({ uploads, setUploads, isAuthPage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [uploading, setUploading] = useState(false);

  // 관리자 업로드 페이지 경로 체크
  const isUploadPage = ["/admin/upload", "/admin/upload/detail"].includes(location.pathname);

  // 유저 로그인 페이지 경로 체크 (필요하면 경로 추가)
  const isUserLoginPage = location.pathname === "/login";

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUploadClick = () => {
    setUploading(true);

    const newUpload = {
      id: uploads.length + 1,
      title: "새로운 노래",
      artist: "아티스트 이름",
      price: 4500,
      imageUrl: "https://placehold.co/80x80?text=새앨범",
      uploadedAt: new Date().toISOString(),
    };

    setUploads([...uploads, newUpload]);

    alert("업로드 완료! (임시 저장)");

    setUploading(false);

    navigate("/admin/upload/detail");
  };

  const handleMyPageClick = () => {
    navigate("/admin/info");
  };

  return (
    <HeaderContainer>
      {isUploadPage ? (
        <>
          <LeftGroup>
            <BackButton onClick={handleBackClick}>뒤로가기</BackButton>
          </LeftGroup>

          <CenterGroup>
            <UploadTitle>업로드</UploadTitle>
          </CenterGroup>

          <RightGroup>
            <UploadButton onClick={handleUploadClick} disabled={uploading}>
              {uploading ? "업로드 중..." : "업로드"}
            </UploadButton>
          </RightGroup>
        </>
      ) : (
        <>
          <LeftGroup>
            <LogoGroup to="/admin">
              <MainText>Meloa</MainText>
              <SubText>관리자버전</SubText>
            </LogoGroup>
          </LeftGroup>

          {/* 유저 로그인 페이지일 때는 우측 버튼 숨기기 */}
          {!isUploadPage && !isUserLoginPage && (
            <RightGroup>
              {isAuthPage ? (
                <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
              ) : (
                <IconButton onClick={handleMyPageClick} title="마이페이지">
                  <FaUser size={20} />
                </IconButton>
              )}
            </RightGroup>
          )}
        </>
      )}
    </HeaderContainer>
  );
}

// styled components

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between; /* 좌우 끝 배치 */
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  font-family: 'Noto Sans', sans-serif;
  gap: 12px;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CenterGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  background-color: #ff2c68;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #e02258;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #ff2c68;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  padding: 4px 8px;

  &:hover {
    color: #ff2c68;
  }
`;

const UploadTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #ff2c68;
`;

const UploadButton = styled.button`
  background-color: #ff2c68;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    background-color: #f9a9be;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #e02258;
  }
`;

const LogoGroup = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
`;

const MainText = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #ff2c68;
`;

const SubText = styled.span`
  font-size: 14px;
  color: black;
  align-self: flex-end;
  padding-bottom: 2px;
`;
