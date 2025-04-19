import { ReactNode } from "react";
import Searchbar from "./searchbar";

// Next.js의 Layout 컴포넌트
// (with-searchbar) 폴더 내의 모든 페이지에서 공통으로 사용되는 레이아웃
// children prop은 이 레이아웃 내부에 렌더링될 페이지 컴포넌트를 의미
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 레이아웃 헤더 */}
      <div>Searchbar Layout</div>
      {/* 모든 페이지에서 공통으로 사용되는 검색바 컴포넌트 */}
      <Searchbar />
      {/* 현재 라우트에 해당하는 페이지 컴포넌트가 렌더링되는 위치 */}
      {children}
    </div>
  );
}
