import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'http'
import cors from 'cors'
import requestLogger from './src/Middlewares/logger.middleware.js'
import errorHandler from './src/Middlewares/errorhandler.middleware.js'
import colors from 'colors'
import connectDB from './src/Config/db.js'
import userRoutes from './src/Routes/user.routes.js'
import chatRoutes from './src/Routes/chat.routes.js'
import initSocket from './src/Sockets/socketHandler.js'
import { Server } from 'socket.io'
import startCronJob from './src/Service/cronjob.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: true,
})

app.use(requestLogger)

const PORT = process.env.PORT || 8088

connectDB()

startCronJob()

app.use(express.json())

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }),
)

app.get('/', (req, res) => {
  res.send(`<h1>Server is running</h1>`)
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRoutes)
app.use("/api/chat", chatRoutes);

initSocket(io)

app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server running on port ${`http://localhost:${PORT}`.blue}`)
})
