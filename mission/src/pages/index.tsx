import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import movies from "@/mock/movies.json";

//  랜덤 섞는 함수
const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function Home() {
  return (
    <div className={style.container}>
      <section className={style.recommend_movie_section}>
        <h3>지금 가장 추천하는 영화</h3>
        <div>
          {shuffle(movies)
            .slice(0, 3)
            .map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
      </section>
      <section className={style.every_section}>
        <h3>등록된 모든 영화</h3>
        <div>
          {movies.map((movie) => (
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
