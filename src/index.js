const path = require('path');
const express = require('express');
const methodOverride = require('method-override')
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const session = require('express-session');

const route = require('./routes');
const db = require('./config/db');

//Connect to db

db.connnect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//Session

app.use(session({
    secret: 'secret_key', // Secret key để mã hóa session
    resave: false, // Không lưu lại session nếu không có thay đổi
    saveUninitialized: true, // Lưu session ngay cả khi nó chưa được khởi tạo
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // Thời gian tồn tại của session: 1 ngày (24 giờ)
    }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));
//HTTP Logger
// app.use(morgan('combined'));

//Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers:{
      sum : (a,b) => a+b,
      isEmpty: (value) => {
        return value === undefined;
      },
    }
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});


