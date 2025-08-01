// 최종본 (07-17, 15:54)
// src/pages/user/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderVer2 from '../../components/user/HeaderVer2';
import BottomNav from '../../components/user/BottomNav';

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        setMsg('회원가입 성공! 로그인 페이지로 이동합니다.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMsg(data.message || '회원가입 실패');
      }
    } catch (err) {
      console.error('회원가입 오류:', err);
      setMsg('서버 오류');
    }
  };

  return (
    <>
      <HeaderVer2 title="회원가입" />
      <RegisterContainer onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <RegisterButton type="submit">회원가입</RegisterButton>
        {msg && <Message>{msg}</Message>}

        <BottomLinks>
          <span onClick={() => navigate('/login')}>로그인</span>
          <Divider />
          <span onClick={() => alert('아이디 찾기')}>아이디 찾기</span>
          <span>|</span>
          <span onClick={() => alert('비밀번호 찾기')}>비밀번호 찾기</span>
          <Bar />
          <span onClick={() => navigate('/admin-login')}>관리자모드</span>
        </BottomLinks>
      </RegisterContainer>
      <BottomNav />
    </>
  );
}

export default RegisterPage;

const RegisterContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const RegisterButton = styled.button`
  padding: 16px;
  font-size: 16px;
  background-color: #FF2C68;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Message = styled.div`
  font-size: 14px;
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

const BottomLinks = styled.div`
  margin-top: 16px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  color: #666;
  cursor: pointer;
`;

const Divider = styled.span`
  margin: 0 12px;
`;

const Bar = styled.span`
  margin-left: 8px;
  margin-right: 8px;
`;