"use server";

export async function createReviewAction(formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  // 예외처리 추가 값이 없으며 리턴
  if (!content || !author || !movieId) {
    return;
  }

  try {
    // API 호출 관련 코드
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
      }
    );
  } catch (err) {
    console.error(err);
    return;
  }
}
