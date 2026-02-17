import { MessageModel } from '../models/message.model.js'

export const getMethodsList = () => (['Page.navigate', 'Page.reload', 'Page.captureScreenshot', 'Runtime.evaluate', 'Runtime.callFunctionOn', 'DOM.getDocument', 'DOM.querySelector', 'DOM.setAttributeValue', 'Network.enable', 'Network.setExtraHTTPHeaders', 'Network.getResponseBody', 'Debugger.enable', 'Debugger.setBreakpointByUrl', 'Debugger.resume', 'Console.enable', 'Emulation.setDeviceMetricsOverride', 'Emulation.setGeolocationOverride',])

class PageNavigateMessageModel extends MessageModel {
  name = 'Page.navigate'

  constructor(params) {
    super(params)
    this.url = params.url
  }
}

export const getMessageByMethodName = (method, params = {}) => {
  switch (method) {
    case 'Page.navigate': return new PageNavigateMessageModel(params)
    case 'Page.reload': return new MessageModel(params)
    case 'Page.captureScreenshot': return new MessageModel(params)
    case 'Runtime.evaluate': return new MessageModel(params)
    case 'Runtime.callFunctionOn': return new MessageModel(params)
    case 'DOM.getDocument': return new MessageModel(params)
    case 'DOM.querySelector': return new MessageModel(params)
    case 'DOM.setAttributeValue': return new MessageModel(params)
    case 'Network.enable': return new MessageModel(params)
    case 'Network.setExtraHTTPHeaders': return new MessageModel(params)
    case 'Network.getResponseBody': return new MessageModel(params)
    case 'Debugger.enable': return new MessageModel(params)
    case 'Debugger.setBreakpointByUrl': return new MessageModel(params)
    case 'Debugger.resume': return new MessageModel(params)
    case 'Console.enable': return new MessageModel(params)
    case 'Emulation.setDeviceMetricsOverride': return new MessageModel(params)
    case 'Emulation.setGeolocationOverride': return new MessageModel(params)
  }

  return new MessageModel(params)
}
