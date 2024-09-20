document.addEventListener("DOMContentLoaded", function() {
    if ("Notification" in window && localStorage.getItem("notificationPermissionRequested") !== "true") {
        if (Notification.permission === "default") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Notificações habilitadas.");
                } else {
                    console.log("Notificações desabilitadas.");
                }
                // Marcar que a permissão foi solicitada
                localStorage.setItem("notificationPermissionRequested", "true");
            });
        }
    }
});