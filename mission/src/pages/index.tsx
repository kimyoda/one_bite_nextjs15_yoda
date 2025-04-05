/**
 * @module 메인 페이지
 * @requires SearchableLayout - 검색 기능을 포함한 레이아웃 컴포넌트
 * @requires MovieItem - 영화 정보를 표시하는 카드 컴포넌트
 * @requires fetchMovies - 전체 영화 목록을 가져오는 API 함수
 * @requires fetchRandomMovies - 랜덤 영화 목록을 가져오는 API 함수
 */

import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import { InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";

/**
 * @description
 * 메인 페이지의 서버 사이드 데이터 페칭을 담당하는 함수
 * Promise.all을 사용하여 두 개의 API를 병렬로 호출
 *
 * @returns {Promise<{
 *   props: {
 *     allMovies: MovieData[],
 *     recoMovies: MovieData[]
 *   }
 * }>}
 */

export const getServerSideProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  };
};

/**
 * @component Home
 * @description
 * 메인 페이지 컴포넌트
 * 두 개의 주요 섹션으로 구성:
 * 1. 추천 영화 섹션 - 랜덤하게 선택된 영화 표시
 * 2. 전체 영화 섹션 - 등록된 모든 영화 표시
 *
 * @실행흐름
 * 1. getServerSideProps에서 영화 데이터 페칭
 * 2. 받아온 데이터를 props로 전달
 * 3. 두 개의 섹션으로 구분하여 영화 목록 렌더링
 * 4. SearchableLayout으로 전체 페이지 래핑
 *
 * @에러처리
 * - 데이터 페칭 실패 시 빈 배열 반환
 * - map 함수 사용 시 key prop으로 고유값 설정
 */

export default function Home({
  allMovies,
  recoMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section className={style.recommend_movie_section}>
        <h3>지금 가장 추천하는 영화</h3>
        <div>
          {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section className={style.every_section}>
        <h3>등록된 모든 영화</h3>
        <div>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
