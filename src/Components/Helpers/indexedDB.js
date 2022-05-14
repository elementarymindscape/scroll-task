import { useEffect } from 'react';

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

export function IndexedDB({ eventData }) {
  useEffect(() => {
    const request = indexedDB.open('EventsDatabase', 1);

    request.onerror = function(event) {
      console.error('An error occurred with IndexedDB');
      console.error(event);
    };

    request.onupgradeneeded = function() {
      const db = request.result;
      const store = db.createObjectStore('Events', { keyPath: 'id' });
      console.error(store);
    };

    request.onsuccess = function() {
      console.log('Database opened successfully');

      const db = request.result;

      const transaction = db.transaction('Events', 'readwrite');

      const store = transaction.objectStore('Events');

      eventData.forEach(e => {
        store.put({
          id: e.id,
          datetime_utc: e.datetime_utc,
          title: e.title,
          popularity: e.popularity,
          url: e.url,
        });
      });
      transaction.oncomplete = function() {
        db.close();
      };
    };
  }, [eventData]);

  return null;
}
