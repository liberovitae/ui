export const askPermission = () => {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (
      result,
    ) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== 'granted') {
      // throw new Error("We weren't granted permission.");
      console.error("We weren't granted permission!");
    }
  });
};

export const unsubscribePush = (id, username, type) => {
  let subscriptions = JSON.parse(
    localStorage.getItem('subscriptions'),
  );
  delete subscriptions[type];
  localStorage.setItem(
    'subscriptions',
    JSON.stringify(subscriptions),
  );
};

export const subscribeUserToPush = async (currentUserId, type) => {
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register(
    '/service-worker.js',
    {
      scope: '/',
    },
  );

  console.log('Service Worker Registered...');

  // // Register Push
  // console.log('Registering Push...');
  const subscription = await register.pushManager.subscribe(
    {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.REACT_APP_VAPID_PUBLIC_KEY,
      ),
    },
    (data, error) => console.log(data, error),
  );
  console.log('Push Registered...');

  return subscription;
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
