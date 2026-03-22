import * as Ably from 'ably'
import { ChatClient } from '@ably/chat'

const ablyKey = process.env.NEXT_PUBLIC_ABLY_API_KEY!

export const initAbly = (clientId: string) => {
  const realtime = new Ably.Realtime({ key: ablyKey, clientId })
  const chatClient = new ChatClient(realtime)
  return { realtime, chatClient }
}
