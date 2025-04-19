"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Searchbar() {
  // 1. 상태 관리 및 라우팅 설정
  const router = useRouter(); // 페이지 이동을 위한 라우터
  const searchParams = useSearchParams(); // URL의 쿼리 파라미터를 읽는 객체
  const [search, setSearch] = useState(""); // 검색어를 저장하는 상태

  // 2. URL 쿼리 파라미터 동기화
  // 페이지가 로드되거나 URL이 변경될 때 실행
  useEffect(() => {
    const q = searchParams.get("q"); // URL에서 q 파라미터 값 추출
    if (q) setSearch(q); // q 값이 있으면 검색창에 표시
  }, [searchParams]);

  // 3. 검색어 입력 처리
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // 입력된 값을 search 상태에 저장
  };

  // 4. 검색 실행
  const onSearch = () => {
    if (search.trim()) {
      // 공백만 있는 경우 제외
      router.push(`/search?q=${search}`); // 검색 결과 페이지로 이동
    }
  };

  // 5. 키보드 이벤트 처리
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Enter 키 입력 시
      onSearch(); // 검색 실행
    }
  };

  return (
    <div>
      {/* 검색 입력창 */}
      <input
        value={search} // 현재 검색어 표시
        onChange={onChangeSearch} // 입력값 변경 처리
        onKeyDown={onKeyDown} // 키보드 입력 처리
      />
      {/* 검색 버튼 */}
      <button>검색</button>
    </div>
  );
}
