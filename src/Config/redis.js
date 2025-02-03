import { createClient } from 'redis'

const redisClient = createClient({
    username: "localhost",
    
})
  .on('error', (err) => console.log('Redis Error', err))
  .connect()

export default redisClient
