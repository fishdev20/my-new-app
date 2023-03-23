import { contextBridge } from 'electron';
import dataContext from './dataContext';

contextBridge.exposeInMainWorld('api', {
    dataContext: dataContext,
});

// allows developers to selectively expose 
//specific parts of the main process API to the renderer process in a secure way.
//This helps prevent unauthorized access to system resources 
//and improves the overall security of the Electron application.