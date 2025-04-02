import style from "./[id].module.css";

const mockData = {
  id: 3,
  title: "아이유 콘서트 : 더 위닝",
  releaseDate: "2025-01-24",
  company: "CGV ICECON, CJ 4DPLEX",
  genres: ["공연실황"],
  subTitle: "최초의 아이콘 아이유, 100번째 콘서트로 완성된 찬란한 기록",
  description:
    "최초의 아이콘 아이유, 100번째 콘서트로 완성된 찬란한 기록. 'Love wins all', '홀씨', 'Shopper', 'Celebrity', 'Last Fantasy' 등 수많은 명곡으로 서울월드컵경기장을 가득 채운 아이유와 유애나의 뜨거운 에너지와 함성. 상암 하늘을 수놓은 환상적인 드론쇼까지! 승리를 위해 달려온 여정의 마지막 챕터가 지금 스크린에서 펼쳐진다!",
  runtime: 124,
  posterImgUrl:
    "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20250108_174%2F1736328720692tngqd_JPEG%2Fmovie_image.jpg",
};

export default function Page() {
  const {
    title,
    subTitle,
    description,
    releaseDate,
    genres,
    runtime,
    posterImgUrl,
  } = mockData;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.releaseDate}>
        {releaseDate} / {genres?.join(", ")} / {runtime}분
      </div>
      <br />
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
