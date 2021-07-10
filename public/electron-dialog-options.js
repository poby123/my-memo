module.exports = {
  save: {
    title: 'Save file',

    //Placeholder 2
    defaultPath: __dirname,

    //Placeholder 4
    buttonLabel: 'Save File',

    //Placeholder 3
    filters: [
      { name: 'Html', extensions: ['html', 'mhtml'] },
      { name: 'Plain text', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  },

  open: {
    title: 'Open file',

    //Placeholder 2
    defaultPath: __dirname,

    //Placeholder 4
    buttonLabel: 'Open',

    //Placeholder 3
    filters: [
      { name: 'Html', extensions: ['html', 'mhtml'] },
      { name: 'Plain text', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  },

  askBeforeQuit: {
    type: 'question',
    buttons: ['Cancel', 'Save', "Don't save"],
    title: 'Question',
    message: '나가기 전에 저장하시겠습니까?',
  },
};
