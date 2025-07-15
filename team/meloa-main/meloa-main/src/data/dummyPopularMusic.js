// 📁 src/data/dummyPopularMusic.js

// ✅ 백엔드 연동 시 아래 코드 주석 해제해서 사용하세요
// import axios from "axios";

// export const fetchPopularMusic = async () => {
//   try {
//     const response = await axios.get("/api/music/best");
//     return response.data;
//   } catch (error) {
//     console.error("인기 음악 데이터를 불러오는 데 실패했습니다:", error);
//     return [];
//   }
// };

// ✅ UI 구현용 임시 데이터
// 임시 데이터 (모든 페이지에서 공유 가능)
export const dummyPopularMusic = [
  {
    id: 1,
    title: "임시 인기 음악 1",
    artist: "가수 A",
    image: "https://placehold.co/48x48",
    src: "/audios/sample1.mp3",
    uploadedAt: "2025-07-13T10:00:00Z",
    plays: 100,
  },
  {
    id: 2,
    title: "임시 인기 음악 2",
    artist: "가수 B",
    image: "https://placehold.co/48x48",
    src: "/audios/sample2.mp3",
    uploadedAt: "2025-07-12T09:00:00Z",
    plays: 150,
  },
  {
    id: 3,
    title: "임시 인기 음악 3",
    artist: "가수 C",
    image: "https://placehold.co/48x48",
    src: "/audios/sample3.mp3",
    uploadedAt: "2025-07-14T09:00:00Z",
    plays: 130,
  },
];

// ✅ 백엔드 연동 준비 함수 (주석만 해제하면 작동)
export const fetchPopularMusic = async () => {
  try {
    const res = await fetch("/api/music/popular"); // 예시 API
    if (!res.ok) throw new Error("네트워크 오류");
    return await res.json();
  } catch (err) {
    console.error("인기 음악 불러오기 실패:", err);
    return [];
  }
};
