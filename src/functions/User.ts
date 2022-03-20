import os from 'os';

export function getWindowsUser() {
    const userInfo = os.userInfo() 
    return userInfo.username;
}