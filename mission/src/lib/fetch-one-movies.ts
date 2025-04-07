/**
 * 단일 영화 정보를 가져오는 함수
 *
 * @param id - 영화의 고유 ID
 * @returns 영화 상세 정보 또는 에러 발생 시 null
 *
 * 함수 역할:
 * - 특정 ID의 영화 상세 정보를 서버 API에서 조회
 * - 에러 처리 및 예외 상황 관리
 *
 * 코드 실행 흐름:
 * 1. ID를 받아 해당 영화의 API URL 생성
 * 2. fetch를 통한 서버 요청
 * 3. 정상 응답시 JSON 데이터 반환
 * 4. 에러 발생시 null 반환 및 에러 로깅
 */
export default async function fetchOneMovie(id: number) {
  const url = `https://onebite-cinema-api-pi.vercel.app/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    // 응답 데이터를 JSON 형식으로 파싱하여 반환
    return await response.json();
  } catch (err) {
    // 에러 발생 시 콘솔에 에러 출력 후 null 반환
    console.error(err);
    return null;
  }
}
