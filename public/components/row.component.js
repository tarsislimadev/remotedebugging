import { HTML } from '../libs/afrontend/index.js'

export class RowComponent extends HTML {
  constructor({ children = [] } = {}) {
    super()
    children.map((child) => this.append(child))
  }
}
