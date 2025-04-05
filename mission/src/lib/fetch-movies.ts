import { MovieData } from "@/types";

// 영화 데이터를 가져오는 함수
// 1. 검색어(q)가 없을 경우: 전체 영화 목록을 가져옴
// 2. 검색어(q)가 있을 경우: 검색어에 해당하는 영화들만 가져옴
// @param q - 검색어 (선택적 매개변수)
// @returns Promise<MovieData[]> - 영화 데이터 배열을 반환
export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = `http://localhost:12345/movie/`;

  // 검색어가 있는 경우 검색 쿼리 파라미터를 추가한다.
  if (q) {
    url = `http://localhost:12345/movie/search?q=${encodeURIComponent(q)}`;
  }

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
