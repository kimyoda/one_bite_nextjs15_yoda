import { useRouter } from "next/router";
import styles from "./movie-result.module.css";

export default function Page() {
  const router = useRouter();

  const { id } = router.query;

  return <h1 className={styles.result}>영화 상세페이지 {id} </h1>;
}
