window.electronAPI.onUpdateAvailable(() => {
  const notification = document.getElementById('updateNotification');
  notification.style.display = 'block';
});

window.electronAPI.onUpdateProgress((progress) => {
  const progressBar = document.getElementById('downloadProgress');
  progressBar.style.width = `${Math.floor(progress.percent)}%`;
});

window.electronAPI.onUpdateDownloaded(() => {
  const restartButton = document.getElementById('restartButton');
  restartButton.style.display = 'block';
  document.getElementById('updateMessage').textContent = 'Update Downloaded!';
});

window.electronAPI.onUpdateError((error) => {
  console.error('Update failed:', error);
  alert(`Update failed: ${error}`);
});

document.getElementById('restartButton').addEventListener('click', () => {
  window.electronAPI.restartApp();
});

// Cleanup listeners when unmounting
window.addEventListener('beforeunload', () => {
  window.electronAPI.removeAllListeners();
});