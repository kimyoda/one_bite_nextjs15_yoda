import { MovieData } from "@/types";

/**
 * 랜덤 영화 목록을 가져오는 함수
 *
 * @returns Promise<MovieData[]> - 랜덤하게 선택된 영화 배열
 *
 * 함수 역할:
 * - 메인 페이지의 추천 영화 섹션에 표시할 랜덤 영화 목록 조회
 * - 서버로부터 무작위로 선택된 영화 데이터 요청
 *
 * 코드 실행 흐름:
 * 1. 랜덤 영화 조회 API 엔드포인트로 요청
 * 2. 응답 상태 확인 및 에러 처리
 * 3. 정상 응답시 영화 데이터 배열 반환
 * 4. 에러 발생시 빈 배열 반환
 */
export default async function fetchRandomMovies(): Promise<MovieData[]> {
  // 랜덤 영화 목록을 조회하기 위한 API 엔드포인트 URL 설정
  const url = `http://localhost:12345/movie/random`;

  try {
    // fetch API를 사용하여 서버에 GET 요청
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    //  응답 데이터를 JSON 형식으로 파싱하여 반환
    return await response.json();
  } catch (err) {
    // 에러 발생 시 콘솔에 에러 출력 후 빈 배열 반환
    console.error(err);
    return [];
  }
}
