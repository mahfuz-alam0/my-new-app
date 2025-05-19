window.electronAPI.onUpdateAvailable(() => {
  document.getElementById('update-status').innerText = 'Update available... downloading.';
});

window.electronAPI.onUpdateProgress((event, progress) => {
  document.getElementById('update-status').innerText = `Downloading: ${Math.round(progress.percent)}%`;
});

window.electronAPI.onUpdateDownloaded(() => {
  document.getElementById('update-status').innerText = 'Update downloaded. Restarting...';
  setTimeout(() => {
    window.electronAPI.restartApp();
  }, 3000);
});

window.electronAPI.onUpdateError((event, error) => {
  document.getElementById('update-status').innerText = `Update failed: ${error.message}`;
});
