const elemQuota = document.getElementById('quota');
const elemUsed = document.getElementById('used');
const elemRemaining = document.getElementById('remaining');
const elemCountTotal = document.getElementById('countTotal');
const elemCountIDB = document.getElementById('countIDB');
const elemCountCache = document.getElementById('countCache');
const elemCountLocalStorage = document.getElementById('countLocalStorage');
const elemCountSessionStorage = document.getElementById('countSessionStorage');

const ONE_MEG = 1000000;

let countIDB = 0;
let countCache = 0;
let countLocalStorage = 0;
let countSessionStorage = 0;

const textDecoder = new TextDecoder('utf-8');

/* Generate a random array buffer of size X */
function getArrayBuffer(size) {
  if (!size) {
    size = ONE_MEG;
  }
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  const len = view.length;
  for (let i = 0; i < len; i++) {
    view[i] = Math.random() * (126 - 33) + 33;
  }
  return buffer;
}

/* Generate a random string of size X */
function getStr(size) {
  const buffer = getArrayBuffer(size);
  return textDecoder.decode(buffer);
}

/* Fill IDB */
let fillDiskIDBInterval;
const buttFillIDB = document.getElementById('buttFillIDB')
const elemFillDiskIDB = document.getElementById('fillIDBStatus');
buttFillIDB.addEventListener('click', toggleFillIDB);
function toggleFillIDB() {
  if (fillDiskIDBInterval) {
    clearInterval(fillDiskIDBInterval);
    fillDiskIDBInterval = null;
    elemFillDiskIDB.textContent = 'off';
    buttFillIDB.classList.toggle('toggle-on', false);
    return;
  }
  fillDiskIDBInterval = setInterval(() => {
    addToIDB();
  }, 500);
  elemFillDiskIDB.textContent = 'ON';
  buttFillIDB.classList.toggle('toggle-on', true);
}

/* Fill Caches */
let fillDiskCachesInterval;
const buttFillCaches = document.getElementById('buttFillCaches');
const elemFillDiskCaches = document.getElementById('fillCachesStatus');
buttFillCaches.addEventListener('click', toggleFillCaches);
function toggleFillCaches() {
  if (fillDiskCachesInterval) {
    clearInterval(fillDiskCachesInterval);
    fillDiskCachesInterval = null;
    elemFillDiskCaches.textContent = 'off';
    buttFillCaches.classList.toggle('toggle-on', false);
    return;
  }
  fillDiskCachesInterval = setInterval(() => {
    addToCaches();
  }, 250);
  elemFillDiskCaches.textContent = 'ON';
  buttFillCaches.classList.toggle('toggle-on', true);
}

/* Format the number into something nice if possible */
function formatToMB(val) {
  const opts = {
    maximumFractionDigits: 0,
  };
  let result;
  try {
    result = new Intl.NumberFormat('en-us', opts).format(val / ONE_MEG);
  } catch (ex) {
    result = Math.round(val / ONE_MEG);
  }
  return `${result} MB`;
}

/* Update the Quota using StorageManager */
function updateQuota() {
  navigator.storage.estimate().then((quota) => {
    // console.log('quota', quota.quota);
    const remaining = quota.quota - quota.usage;
    elemQuota.textContent = formatToMB(quota.quota);
    elemUsed.textContent = formatToMB(quota.usage);
    elemRemaining.textContent = formatToMB(remaining);
  }).catch((err) => {
    console.error('*** Unable to update quota ***', err);
  }).then(() => {
    setTimeout(() => {
      updateQuota();
    }, 500);    
  });

}

/* Update the 'quota' using the count of items */
function updateCount() {
  countLocalStorage = localStorage.length;
  elemCountLocalStorage.textContent = countLocalStorage;
  countSessionStorage = sessionStorage.length;
  elemCountSessionStorage.textContent = countSessionStorage;
  idbKV.keys()
    .then((keys) => {
      countIDB = keys.length;
      elemCountIDB.textContent = countIDB;
    }).catch((err) => {
      console.error('*** Unable to update IDB count ***', err);
    }).then(() => {
      return caches.open('my-cache');
    }).then((cache) => {
      return cache.keys();
    }).then((keys) => {
      countCache = keys.length; 
      elemCountCache.textContent = countCache;
    }).catch((err) => {
      console.error('*** Unable to update Cache count ***', err);
    }).then(() => {
      elemCountTotal.textContent = countIDB + countCache + countLocalStorage + countSessionStorage;    
      setTimeout(() => {
        updateCount();
      }, 500);
    });
}

