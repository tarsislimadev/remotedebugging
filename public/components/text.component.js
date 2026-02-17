import { HTML } from '../libs/afrontend/index.js'

export class TextComponent extends HTML {
  text = ''

  constructor({ text = '' } = {}) {
    super()
    this.text = text
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
  }
}
