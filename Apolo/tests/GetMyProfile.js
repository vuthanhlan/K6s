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

// URL của API get my profile
const url='https://lms-apollo-api.m-team.asia/user/profile';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImVtYWlsIjoiYmFjdWJvbjIwMTVAZ21haWwuY29tIiwiaWF0IjoxNzQzNzM1ODUyLCJleHAiOjE3NDYzMjc4NTJ9.GNXSk9UPSfEIAiM_urK1RvCetjVIwlpD5LpNA_uBp-I'

export default function(){
    // cấu hình header
    const params = {
        headers: {
            'Authorization': token,
            'Accept' : '*/*',
        },
    }
    
    const res = http.get(url, params);

    check(res, {
        'Status is 200': (r) => r.status === 200,
        'Response is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
        'Response time < 1000ms': (r) => r.timings.duration < 1000, // Kiểm tra thời gian phản hồi dưới 1 giây
      });
    
      console.log(`⏱ Full time: ${res.timings.duration}ms`);
      
}