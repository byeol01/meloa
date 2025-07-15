// src/components/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AHeader from "./AHeader";
import ABottomNav from "./ABottomNav";
import { PlayerProvider } from "../user/Player";

export default function AdminLayout() {
  // 업로드 데이터 상태를 AdminLayout에서 관리
  const [uploads, setUploads] = useState([
    {
      id: 1,
      uploadedAt: "2025-06-15T10:00:00Z",
      title: "노래1",
      artist: "가수1",
      price: 5000,
      imageUrl: "https://placehold.co/80x80?text=앨범1",
    },
  ]);

  return (
    <PlayerProvider>
      <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
        {/* uploads, setUploads를 AHeader와 Outlet에 props로 넘김 */}
        <AHeader uploads={uploads} setUploads={setUploads} />
        <main className="flex-grow">
          <Outlet context={{ uploads, setUploads }} />
        </main>
        <ABottomNav />
      </div>
    </PlayerProvider>
  );
}
