import { HTML } from '../libs/afrontend/index.js'
import { MessageModel } from '../models/message.model.js'

export class MessagesComponent extends HTML {
  appendMessage(message = new MessageModel()) {
    const html = new HTML()
    this.append(html)
  }
}
