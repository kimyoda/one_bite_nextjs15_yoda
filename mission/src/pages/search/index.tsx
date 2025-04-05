import SearchableLayout from "@/components/searchable-layout";

import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from "./search-result.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import { useRouter } from "next/router";

/**
 * @module 검색 결과 페이지 (Server-Side Rendering)
 * @requires SearchableLayout - 검색 기능 컴포넌트
 * @requires MovieItem - 영화 카드 컴포넌트
 *
 * @description
 * 검색어에 따라 실시간으로 결과를 보여주는 페이지
 * SSR을 사용하여 매 요청마다 새로운 검색 결과 제공
 */

/**
 * @function getServerSideProps
 * @description
 * 매 요청마다 서버에서 실행되어 검색 결과를 제공
 *
 * @실행흐름
 * 1. 클라이언트 검색 요청 수신
 * 2. 서버에서 검색어로 API 호출
 * 3. 결과를 포함한 HTML 생성
 * 4. 클라이언트에 전송
 *
 * @SEO
 * - 검색 결과가 초기 HTML에 포함
 * - 검색 엔진 크롤링 최적화
 */

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   // URL 쿼리 파라미터에서 검색어 추출
//   const q = context.query.q;
//   // 검색어를 사용하여 영화 목록 조회
//   const searchedMovies = await fetchMovies(q as string);
//   return {
//     props: {
//       searchedMovies,
//     },
//   };
// };

/**
 * @component Page
 * @description
 * 검색 결과를 표시하는 컴포넌트
 *
 * @기능
 * - 검색 결과 유무에 따른 조건부 렌더링
 * - 결과 없을 경우 안내 메시지 표시
 * - MovieItem 컴포넌트로 검색 결과 표시
 */

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  // Next.js 라우터를 사용하여 URL 쿼리 파라미터 접근
  const router = useRouter();
  const q = router.query.q;
  /**
   * 검색어를 사용하여 영화 목록을 가져오는 함수
   * - 클라이언트 사이드에서 API 호출
   * - 검색 결과를 상태에 저장
   * - 변경사항: 서버 사이드에서 클라이언트 사이드로 이동
   */
  const fetchSearchedResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  // 검색어가 변경될 때마다 검색 결과를 업데이트
  useEffect(() => {
    if (q) {
      // 검색어가 있는 경우에만 검색 실행
      fetchSearchedResult();
    }
  }, [q]);

  {
    return (
      <div className={style.container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    );
  }
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
