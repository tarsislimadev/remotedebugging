import { HTML } from '../libs/afrontend/index.js'

export class ColumnComponent extends HTML {
  children = []

  constructor({ children = [] } = {}) {
    super()
    this.children = children
  }

  onCreate() {
    super.onCreate()
    this.setStyle('display', 'flex')
    this.setStyle('justify-content', 'space-between')
    this.children.map((child) => this.append(child))
  }
}
