

const info = document.getElementById("info");
info.innerText = `本应用正在使用 Chromium ${versions.chrome()} ,Node.js ${versions.node()} ,Electron ${versions.electron()}`;

const { ipcRenderer } = window.electron;
const { send: sendRenderer, receive: receiveRenderer } = ipcRenderer;
const btn = document.getElementById("send");

btn.addEventListener("click", () => {
    sendRenderer('toMain', 'ping');
});
receiveRenderer('fromMain', (arg) => {
    console.log(arg); // prints "pong"
});



const btn1 = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn1.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})