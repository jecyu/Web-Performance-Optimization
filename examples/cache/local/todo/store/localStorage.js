export default {
  save(key, value) {
    this.remove(key);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // 超过 5m 大小，降级处理，使用 indexDB
      console.log(`无法存数据的原因：${error}`);
    }
  },
  get(key) {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch (error) {
      // JSON.parse("xxx") 非对象字符串出错，直接返回对应的字符串
      return value ? value : null;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  removeAll() {
    localStorage.clear();
  },
};
