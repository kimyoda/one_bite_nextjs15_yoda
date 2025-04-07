import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movies";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movies";

/**
 * @module 영화 상세 페이지 (Dynamic Routes with SSG)
 * @description
 * 동적 라우팅을 사용하는 영화 상세 페이지
 * getStaticPaths와 getStaticProps를 사용한 정적 생성
 */

/**
 * @function getServerSideProps → getStaticProps로 변경 예정
 * @description
 * 특정 영화의 상세 정보를 가져오는 함수
 *
 * @실행흐름
 * 1. 페이지 요청 시 ID 파라미터 추출
 * 2. ID로 영화 상세 정보 조회
 * 3. props로 데이터 전달
 *
 * @향후_수정사항
 * - getStaticPaths 추가 예정
 * - fallback 전략 구현 예정
 */

/**
 * @component Page
 * @description
 * 영화 상세 정보를 표시하는 컴포넌트
 *
 * @기능
 * - 영화 포스터 및 상세 정보 표시
 * - 에러 상태 처리
 * - 반응형 레이아웃
 *
 * @최적화예정
 * - 이미지 최적화
 * - 메타 태그 추가
 * - 페이지 전환 애니메이션
 */

/**
 * SSG(Static Site Generation)를 위한 데이터 페칭 함수
 * - 빌드 시점에 모든 가능한 경로에 대한 페이지를 미리 생성
 * - SSR 대비 더 나은 성능과 SEO 최적화 제공
 * - 변경사항: getServerSideProps에서 getStaticProps로 변경
 *
 * @param context - Next.js의 정적 생성 컨텍스트
 * @returns 페이지에 필요한 props 객체
 */

/**
 * 동적 라우팅을 위한 경로 생성 함수
 * - 빌드 시점에 생성할 페이지 경로 목록 반환
 * - 모든 가능한 도서 ID에 대한 페이지를 미리 생성
 * - 폴백 옵션 설정으로 미리 생성되지 않은 경로 처리
 *
 * fallback 옵션 설명:
 * - false: 미리 생성되지 않은 경로는 404 페이지로 리다이렉트
 * - blocking: 미리 생성되지 않은 경로는 SSR 방식으로 처리
 * - true: 미리 생성되지 않은 경로는 폴백 상태의 페이지를 먼저 보여주고,
 *         백그라운드에서 페이지를 생성한 후 업데이트
 */

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await fetchMovies(); // ✅ 모든 영화 불러옴
  const paths = movies.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: true, // ✅ fallback true니까 isFallback 체크 가능
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // URL 파라미터에서 뮤비 ID 추출
  const id = context.params!.id;
  // 해당 id의 영화 정보 조회
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  console.log(id);
  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 영화 정보가 없는 경우 에러 메시지 표시
  // fallback 상태: 페이지 컴포넌트가 아직 서버로부터 데이터를 전달받지 못한 상태
  const router = useRouter();
  // 영화 정보가 없는 경우 에러 메시지 표시
  if (router.isFallback) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        로딩중입니다, 잠시만 기다려주세요!
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        문제가 생겼습니다, 다시 시도하세요!
      </div>
    );
  }
  const {
    title,
    subTitle,
    description,
    releaseDate,
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
