// Processus principal

// Appelle aux API electron

const {app, BrowserWindow , ipcMain, Menu , dialog} = require("electron")
const path = require('path')
const mysql = require('mysql2/promise')

//Fenêtre principale
let window;

// Configuration de l'accès à la base de données
const dbconfig = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'db-todos',
    connectionLimit: 10, // nombre maximal de connexions simutlanées dans le pool
    waitForConnections: true,
    queueLimit : 0
}

// Créer le pool de connexion
const pool = mysql.createPool(dbconfig)

// Tester la connexion
async function testConnexion() {
    try {
        // Demdander une connexion au pool
        const connexion = await pool.getConnexion
        console.log('connexion avec la base de données établie')
        connexion.release() // rend la connexion disponible dans le pool
    } catch (error) {
        console.error('Erreur de connexion à la base de données')
    }
}


// Créer la fenêtre principale
function createWindow() {
     window = new BrowserWindow( {
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            preload: path.join(__dirname,'src/js/preload.js')
        }

    })

   // window.webContents.openDevTools()
    // Création du menu
    createMenu()

    window.loadFile('src/pages/index.html');
}
// Fonction permettantr de créer un menu personnalisé
function createMenu() {
    //Créer un tableau qui va représenter le menu
    const template = [
        {
            label : "App",
            submenu : [
                {
                    label : "Versions",
                    click : () => window.loadFile('src/pages/index.html')
                },
                {
                  type : "separator"
                },
                {
                    label : "Quitter",
                    accelerator: process.platform === "darwin" ? "Cmd+Q": "Ctrl+Q",
                    click : () => app.quit()
                }
            ]
        },
        {
            label : "Tâches",
            submenu: [
                {
                    label : "Lister",
                    click : () => window.loadFile('src/pages/liste-taches.html')
                },
                {
                    label : "Ajouter",
                    click : () => window.loadFile('src/pages/ajout-taches.html')
                }
            ]
        }
    ]
    // Créer le menu à partir du modèle
    const menu = Menu.buildFromTemplate(template)
    // Définir le menu comme étant le menu de l'application
    Menu.setApplicationMenu(menu)

}


// Attendre l'initialisation de l'application au démarrage
app.whenReady().then( () => {
        createWindow()
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0){
                createWindow()
            }
        })
    }
)

// Fermeture de l'application

app.on('window-all-closed',() => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

// Ecouter sur le canal "get-versions"
ipcMain.handle('get-versions', () => {
    // Renvoyer un objet contenant les versions des outils
    return {
        electron: process.versions.electron,
        node: process.versions.node,
        chrome: process.versions.chrome
    }
})

async function getAllTodos() {
    try{
        const resultat = await pool.query('SELECT * FROM todos ORDER BY created_at DESC')
        return resultat[0] // Retourne une promesse avec le résultat
    } catch(error) {
        console.error('erreur lors de la récupération des tâches')
        throw error // Retourne une promesse non résolue
    }
}

// Ecouter sur le canal "todos:getAll
ipcMain.handle('todos:getAll', async ()=> {
    // Récupérer la liste des tâches dans la base de données avec mysql
    try {
        return await getAllTodos() // Retourne une promesse avec le résultat
    } catch(error) {
        dialog.showErrorBox("Erreur technique","Impossible de récupérer la liste des tâches")
        return [] // Retourne une promesse avec unn tableau vide
    }
})