/* Add to IDB */
document.getElementById('buttAddIDB').addEventListener('click', () => {
  addToIDB();
});
function addToIDB(size) {
  const key = `item_${Date.now().toString()}`;
  const data = getStr(size);
  // const data = getArrayBuffer(size);
  return idbKV.set(key, data)
    .catch((err) => {
      console.error(`*** IndexedDB: '${err.name}' ***`, err);
      alert('Oops: Error writing to IndexedDB, check console.');
    });
}

/* Add to Caches */
let cacheObj;
caches.open('my-cache').then((cache) => {
  cacheObj = cache;
});
document.getElementById('buttAddCaches').addEventListener('click', () => {
  addToCaches();
});
function addToCaches(size) {
  const fname = `/file_${Date.now().toString()}.txt`;
  const stringResponse = new Response(getStr(size));
  return cacheObj.put(fname, stringResponse)
    .catch((err) => {
      console.error(`*** Cache API: '${err.name}' ***`, err);
      alert('Oops: Error writing to Cache API, check console.');
    });
}

/* Add to Local Storage */
document.getElementById('buttAddLocal').addEventListener('click', addToLocalStorage);
function addToLocalStorage() {
  const key = `item_${Date.now().toString()}`;
  try {
    localStorage.setItem(key, getStr());
  } catch (ex) {
    console.error(`*** LocalStorage: '${ex.name}' ***`, ex);
    alert('Oops: Error writing to LocalStorage, check console.');
  }
}

/* Add to Session Storage */
document.getElementById('buttAddSession').addEventListener('click', addToSessionStorage);
function addToSessionStorage() {
  const key = `item_${Date.now().toString()}`;
  try {
    sessionStorage.setItem(key, getStr());
  } catch (ex) {
    console.error(`*** SessionStorage: '${ex.name}' ***`, ex);
    alert('Oops: Error writing to SessionStorage, check console.');
  }
}

/* Clear All Storage */
document.getElementById('buttClear').addEventListener('click', () => {
  clearAllStorage();
});
function clearAllStorage() {
  clearIDB();
  clearCacheStorage();
  localStorage.clear();
  sessionStorage.clear();
}
async function clearCacheStorage() {
  const cache = await caches.open('my-cache');
  const keys = await cache.keys();
  keys.forEach((key) => {
    cache.delete(key);
  });
}
async function clearIDB() {
  const keys = await idbKV.keys();
  keys.forEach((key) => {
    idbKV.del(key);
  });
}


/* State Of & Request Persistent Storage */
const buttPersist = document.getElementById('buttPersist');
const isPersisted = document.getElementById('persistResult');

if (navigator.storage && navigator.storage.persist) {
  buttPersist.removeAttribute('disabled');
  navigator.storage.persisted().then((val) => {
    isPersisted.textContent = val;
    console.log('has persistent storage (on load)', val);
    if (val) {
      buttPersist.setAttribute('disabled', true);
    }
  });
}
buttPersist.addEventListener('click', () => {
  navigator.storage.persist().then((val) => {
    isPersisted.textContent = val;
    console.log('has persistent storage', val);
    if (val) {
      buttPersist.setAttribute('disabled', true);
    }
  });
});


async function tryPersistWithoutPromtingUser() {
  if (!navigator.storage || !navigator.storage.persisted) {
    return "never";
  }
  let persisted = await navigator.storage.persisted();
  if (persisted) {
    return "persisted";
  }
  if (!navigator.permissions || !navigator.permissions.query) {
    return "prompt"; // It MAY be successful to prompt. Don't know.
  }
  const permission = await navigator.permissions.query({
    name: "persistent-storage"
  });
  if (permission.state === "granted") {
    persisted = await navigator.storage.persist();
    if (persisted) {
      return "persisted";
    } else {
      throw new Error("Failed to persist");
    }
  }
  if (permission.state === "prompt") {
    return "prompt";
  }
  return "never";
}


/* Install */
let a2hsPrompt;
const buttInstall = document.getElementById('buttInstall');
buttInstall.addEventListener('click', () => {
  buttInstall.setAttribute('disabled', true);
  a2hsPrompt.prompt();
});
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  buttInstall.removeAttribute('disabled');
  a2hsPrompt = e;
});

/* Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

/* Start updating the quota values */
if (navigator.storage) {
  updateQuota();
}
updateCount();


