import React from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // 🔸 logout 가져오기

  // 임시 관리자 정보
  const admin = {
    id: "admin001",
    name: "Meloa 관리자",
    profileImage: "https://placehold.co/100x100?text=ADMIN",
  };

  const handleLogout = () => {
    logout(); // 로그아웃
    navigate("/admin/login"); // 로그인 페이지로 이동
  };

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImage src={admin.profileImage} alt="관리자 프로필" />
      </ProfileSection>
      <Divider />
      <InfoText>아이디: {admin.id}</InfoText>
      <Divider />
      <InfoText>이름: {admin.name}</InfoText>
      <Divider />
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </Wrapper>
  );
}

// 스타일
const Wrapper = styled.div`
  padding: 32px;
  max-width: 400px;
  margin: 80px auto;
  background-color: #fafafa;
  border-radius: 12px;
  border: 1px solid #ddd;
  text-align: center;
`;

const ProfileSection = styled.div`
  margin-bottom: 16px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
`;

const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid #eee;
`;

const InfoText = styled.div`
  font-size: 16px;
  color: #333;
`;

const LogoutButton = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color: #7f8690;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: #6c737d;
  }
`;
