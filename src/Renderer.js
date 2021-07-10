import channelList from './common/channelList';
const { ipcRenderer } = window.require('electron');

ipcRenderer.on(channelList.request.strikeThrough, () =>
  document.execCommand('strikeThrough', false, null),
);

ipcRenderer.on(channelList.request.save, (e, close) => {
  const area = document.getElementById('textEditor');

  ipcRenderer.send(channelList.response.save, {
    fileName: document.title,
    filePath: document.filePath,
    fileContent: {
      html: area.innerHTML,
      txt: area.innerText,
    },
    close: close,
  });
});

ipcRenderer.on(channelList.request.saveAs, () => {
  const area = document.getElementById('textEditor');

  ipcRenderer.send(channelList.response.saveAs, {
    fileContent: {
      html: area.innerHTML,
      txt: area.innerText,
    },
  });
});

ipcRenderer.on(channelList.request.sendFileContent, (e, { fileContent, fileName, filePath }) => {
  const area = document.getElementById('textEditor');

  area.innerHTML = fileContent;
  document.title = fileName;
  document.filePath = filePath;
});

ipcRenderer.on(channelList.request.error, (e, msg) => {
  alert(msg);
});

ipcRenderer.on(channelList.request.staus, (e, msg) => {
  alert(msg);
});