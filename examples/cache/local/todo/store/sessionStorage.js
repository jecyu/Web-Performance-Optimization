/*
 * @Author: raojw
 * @Date: 2018-11-05 00:15:11
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-12 08:35:54
 */

const memoryStorage = {
  cache: Object.create(null),
  save(key, data) {
    this.cache[key] = data;
  },
  get(key) {
    const data = this.cache[key];
    return data ? data : null;
  },
  remove(key) {
    Object.prototype.hasOwnProperty.call(this.cache, key) &&
      delete this.cache[key];
  },
  removeAll() {
    this.cache = Object.create(null);
  }
};

export default {
  save(key, value, useMemoryStorage = false) {
    // if (typeof value === "object") {
    //   value = JSON.stringify(value);
    // }
    if (useMemoryStorage) {
      return memoryStorage.save(key, value);
    }
    this.remove(key);
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // 超过 5m 大小，降级处理
      console.log(`无法存数据的原因：${error}`);
      // 清除旧数据
      if (sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
      }
      memoryStorage.save(key, value);
    }
  },
  get(key, useMemoryStorage = false) {
    if (useMemoryStorage) {
      return memoryStorage.get(key);
    }
    const value = sessionStorage.getItem(key);
    if (value) {
      try {
        return value ? JSON.parse(value) : null;
      } catch (error) {
        // JSON.parse("xxx") 非对象字符串出错，直接返回对应的字符串
        return value ? value : null;
      }
    } else {
      return memoryStorage.get(key);
    }
  },
  remove(key) {
    sessionStorage.removeItem(key);
    memoryStorage.remove(key);
  },
  removeAll() {
    sessionStorage.clear();
    memoryStorage.removeAll();
  }
};
