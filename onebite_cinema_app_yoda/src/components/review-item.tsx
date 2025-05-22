import { ReviewData } from "@/type";
import style from "./review-item.module.css";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      {/* 리뷰 작성자 표시 */}
      <div className={style.top_container}>
        {/* 리뷰 내용 표시 */}
        <div className={style.author}>{author}</div>
        {/* 작성 시간을 로컬 시간 형식으로 변환하여 표시 */}
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
      </div>
      <div className={style.content}>{content}</div>
      {/* 리뷰 삭제 버튼 */}
      <div className={style.bottom_container}>
        <div className={style.delete_btn}>리뷰 삭제하기</div>
      </div>
    </div>
  );
}
