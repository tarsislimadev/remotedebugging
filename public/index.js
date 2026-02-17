import { HTML } from './libs/afrontend/index.js'
import { RowComponent } from './components/row.component.js'
import { TextComponent } from './components/text.component.js'
import { InputComponent } from './components/input.component.js'
import { InputsComponent } from './components/inputs.component.js'
import { ColumnComponent } from './components/column.component.js'
import { SelectComponent } from './components/select.component.js'
import { ButtonComponent } from './components/button.component.js'
import { MessagesComponent } from './components/messages.component.js'
import { MessageModel } from './models/message.model.js'
import { getMethodsList, getMessageByMethodName } from './utils/methods.list.js'

export class Page extends HTML {
  components = {
    url_input: new InputComponent({
      label: 'Websocket URL',
      type: 'text'
    }),
    methods_select: new SelectComponent({
      label: 'method',
      options: ['', ...getMethodsList()].map((item) => ({ value: item, label: item })),
      events: { onchange: () => this.onMethodsSelectChange() }
    }),
    inputs: new InputsComponent(),
    messages: new MessagesComponent(),
  }

  socket = io()

  onCreate() {
    super.onCreate()
    this.append(new RowComponent({
      children: [
        new TextComponent({ text: 'remote debugging' }),
        new ColumnComponent({ children: [this.getLeftBar(), this.getRightBar()] })
      ]
    }))
    this.setEvents()
  }

  setEvents() {
    this.socket.on('connect', this.components.messages.appendMessage(new MessageModel()))
    this.socket.on('disconnect', this.components.messages.appendMessage(new MessageModel()))
  }

  getLeftBar() {
    return new RowComponent({
      children: [
        this.components.url_input,
        new ButtonComponent({ text: 'connect', onclick: () => this.onConnectButtonClick(), }),
        this.components.methods_select,
        this.components.inputs,
        new ButtonComponent({ text: 'send', onclick: () => this.sendMessage() })
      ]
    })
  }

  sendMessage() {
    const method = this.components.methods_select.getValue()
    const params = this.components.inputs.getValuesByMethodName(method)
    const message = getMessageByMethodName(method, params)
    this.components.messages.appendMessage(message)
    this.socket.send({ headers: { name: 'message' }, body: { message } })
  }

  getRightBar() {
    return this.components.messages
  }

  onConnectButtonClick() {
    const url = this.components.url_input.getValue()
    this.socket.send({ headers: { name: 'connect' }, body: { url } })
  }

  onMethodsSelectChange() {
    const name = this.components.methods_select.getValue()
    this.components.inputs.addInputsByMethodName(name)
  }
}
