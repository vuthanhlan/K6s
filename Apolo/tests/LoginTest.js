import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 }, // Tăng dần từ 0 đến 10 Virtual Users (VUs) trong 10 giây
    { duration: '20s', target: 10 }, // Giữ 10 VUs trong 20 giây
    { duration: '10s', target: 0 },  // Giảm về 0 VUs trong 10 giây
  ],
};

// export let options = {
//   vus: 5, // Chạy với 1 user
//   duration: '10s', // Chạy trong 10 giây
// };
// URL của API đăng nhập
const url = 'https://lms-apollo-api.m-team.asia/auth/login';

export default function () {
  // Dữ liệu đăng nhập (email và password)
  const payload = JSON.stringify({
    email: "bacubon2015@gmail.com",
    password: "Test123@"
  });

  // Cấu hình header
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Gửi yêu cầu POST
  let response = http.post(url, payload, params);

  // Kiểm tra mã trạng thái (status code) và xem có trả về token không
  check(response, {
    'Status is 201': (r) => r.status === 201,
    'Response has token': (r) => r.json('token') !== undefined,
    'Response time < 1000ms': (r) => r.timings.duration < 1000, // Kiểm tra thời gian phản hồi dưới 1 giây
  });

  // In ra thông tin thời gian phản hồi
  console.log(`Response time: ${response.timings.duration}ms`);
   // Log the request body
  //  console.log(response.body);
  sleep(1); // Tạm dừng 1 giây giữa các requests
}