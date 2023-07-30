const container = document.querySelector(".container")
const coffees = [
  { name: "Perspiciatis", image: "images/food-1.png" },
  { name: "Voluptatem", image: "images/food-2.png" },
  { name: "Explicabo", image: "images/food-3.png" },
  { name: "Rchitecto", image: "images/pic1.jpg" },
  { name: " Beatae", image: "images/pic2.jpg" },
  { name: " Vitae", image: "images/food-1.png" },
  { name: "Inventore", image: "images/food-2.png" },
  { name: "Veritatis", image: "images/food-3.png" },
  { name: "Accusantium", image: "images/pic2.jpg" },
];

const showCoffees = () => {
    let output = ""
    coffees.forEach(
      ({ name, image }) =>
        (output += `
                <div class="card">
                  <img class="card--avatar" src=${image} />
                  <h1 class="card--title">${name}</h1>
                  <a class="card--link" href="#">Taste</a>
                </div>
                `)
    )
    container.innerHTML = output
}
  
document.addEventListener("DOMContentLoaded", showCoffees);

/************* SERVICE WORKER CODE *************/

// const push_msg_btn = document.getElementById("push_msg_btn");
// push_msg_btn.addEventListener("click",() => subscribeUserToPush())

// function getVapidKey(){
//   let str = "BAqyYHN4f03H-2icEri9vVWJxvIYgW57ajqxbnw9nDuOE-M1f3OJzSq6TT0jBsFaQ-vCIut29iso21J4epyQtNM";
//   let padding = "=".repeat((4 - str.length % 4) % 4);
//   let base64 = (str+padding).replace(/\-/g,"+").replace(/_/g,"/");
//   let raw = window.atob(base64);
//   let output = new Uint8Array(raw.length);
//   for(let i=0;i<raw.length;++i){
//       output[i] = raw.charCodeAt(i);
//   }
//   return output;
// }

// const subscribeUserToPush = () => {
//   if ('Notification' in window) {
//     Notification.requestPermission().then(permission => {
//       if (permission === 'granted') {
//         // Permission to show notifications has been granted
//         // Now, subscribe the user to push notifications
//         navigator.serviceWorker.ready.then(registration => {
//           return registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: getVapidKey()
//           });
//         }).then(subscription => {
//           console.log('User subscribed:', JSON.stringify(subscription));
//           // Send the subscription information to your server for future use
//           // This information will be used to send push notifications from the server
//         }).catch(error => {
//           console.error('Failed to subscribe the user:', error);
//         });
//       } else {
//         console.warn('Permission for notifications was denied.');
//       }
//     });
//   }else{
//     alert("push notification will not going to work in your browser.");
//   }
// }

// Request permission for Background Sync
// navigator.serviceWorker.ready
//   .then(registration => registration.sync.register('my-background-sync'))
//   .then(() => {
//     console.log('Background Sync registered successfully!');
//   })
//   .catch(error => {
//     console.error('Background Sync registration failed:', error);
//   });

//service worker registration.
if("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
    .then(registration => {
      console.log('Service Worker registered: ', registration);
    })
    .catch(error => console.error('Service Worker registration failed: ', error));
  })
}else{
  alert("your browser does not support serviceWorker!");
}












// function my_custom_func_notifyUserToUpdate(worker) {
  // Customize this function to notify the user that a new version is available
  // and ask them to update the service worker.
  // console.log('New service worker version available. Please update.');
  // Example: You can show a toast message or display a banner to prompt the user to update.
// }

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('Service Worker registered: ', registration);

//         // Check if there's a new service worker waiting to be activated
//         if (registration.waiting) {
//           console.log("new service worker waiting to be activated");
//           // Notify the user and update the service worker immediately
//           // my_custom_func_notifyUserToUpdate(registration.waiting);
//         }

//         // Check for service worker updates
//         registration.addEventListener('updatefound', () => {
//           // A new service worker is found, and it is installing.
//           console.log("A new service worker is found, and it is installing.");
//           const newWorker = registration.installing;

//           if (newWorker) {
//             newWorker.addEventListener('statechange', () => {
//               if (newWorker.state === 'installed') {
//                 // Notify the user and update the service worker when it is installed.
//                 // my_custom_func_notifyUserToUpdate(newWorker);
//               }
//             });
//           }
//         });

//       })
//       .catch(error => {
//         console.error('Service Worker registration failed: ', error);
//       });
//   });
// }