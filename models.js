

class MessageModel {
  headers = { name: null }
  body = {}

  constructor(name) { this.headers.name = name }

  toJSON() { return { headers: this.headers, body: this.body } }

  toString() { return JSON.stringify(this.toJSON()) }
}

class ErrorMessageModel extends MessageModel {
  constructor(message = 'undefined error') {
    super('error')
    this.body.message = message
  }
}

module.exports = { ErrorMessageModel }
