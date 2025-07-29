// server.js

// dotenv를 ES 모듈 방식으로 불러오기
import "dotenv/config"; // 이렇게 사용하면 .env 파일이 자동으로 로드됩니다.

import { createServer } from "http";
import { request } from "https";
import { URL } from "url";

const PORT = process.env.PORT || 5000;
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

const server = createServer((req, res) => {
  // CORS 설정 (개발 환경에서만 사용 권장, 실제 서비스에서는 더 엄격하게 설정)
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = requestUrl.pathname;
  const queryParams = requestUrl.searchParams;

  if (pathname === "/api/search-books" && req.method === "GET") {
    const query = queryParams.get("query");
    if (!query) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Query parameter is required." }));
      return;
    }

    const naverApiOptions = {
      hostname: "openapi.naver.com",
      port: 443,
      path: encodeURI(`/v1/search/book.json?query=${query}`),
      method: "GET",
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    };

    let naverApiData = "";
    const naverReq = request(naverApiOptions, (naverRes) => {
      naverRes.on("data", (chunk) => {
        naverApiData += chunk;
      });

      naverRes.on("end", () => {
        try {
          const parsedData = JSON.parse(naverApiData);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(parsedData));
        } catch (e) {
          console.error("Error parsing Naver API response:", e);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Failed to parse Naver API response." })
          );
        }
      });
    });

    naverReq.on("error", (e) => {
      console.error("Error calling Naver API:", e);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to connect to Naver API." }));
    });

    naverReq.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
