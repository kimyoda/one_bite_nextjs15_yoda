import { notFound } from "next/navigation";
import style from "./page.module.css";
import { MovieData, ReviewData } from "@/type";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

// ✅ 새로 추가된 부분: 전체 영화 리스트 기반으로 static 경로 생성
export async function generateStaticParams() {
  // 📌 빌드 타임에 전체 영화 목록을 가져와서 정적 경로로 생성한다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    {
      // 정적 빌드이므로 캐시 허용
      cache: "force-cache",
    }
  );

  if (response.ok) {
    const allMovies: MovieData[] = await response.json();
    // 📌 각 영화 ID를 기반으로 경로 param 생성
    return allMovies.map((el) => ({ id: String(el.id) }));
  }
  // 📌 API 실패 시에도 빌드 오류 방지를 위해 빈 배열 반환
  return [];
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`
    // 무비 페이지는 서버 측 렌더링을 보장해야 하므로 캐시를 사용하지 않는다.
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다!</div>;
  }

  const movie = await response.json();

  const {
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={style.subTitle}>{subTitle}</div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  // API 서버에서 해당 영화의 리뷰 목록을 가져온다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );

  // API 응답이 실패한 경우 에러를 발생시킨다.
  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }

  // 응답 데이터를 ReviewData 타입의 배열로 변환한다.
  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <MovieDetail movieId={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
