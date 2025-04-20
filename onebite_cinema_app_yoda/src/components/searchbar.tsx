"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./searchbar.module.css";

// 검색바 컴포넌트
// - URL 쿼리 파라미터와 동기화된 검색 기능 제공
// - Enter 키 또는 검색 버튼으로 검색 실행
export default function Searchbar() {
  // 1. 상태 관리 및 라우팅 설정
  const router = useRouter(); // 페이지 이동을 위한 라우터
  const searchParams = useSearchParams(); // URL의 쿼리 파라미터를 읽는 객체
  const [search, setSearch] = useState(""); // 검색어를 저장하는 상태

  // 2. URL 쿼리 파라미터 추출
  const q = searchParams.get("q"); // URL에서 q 파라미터 값 추출

  // 3. URL 쿼리 파라미터 동기화
  // 페이지가 로드되거나 URL이 변경될 때 실행
  useEffect(() => {
    setSearch(q || ""); // q 값이 있으면 검색창에 표시, 없으면 빈 문자열
  }, [q]);

  // 4. 검색어 입력 처리
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // 입력된 값을 search 상태에 저장
  };

  // 5. 검색 실행
  const onSubmit = () => {
    if (!search || q === search) return; // 검색어가 비어있거나 현재 검색어와 같으면 중단
    router.push(`/search?q=${search}`); // 검색 결과 페이지로 이동
  };

  // 6. 키보드 이벤트 처리
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Enter 키 입력 시
      onSubmit(); // 검색 실행
    }
  };

  // 7. 컴포넌트 렌더링
  return (
    <div className={style.container}>
      {/* 검색 입력창 */}
      <input
        value={search} // 현재 검색어 표시
        onChange={onChangeSearch} // 입력값 변경 처리
        onKeyDown={onKeyDown} // 키보드 입력 처리
        placeholder="검색어를 입력하세요 ..." // 입력창 힌트 텍스트
      />
      {/* 검색 버튼 */}
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
