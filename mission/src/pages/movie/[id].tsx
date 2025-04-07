import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movies";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movies";
import Head from "next/head";

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
 * @function getStaticPaths
 * @description
 * 빌드 시점에 생성할 페이지의 경로들을 정의하는 함수
 *
 * @변경사항
 * - 이전: getServerSideProps로 매 요청마다 서버에서 데이터 조회
 * - 현재: getStaticPaths + getStaticProps로 빌드 타임에 정적 페이지 생성
 *
 * @동작방식
 * 1. fetchMovies()로 전체 영화 목록을 가져옴
 * 2. 각 영화의 id를 사용하여 정적 경로 생성
 * 3. fallback: true 설정으로 새로운 영화도 동적 생성 가능
 *
 * @최적화전략
 * - 기존 영화들은 빌드 타임에 미리 생성 → 빠른 응답
 * - 새로운 영화는 최초 요청 시 생성 → 이후 정적 제공
 * - fallback 페이지로 사용자 경험 개선
 */

/**
 * @function getStaticProps
 * @description
 * 각 경로에 대한 페이지 데이터를 생성하는 함수
 *
 * @실행시점
 * 1. 빌드 시 getStaticPaths에서 정의된 모든 경로에 대해 실행
 * 2. fallback: true로 인해 새로운 경로 요청 시에도 실행
 *
 * @동작방식
 * 1. 페이지 파라미터에서 영화 ID 추출
 * 2. fetchOneMovie로 해당 영화 상세 정보 조회
 * 3. 영화가 없는 경우 notFound 페이지 표시
 * 4. 정상적인 경우 props로 영화 정보 전달
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

/**
 * @component Page
 * @description
 * 영화 상세 정보를 표시하는 컴포넌트
 *
 * @fallback처리
 * - router.isFallback으로 로딩 상태 체크
 * - 페이지 생성 중에는 로딩 UI 표시
 * - 페이지 생성 완료 후 자동으로 실제 컨텐츠로 전환
 *
 * @에러처리
 * - 영화 정보 없음: 에러 메시지 표시
 * - 로딩 중: 로딩 메시지 표시
 *
 * @렌더링
 * - 포스터 이미지 (배경 + 실제 이미지)
 * - 영화 제목 및 기본 정보
 * - 부제목 및 상세 설명
 */

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 영화 정보가 없는 경우 에러 메시지 표시
  // fallback 상태: 페이지 컴포넌트가 아직 서버로부터 데이터를 전달받지 못한 상태
  const router = useRouter();
  // 영화 정보가 없는 경우 에러 메시지 표시
  if (router.isFallback) {
    return (
      <>
        <title>한입 시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 감상하세요"
        />
        <div
          style={{ color: "white", textAlign: "center", marginTop: "100px" }}
        >
          로딩중입니다, 잠시만 기다려주세요!
        </div>
      </>
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
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`${subTitle} · ${releaseDate} · ${runtime}분`}
        />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
