import { SetStateAction, useEffect, useState } from 'react';
import './App.css'

function App() {
  const [supportsPWA, setSupportsPWA] = useState(true);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    // Enregistrement du service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/service-worker.js');
          console.log('Service Worker enregistré : ', registration);
        } catch (error) {
          console.error('Échec de l enregistrement du Service Worker : ', error);
        }
      });
    }

    // Demande d'autorisation de notification
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          console.warn('Permission de notification non accordée.');
        }
      });
    }
  }, []);

  function handleSendNotification(): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Titre de la notification', {
        body: 'Corps de la notification',
        icon: 'chemin/vers/une/image.png' // Facultatif : chemin de l'icône pour la notification
      });
    }
  }


  return (
    <div>
        <button onClick={() => handleSendNotification()}>
          Installer l'application
        </button>
    </div>
  );
}

export default App
