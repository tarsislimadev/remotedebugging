import { HTML, nButton } from '../libs/afrontend/index.js'

export class ButtonComponent extends nButton {
  text = ''
  onclick = () => { }

  constructor({ text = '', onclick = () => { } } = {}) {
    super()
    this.text = text
    this.onclick = onclick
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
    this.addEventListener('click', () => this.onclick?.())
  }
}
