import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/type";

export default async function Page({
  searchParams, // URL의 쿼리 파라미터를 받는 객체
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // 검색어 초출
  const { q } = await searchParams;

  // API 서버에 검색 요청을 보내고 결과를 가져온다
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다!!</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
