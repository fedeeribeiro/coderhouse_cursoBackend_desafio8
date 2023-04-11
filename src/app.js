import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import { Server } from 'socket.io';
import { __dirname } from './utils.js'
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import './persistence/dbConfig.js';
import passport from 'passport';
import './passport/passportStrategies.js';
import config from './config.js';

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongoUrl: 'mongodb+srv://fedeeribeiro:coderhouse@cluster0.hj7njhs.mongodb.net/eCommerceProjectCoderhouse?retryWrites=true&w=majority'
        })
    })
);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/views', viewsRouter);

const httpServer = app.listen(config.PORT, () => {
    console.log(`Servidor escuchando al puerto ${config.PORT}.`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado con el ID ${socket.id}.`);
    socket.emit('fetchProducts');
    socket.on('updateProducts', () => {
        socket.emit('fetchProducts')
    });
    socket.on('disconnect', () => {
        console.log(`Usuario con ID ${socket.id} se ha desconectado.`)
    })
})