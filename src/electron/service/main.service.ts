import { app, ipcMain } from "electron";
import eventService from "./event.service";
import windowsService from "./windows.service";

class MainService {

  globalActionsRegistered = false;

  initWindow() {
    eventService.registerControllers();
    this.registerGlobalActions();
    windowsService.createMainWindow();
  }

  registerGlobalActions() {
    if (!this.globalActionsRegistered) {
      ipcMain.on('getControllerActions', e => {
        e.returnValue = eventService.getControllerActions();
      });
      ipcMain.on('isPackaged', e => {
        e.returnValue = app.isPackaged;
      });
    }

    this.globalActionsRegistered = true;
  }
}

export default new MainService(); 