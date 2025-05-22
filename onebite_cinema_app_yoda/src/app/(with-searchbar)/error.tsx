"use client";

// Next.js 13의 새로운 에러 처리 컴포넌트
// 클라이언트 컴포넌트로 설정한다. 서버에서도 실행되고 클라이언트에서도 동일하게 실행이 되기 때문이다.

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  // 에러 발생 시 콘솔에 에러 메시지 출력
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다</h3>
      {/* reset은 클라이언트에서 받은 화면을 렌더링하는 기능이다.(서버컴포넌트를 다시 실행하지 않는다.) */}
      {/* window.location.reload -> 강제로 다시 실행시키기 */}
      <button
        onClick={() => {
          // React 18의 startTransition을 사용하여 UI 업데이트를 일괄적으로 처리
          // 해당 작업을 일괄적으로 동시에 처리가 된다. 한몸처럼 움직이게 된다.
          startTransition(() => {
            // 새롭게 다시 렌더링하는,, 일반적인 refresh와는 다름
            router.refresh(); // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러온다. 비동기 메서드다.
            reset(); // 에러 상태를 초기화하고 컴포넌트들을 다시 렌더링한다.
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
