import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "./search-result.module.css";

export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  // 정확하게 undefined일 때만 "로딩 중..." 처리
  if (q === undefined) return <p>로딩 중...</p>;

  return <h1 className={styles.result}>검색결과: {q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
