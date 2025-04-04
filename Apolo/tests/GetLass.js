import http from 'k6/http';
import { check, sleep } from 'k6';

// export let options = {
//   stages: [
//     { duration: '10s', target: 10 }, // Tăng dần từ 0 đến 10 Virtual Users (VUs) trong 10 giây
//     { duration: '20s', target: 10 }, // Giữ 10 VUs trong 20 giây
//     { duration: '10s', target: 0 },  // Giảm về 0 VUs trong 10 giây
//   ],
// };

export let options = {
  vus: 1, // Chạy với 1 user
  duration: '10s', // Chạy trong 10 giây
};

// URL của API get profile by ID
const url = 'https://lms-apollo-api.m-team.asia/student/class?page=1&pageSize=9999';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImVtYWlsIjoiYmFjdWJvbjIwMTVAZ21haWwuY29tIiwiaWF0IjoxNzQzNzUzNjI2LCJleHAiOjE3NDYzNDU2MjZ9.kQLZJcAsFmNM71DQCVLlJ4n-dZB91x4PXoQvM7w6g50';

export default function(){
    const params = {
        headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en',
        'authorization' : token,
        origin: 'https://d2r13z9cfyrlkx.cloudfront.net',
        priority: 'u=1, i',
        referer: 'https://d2r13z9cfyrlkx.cloudfront.net/',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'student-id': '13',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        },
    };

    const res = http.get(url, params);

    check(res, {
        'Status code is 200' : (r) => r.status === 200,
        'Response is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        'Response time < 1000ms': (r) => r.timings.duration < 1000, // Kiểm tra thời gian phản hồi dưới 1 giây
    });
    
    console.log(`⏱ Full time: ${res.timings.duration}ms`);
}