import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { PlayerProvider } from "../components/user/Player";

// 유저 페이지 & 컴포넌트
import UserLayout from "../components/user/UserLayout";
import Home from "../pages/user/HomeP";
import LoginP from "../pages/user/LoginP";
import SignupP from "../pages/user/SignupP";
import Mypage from "../pages/user/Mypage";
import Like from "../pages/user/LikeP";
import Latest from "../pages/user/LatestP";
import Best from "../pages/user/BestP";
import CartP from "../pages/user/CartP";
import PassP from "../pages/user/PassP";
import PayP from "../pages/user/PayP";
import List from "../pages/user/List";
import MusicDetailP from "../pages/user/MusicDetailP";
import DetailP from "../pages/user/DetailP";

// 관리자 페이지
import AdminLogin from "../pages/admin/admin";
import AdminLayout from "../components/admin/AdminLayout";
import AHome from "../pages/admin/AHome";
import AAdmin from "../pages/admin/AAdmin";
import AMusicDetailP from "../pages/admin/AMusicDetailP";
import AUpDetail from "../pages/admin/AUpDetail";
import AUp from "../pages/admin/AUp";
import ABest from "../pages/admin/ABest";
import ALatest from "../pages/admin/ALatest";

function Router() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            {/* 유저 라우팅 */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginP />} />
              <Route path="/signup" element={<SignupP />} />
              <Route path="/pass" element={<PassP />} />
              <Route path="/cart" element={<CartP />} />
              <Route path="/pay" element={<PayP />} />
              <Route path="/like" element={<Like />} />
              <Route path="/latest" element={<Latest />} />
              <Route path="/best" element={<Best />} />
              <Route path="/list" element={<List />} />
              <Route path="/music-detail/:id" element={<MusicDetailP />} />
              <Route path="/music/:id" element={<MusicDetailP />} />
              <Route path="/playlist/:id" element={<DetailP />} />
              <Route path="/user/detail/:id" element={<DetailP />} />

              <Route
                path="/mypage"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Mypage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 관리자 로그인 */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* 관리자 라우팅 (보호된 라우트) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AHome />} />
              <Route path="info" element={<AAdmin />} />
              <Route path="music-detail/:id" element={<AMusicDetailP />} />
              <Route path="upload" element={<AUp />} />
              <Route path="upload-list" element={<AUpDetail />} />
              <Route path="upload/detail" element={<AUpDetail />} />
              <Route path="best" element={<ABest />} />
              <Route path="latest" element={<ALatest />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default Router;
