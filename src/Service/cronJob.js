import cron from 'node-cron'
import messageModel from '../Models/message.model.js'

const startCronJob = () => {
  cron.schedule('*/2 * * * *', async () => {
    console.log('Saving messages to MongoDB...')

    try {
      const messages = await messageModel.find()
      if (messages.length) {
        console.log(`Found ${messages.length} messages.`)
      }
    } catch (error) {
      console.error('Error in cron job:', error)
    }
  })
}

export default startCronJob
