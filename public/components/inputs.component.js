import { HTML } from '../libs/afrontend/index.js'
import { InputComponent } from './input.component.js'

export class InputsComponent extends HTML {
  inputs = {
    url: new InputComponent({ label: 'url', placeholder: 'url' })
  }

  getValuesByMethodName(name) {
    const self = this
    return this.getInputsByMethodName(name).reduce((inputs, i) => {
      inputs[i] = self.inputs[i].getValue()
      return inputs
    }, {})
  }

  getInputsByMethodName(name) {
    switch (name) {
      case 'Page.navigate': return ['url']
    }

    return []
  }

  addInputsByMethodName(name = null) {
    this.clear()
    this.getInputsByMethodName(name).map((input_name) => {
      this.append(this.inputs[input_name])
    })
  }
}
