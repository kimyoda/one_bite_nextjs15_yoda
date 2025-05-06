import Searchbar from "@/components/searchbar";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>로딩중입니다 ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
