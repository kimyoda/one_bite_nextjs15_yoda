import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const { id } = router.query;

  return <h1>영화 상세페이지 {id} </h1>;
}
