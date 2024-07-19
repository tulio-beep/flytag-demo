document.getElementById('minimize').addEventListener('click', () => {
    window.electron.minimizeWindow();
});

document.getElementById('maximize').addEventListener('click', () => {
    window.electron.maximizeWindow();
});

document.getElementById('close').addEventListener('click', () => {
    window.electron.closeWindow();
});