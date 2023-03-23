import { ipcMain, nativeTheme, dialog, Notification } from 'electron';
import database from 'better-sqlite3';
import fs from 'fs';
import { UserData } from '../../src/app/redux/userSlice';
const Alert = require("electron-alert");

function api() {
  const db = new database('database.db');

  if (fs.statSync('database.db').size === 0) {
    console.log('Creating database');
    db.exec(`
      CREATE TABLE IF NOT EXISTS user (
        id STRING (21,21) PRIMARY KEY NOT NULL, 
        name STRING (0, 255) NOT NULL, 
        birthDay STRING (10, 10), 
        email STRING (0, 255) NOT NULL, 
        age INT NOT NULL
      );
    `);
  }

  ipcMain.handle('getAllUser', () => {
    const statement = db.prepare('SELECT * FROM user');
    const rows: UserData[] = statement.all();
    return rows;
  });

  ipcMain.on('addUser', (event, obj) => {
    const insert = db.prepare(`
      INSERT INTO user 
        (id, name, birthDay, email, age)
      VALUES 
        (@id, @name, @birthDay, @email, @age);
    `);
    insert.run(obj);
  })

  ipcMain.on('deleteUser', (event, id) => {
    const del = db.prepare('DELETE FROM user WHERE id = ?');
    del.run(id);
  });

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('alert', () => {
    let swalOptions = {
      position: "center",
      title: "Signed in successfully",
      icon: "success",
      showConfirmButton: true,
      timer: 3000
    };
    Alert.fireToast(swalOptions);
  })
}

export default api;