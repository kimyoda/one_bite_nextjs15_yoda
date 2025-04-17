// Next.js App Router에서 검색 페이지 컴포넌트
// searchParams는 URL 쿼리 파라미터를 처리하기 위한 Next.js의 내장 기능
// 예: /search?q=검색어 형태의 URL에서 q 파라미터를 추출할 수 있음
export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  // searchParams 객체에서 검색 쿼리 파라미터를 추출
  return <div>Search : {searchParams.q}</div>;
}
