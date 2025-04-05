import SearchableLayout from "@/components/searchable-layout";

import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from "./search-result.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";

/**
 * @module 검색 결과 페이지
 * @requires SearchableLayout - 검색 기능을 포함한 레이아웃 컴포넌트
 * @requires MovieItem - 영화 정보를 표시하는 카드 컴포넌트
 * @requires fetchMovies - 검색 기능이 포함된 영화 조회 API 함수
 */

/**
 * @function getServerSideProps
 * @description
 * URL의 쿼리 파라미터에서 검색어를 추출하여 영화를 검색하는 함수
 *
 * @param {GetServerSidePropsContext} context - Next.js의 서버 사이드 컨텍스트
 * @returns {Promise<{ props: { searchedMovies: MovieData[] } }>}
 */

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // URL 쿼리 파라미터에서 검색어 추출
  const q = context.query.q;
  // 검색어를 사용하여 영화 목록 조회
  const searchedMovies = await fetchMovies(q as string);
  return {
    props: {
      searchedMovies,
    },
  };
};

/**
 * @component Page
 * @description
 * 검색 결과를 표시하는 페이지 컴포넌트
 * 검색 결과 유무에 따라 다른 UI 표시
 *
 * @실행흐름
 * 1. URL 쿼리에서 검색어(q) 추출
 * 2. 검색어로 영화 검색 API 호출
 * 3. 검색 결과 존재 여부 확인
 * 4. 조건부 렌더링으로 결과 또는 메시지 표시
 *
 * @에러처리
 * - 검색 결과가 없을 경우 안내 메시지 표시
 * - 데이터 페칭 실패 시 빈 배열 처리
 */

export default function Page({
  searchedMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 영화가 없을 경우
  const hasResultsMovies = searchedMovies.length > 0;
  //
  return (
    <div className={style.container}>
      {!hasResultsMovies ? (
        <p className={style.no_result}>해당 영화는 존재하지 않습니다.</p>
      ) : (
        searchedMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)
      )}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
