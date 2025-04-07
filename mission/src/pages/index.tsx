/**
 * @module 메인 페이지 (Static Site Generation)
 * @requires SearchableLayout - 검색 기능을 포함한 레이아웃 컴포넌트
 * @requires MovieItem - 영화 카드 컴포넌트
 * @requires fetchMovies, fetchRandomMovies - 영화 데이터 fetch 함수
 *
 * @description
 * 빌드 시점에 정적으로 생성되는 메인 페이지
 * ISR(Incremental Static Regeneration)을 통한 주기적 데이터 갱신
 */

import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import { InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import Head from "next/head";

/**
 * @function getServerSideProps → getStaticProps로 변경 예정
 * @description
 * 빌드 시점에 실행되어 정적 데이터를 생성
 * Promise.all을 사용하여 두 API를 병렬로 호출
 *
 * @returns {Promise<{
 *   props: {
 *     allMovies: MovieData[],
 *     recoMovies: MovieData[]
 *   }
 * }>}
 *
 * @빌드타임_데이터_페칭
 * 1. 전체 영화 목록과 추천 영화 목록을 동시에 가져옴
 * 2. 정적 페이지 생성에 사용될 props 반환
 * 3. revalidate 시간 설정으로 주기적 재생성
 */

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 20,
  };
};

/**
 * @component Home
 * @description
 * 정적으로 생성되는 메인 페이지 컴포넌트
 *
 * @데이터_최신성
 * - ISR을 통한 주기적 데이터 갱신
 * - 캐시된 페이지 즉시 제공 후 백그라운드 갱신
 * - 새로운 데이터가 있을 경우 자동 업데이트
 *
 * @성능최적화
 * - 정적 생성으로 빠른 초기 로딩
 * - 필요한 경우에만 페이지 재생성
 * - SEO 최적화
 */

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 감상하세요"
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
