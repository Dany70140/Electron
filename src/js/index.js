const electronVersion = document.querySelector("#electron-version")
const nodeVersion = document.querySelector("#node-version")
const chromiumVersion = document.querySelector("#chromium-version")


async function lesVersions() {
    // Appel de la fonction get Versions exposée par le préload
    const v = await versions.getVersions()

    electronVersion.textContent = v.electron
    nodeVersion.textContent = v.node
    chromiumVersion.textContent = v.chrome
}

lesVersions()
