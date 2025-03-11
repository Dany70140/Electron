// Ce script sera exécuté avant le chargement de la page
// Ce script à un accès au API Node et Electron

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    // fonction qui récupère les versions via IPC
    getVersions: () => ipcRenderer.invoke('get-versions')
})

console.log("preload chagré avec succès")