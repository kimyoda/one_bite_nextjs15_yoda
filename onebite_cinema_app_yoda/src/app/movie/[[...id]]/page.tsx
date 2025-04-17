// Next.js App Router에서 동적 라우팅을 위한 페이지 컴포넌트
// [[...id]] 폴더 구조는 선택적 캐치-올(catch-all) 라우트를 의미
// 이는 /movie, /movie/123, /movie/123/456 등 모든 경로를 처리할 수 있음

// params 타입이 Promise에서 일반 객체로 변경됨
// Next.js 13+에서는 params가 자동으로 Promise를 해결해주므로 await가 필요 없음
export default function Page({ params }: { params: { id: string } }) {
  // params 객체에서 동적 라우트 파라미터를 추출
  return (
    <div>
      {/* 구분선 스타일링: 상단에 2px 두께의 회색 선 추가 */}
      <div style={{ borderTop: "2px solid #333", margin: "20px 0" }}> </div>
      {/* 동적 라우트 파라미터 id를 화면에 표시 */}
      <div>movie : {params.id}</div>
    </div>
  );
}
