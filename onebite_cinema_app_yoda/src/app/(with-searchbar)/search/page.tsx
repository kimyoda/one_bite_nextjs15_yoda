// 영화 검색 결과를 표시하는 페이지 컴포넌트
import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/type";
import { delay } from "@/util/delay";

// 검색 페이지 컴포넌트
export default async function Page({
  searchParams, // URL의 쿼리 파라미터를 받는 객체
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // 로딩 상태를 시뮬레이션하기 위한 인위적 지연
  await delay(1500);

  // URL에서 검색어 추출
  const { q } = await searchParams;

  // API 서버에 검색 요청을 보내고 결과를 가져옴
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    // 검색 결과를 캐시하여 동일한 검색어에 대한 반복 요청 방지
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다!!</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    // 검색 결과를 그리드 형태로 표시
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
