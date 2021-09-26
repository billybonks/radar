// preload with contextIsolation enabled
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('desktopAPI', {
  doAThing: () => {console.log('i am an api')}
})
