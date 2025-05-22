import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        {/* 리뷰 내용을 입력받는 textarea */}
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          {/* 리뷰 작성자 이름을 입력받는 input */}
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
