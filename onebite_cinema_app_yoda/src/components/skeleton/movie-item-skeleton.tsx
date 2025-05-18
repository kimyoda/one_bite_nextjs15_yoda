// 개별 영화 아이템의 로딩 상태를 표시하는 스켈레톤 컴포넌트
import style from "./movie-item-skeleton.module.css";

// MovieItemSkeleton 컴포넌트: 개별 영화 카드가 로딩 중일 때 표시되는 스켈레톤 UI
// 실제 영화 카드와 동일한 크기와 모양을 가지도록 CSS로 스타일링됨
export default function MovieItemSkeleton() {
  return <div className={style.container}></div>;
}
