import { useState } from 'react';
import './App.css'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

function App() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
 

  function handleInstall(): void {
    // let installPrompt: BeforeInstallPromptEvent | null = null
    const installButton = document.querySelector("#install")!;

    window.addEventListener("beforeinstallprompt", (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      //installPrompt = event;
      setInstallPrompt(event)
    });

    installButton?.addEventListener("click", async () => {
      if (!installPrompt) {
        return;
      }
      await installPrompt.prompt();
      disableInAppInstallPrompt();
    });

    function disableInAppInstallPrompt() {
      // installPrompt = null;
      setInstallPrompt(null)
      installButton.setAttribute("hidden", "");
    }

    // notif test
    // Notification.requestPermission().then(function(permission) {
    //   if (permission === 'granted') {
    //     new Notification('Installation de l\'application', {
    //       body: 'L\'application est en cours d\'installation.'
    //     });
    //   }
    // });
  }


  return (
    <div>
        <button id="install" onClick={() => handleInstall()}>
          Installer l'application
        </button>
    </div>
  );
}

export default App
