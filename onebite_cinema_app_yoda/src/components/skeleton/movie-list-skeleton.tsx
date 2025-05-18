// 영화 목록의 로딩 상태를 표시하는 스켈레톤 컴포넌트
import MovieItemSkeleton from "./movie-item-skeleton";
import style from "./movie-item-skeleton.module.css";

// MovieListSkeleton 컴포넌트: 영화 목록이 로딩 중일 때 표시되는 스켈레톤 UI
// numCol: 그리드의 열 개수
// count: 표시할 스켈레톤 아이템의 개수
export default function MovieListSkeleton({
  numCol,
  count,
}: {
  numCol: number;
  count: number;
}) {
  return (
    <div
      className={style.grid}
      style={{
        // 동적으로 그리드 열 개수 설정 (각 열의 최소 너비는 160px)
        gridTemplateColumns: `repeat(${numCol}, minmax(0, 160px))`,
        gap: "8px", // 그리드 아이템 간의 간격 설정
        justifyContent: "start", // 그리드 아이템들을 왼쪽 정렬
      }}
    >
      {/* count 개수만큼 MovieItemSkeleton 컴포넌트를 생성하여 표시 */}
      {new Array(count).fill(0).map((_, idx) => (
        <MovieItemSkeleton key={`movie-item-${idx}`} />
      ))}
    </div>
  );
}
