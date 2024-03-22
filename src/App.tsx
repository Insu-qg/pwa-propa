import './App.css'

function App() {



  function handleInstall(): void {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        new Notification('Installation de l\'application', {
          body: 'L\'application est en cours d\'installation.'
        });
      }
    });
  }



  return (
    <div>
        <button onClick={() => handleInstall()}>
          Installer l'application
        </button>
    </div>
  );
}

export default App
