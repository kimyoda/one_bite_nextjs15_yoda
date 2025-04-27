import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import movies from "@/dummy.json";
import { MovieData } from "@/type";

// 모든 영화를 가져오는 컴포넌트
async function AllMovies() {
  // API 서버에서 모든 영화 데이터를 가져온다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    // 모든 영화 리스트는 항상 최신 상태를 유지해야 하므로 캐싱을 하지 않는다.
    { cache: "no-store" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다..!</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    // 해당 div에 직접 grid 스타일 클래스 적용
    <div className={style.all_container}>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

// 추천 영화를 가져오는 컴포넌트
async function RecoMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    // 3초마다 새로고침, 추천 영화는 실시간 변동성이 높기 때문에 짧은 주기로 갱신한다
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다!</div>;
  }

  const recoMovies: MovieData[] = await response.json();

  return (
    <div className={style.reco_container}>
      {recoMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>

        <RecoMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        {/* ✅ 여기엔 따로 div 감싸지 않고 컴포넌트 그대로 호출 */}
        {/* AllMovies 내부에서 직접 grid를 적용하고 있으므로 불필요 */}
        <AllMovies />
      </section>
    </div>
  );
}
