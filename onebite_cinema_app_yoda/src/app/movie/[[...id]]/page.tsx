// Next.js App Router에서 동적 라우팅을 위한 페이지 컴포넌트
// [[...id]] 폴더 구조는 선택적 캐치-올(catch-all) 라우트를 의미
// 이는 /movie, /movie/123, /movie/123/456 등 모든 경로를 처리할 수 있음
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params 객체에서 동적 라우트 파라미터를 추출
  const { id } = await params;
  return <div>movie/ [id] 페이지 </div>;
}
