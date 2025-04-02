import SearchableLayout from "@/components/searchable-layout";

import { ReactNode } from "react";
import movies from "@/mock/movies.json";
import MovieItem from "@/components/movie-item";
import style from "./search-result.module.css";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  const query = typeof q === "string" ? q.toLowerCase() : "";

  const filteredMovies = movies.filter((movie) =>
    `${movie.title}${movie.subTitle}${movie.description}`
      .toLowerCase()
      .includes(query)
  );

  return (
    <div className={style.container}>
      {filteredMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
