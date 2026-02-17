import { HTML, nInput } from '../libs/afrontend/index.js'
import { TextComponent } from './text.component.js'

export class InputComponent extends HTML {
  label = ''
  placeholder = ''

  input = new nInput()
  error = new HTML()

  constructor({ label = '', placeholder = '' } = {}) {
    super()
    this.label = label
    this.placeholder = placeholder
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: this.label }))
    this.append(this.getInputComponent())
    this.append(this.getErrorComponent())
  }

  getInputComponent() {
    this.input.setAttr('placeholder', this.placeholder)
    return this.input
  }

  getErrorComponent() {
    return this.error
  }

  getValue() { return this.input.getValue() }
}
