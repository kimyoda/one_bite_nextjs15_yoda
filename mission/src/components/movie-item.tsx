import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

export default function MovieItem({
  id,
  title,
  releaseDate,
  company,
  genres,
  subTitle,
  description,
  runtime,
  posterImgUrl,
}): MovieData {
  return (
    <Link className={style.movieItem} href={`/movie/${id}`}>
      <img src={posterImgUrl} />
      <div></div>
    </Link>
  );
}
