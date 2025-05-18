/**
 * 지정된 시간(밀리초) 동안 지연시키는 유틸리티 함수
 * 주로 로딩 상태를 시뮬레이션하거나 API 요청의 지연을 테스트하는데 사용
 * @param ms 지연시킬 시간 (밀리초)
 * @returns Promise<void>
 */
export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
}
