import { Model } from './model.js'

export class MessageModel extends Model {
  datetime = Date.now()
  name = 'message'
}
