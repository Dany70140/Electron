// Ce script sera exécuté avant le chargement de la page
// Ce script à un accès au API Node et Electron

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome
})

console.log("preload chagré avec succès")