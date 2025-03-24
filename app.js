const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path'); // ✅ path 모듈 추가

// 설치한 미들웨어 및 모듈 불러오기
dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000); 
// app.set('port', 포트): 서버가 실행될 포트 설정

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public'))); // ✅ static 경로 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // ✅ 오타 수정
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next(); // 다음 미들웨어로 넘어가기 위해 next() 호출
});

app.get('/', (req, res) => {
    res.send('Hello, Express');
});
/*
app.get(주소, 라우터): 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분
ex) app.post, app.patch, app.put, app.delete, app.options 등도 사용 가능
express에서는 http와 다르게 res.write, res.end 대신 res.send 사용
*/

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
