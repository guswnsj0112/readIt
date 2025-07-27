// readit/backend/server.js (수정)
// 기존: require('dotenv').config();
import 'dotenv/config'; // dotenv를 ESM 방식으로 불러오는 방법

// 기존: const express = require('express');
// 기존: const cors = require('cors');
// 기존: const fetch = require('node-fetch');
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // node-fetch도 import로 변경

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173' // 개발 환경 CORS 설정
    // 또는 필요에 따라 구름IDE의 실제 URL을 여기에 추가
    // 예: origin: ['http://localhost:5173', 'https://readit-vnygo.run.goorm.io']
}));

app.use(express.json());

app.get('/api/naver-bestsellers', async (req, res) => {
    const query = req.query.q || '';
    const display = req.query.display || 20;
    const sort = req.query.sort || 'sales';

    const naverApiUrl = `https://openapi.naver.com/v1/search/book.json?query=${encodeURIComponent(query)}&display=${display}&sort=${sort}`;

    try {
        const response = await fetch(naverApiUrl, {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('네이버 API 에러 응답:', errorData);
            return res.status(response.status).json({
                error: 'Naver API call failed',
                message: errorData.errorMessage || 'Unknown error from Naver API'
            });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('API 프록시 서버 에러:', error);
        res.status(500).json({ error: 'Failed to fetch bestsellers from Naver API', message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Node.js Express 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});