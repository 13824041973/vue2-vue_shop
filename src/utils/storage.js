// 获取storage
export const getStorage = (key) => {
    let result = localStorage.getItem(key);
    return JSON.parse(result);
};

// 存storage
export const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// 删除单个storage
export const removeStorageItem = (key) => {
    localStorage.removeItem(key);
};

// 清空storage
export const clearStorage = () => {
    localStorage.clear();
};