import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movies";

/**
 * @module 영화 상세 페이지
 * @requires fetchOneMovie - 단일 영화 정보를 가져오는 API 함수
 * @requires style - 페이지 스타일 모듈
 */

/**
 * @function getServerSideProps
 * @description
 * URL 파라미터에서 영화 ID를 추출하여 상세 정보를 조회하는 함수
 *
 * @param {GetServerSidePropsContext} context - Next.js의 서버 사이드 컨텍스트
 * @returns {Promise<{ props: { movie: MovieData | null } }>}
 */

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // URL 파라미터에서 영화 ID 추출
  const id = context.params!.id;

  const movie = await fetchOneMovie(Number(id));

  console.log(id);
  return {
    props: {
      movie,
    },
  };
};

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /**
   * @component Page
   * @description
   * 영화의 상세 정보를 표시하는 페이지 컴포넌트
   * 포스터, 제목, 개봉일, 장르 등 상세 정보 표시
   *
   * @실행흐름
   * 1. URL 파라미터에서 영화 ID 추출
   * 2. ID로 영화 상세 정보 조회
   * 3. 데이터 존재 여부 확인
   * 4. 영화 정보 구조 분해 할당
   * 5. 스타일이 적용된 레이아웃으로 정보 표시
   *
   * @에러처리
   * - 영화 정보가 없을 경우 에러 메시지 표시
   * - 옵셔널 체이닝으로 누락된 데이터 처리
   */
  // 영화 정보가 없는 경우 에러 메시지 표시
  if (!movie) {
    return "문제가 발생했습니다, 다시 시도해주세요!";
  }
  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.releaseDate}>
        {releaseDate} / {genres?.join(", ")} / {runtime}분
      </div>
      <br />
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
