import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revaliated: true });
  } catch (err) {
    console.error("Revaildation error:", err); // 로그 출력으로 사용
    res.status(500).send("Revaildation error");
  }
}
