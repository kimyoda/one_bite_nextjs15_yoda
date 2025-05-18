import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/type";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { delay } from "@/util/delay";

// 모든 영화를 가져오는 컴포넌트
async function AllMovies() {
  // 로딩 상태를 시뮬레이션하기 위한 인위적 지연
  await delay(1500);

  // API 서버에서 모든 영화 데이터를 가져옴
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" } // 데이터를 강제로 캐시하여 재사용
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다..!</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    // 모든 영화를 그리드 형태로 표시
    <div className={style.all_container}>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

// 추천 영화를 가져오는 컴포넌트
async function RecoMovies() {
  // 추천 영화는 더 긴 로딩 시간을 가짐
  await delay(3000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    // 3초마다 새로고침하여 최신 추천 영화를 표시
    { next: { revalidate: 3 } }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다!</div>;
  }

  const recoMovies: MovieData[] = await response.json();

  return (
    // 추천 영화를 그리드 형태로 표시
    <div className={style.reco_container}>
      {recoMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

// 페이지를 동적으로 렌더링하도록 설정
export const dynamic = "force-dynamic";

// 메인 페이지 컴포넌트
export default function Home() {
  return (
    <div className={style.container}>
      {/* 추천 영화 섹션 */}
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        {/* 로딩 중에는 3x3 스켈레톤 UI 표시 */}
        <Suspense fallback={<MovieListSkeleton numCol={3} count={3} />}>
          <RecoMovies />
        </Suspense>
      </section>

      {/* 전체 영화 섹션 */}
      <section>
        <h3>등록된 모든 영화</h3>
        {/* 로딩 중에는 5x15 스켈레톤 UI 표시 */}
        <Suspense fallback={<MovieListSkeleton numCol={5} count={15} />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
