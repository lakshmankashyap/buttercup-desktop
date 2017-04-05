import path from 'path';
import { clipboard, remote } from 'electron';

const currentWindow = remote.getCurrentWindow();

export function copyToClipboard(text) {
  clipboard.writeText(text);
} 

// http://stackoverflow.com/a/6150060/172805
export function selectElementContents(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  sel.removeAllRanges();
  sel.addRange(range);
}

export function parsePath(filepath) {
  return path.parse(filepath);
}

export function setWindowSize(width, height, vibrancy) {
  currentWindow.setSize(width, height, false);
  if (typeof vibrancy !== 'undefined') {
    currentWindow.setVibrancy(vibrancy);
  }
}

export function isOSX() {
  return process.platform === 'darwin';
}

export function isWindows() {
  return process.platform === 'win32';
}

export function isLinux() {
  return process.platform === 'linux';
}

export function isButtercupFile(fileObj) {
  if (fileObj === null) {
    return false;
  }
  return fileObj.type === 'file' && path.extname(fileObj.name).toLowerCase() === '.bcup';
}

export function emitActionToParentAndClose(name, payload) {
  const win = remote.getCurrentWindow();
  const rpc = win.getParentWindow().rpc;
  rpc.emit(name, payload);
  win.close();
}
