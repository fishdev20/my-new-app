import { ipcRenderer } from 'electron';
import { UserData } from '../app/redux/userSlice';

const dataContext = {
  // I've done this to fix an issue with the react component not waiting for the data to be returned.
  getAllUser(channel: string) {
    return ipcRenderer.invoke(channel);
  },
  addUser(obj: UserData): void {
    ipcRenderer.send('addUser', obj);
  },
  deleteUser(id: string): void {
    ipcRenderer.send('deleteUser', id);
  },
  toggleDarkMode(channel: string) {
    return ipcRenderer.invoke(channel)
  },
  toggleNotification(channel: string) {
    return ipcRenderer.invoke(channel)
  }
};

export type DataContextApi = typeof dataContext;

export default dataContext;