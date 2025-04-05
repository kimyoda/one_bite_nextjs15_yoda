import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

/**
 * @component MovieItem
 * @description 영화 정보를 카드 형태로 보여주는 컴포넌트
 *
 * @param {Object} props - 영화 정보 props
 * @param {number} props.id - 영화의 고유 ID
 * @param {string} props.posterImgUrl - 영화 포스터 이미지 URL
 * @param {string} props.title - 영화 제목 (alt 텍스트용)
 */
export default function MovieItem({
  id,
  posterImgUrl,
  title,
}: Pick<MovieData, "id" | "posterImgUrl" | "title">) {
  return (
    <Link className={style.movieItem} href={`/movie/${id}`}>
      <img src={posterImgUrl} alt={title} />
      <div>{title}</div>
    </Link>
  );
}
