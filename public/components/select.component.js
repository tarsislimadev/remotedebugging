import { HTML, nSelect, nOption } from '../libs/afrontend/index.js'
import { TextComponent } from './text.component.js'

export class SelectComponent extends HTML {
  options = []
  label = ''
  onchange = () => { }

  select = new nSelect()

  constructor({ options = [], label = '', events: { onchange = () => { } } } = {}) {
    super()
    this.options = options
    this.label = label
    this.onchange = onchange
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: this.label }))
    this.append(this.getSelectComponent())
  }

  getSelectComponent() {
    this.select.setAttr('name', 'select')
    this.select.addEventListener('change', () => this.onchange?.())
    this.options.map(({ value, label }) => {
      const opt = new nOption()
      opt.setAttr('value', value)
      opt.setText(label)
      this.select.append(opt)
    })
    return this.select
  }

  getValue() {
    return this.select.getValue()
  }
}
