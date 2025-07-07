// Firebase Initialisierung und Chat-Funktionen

// Firebase-Konfiguration - Hier Ihre eigenen Werte eintragen
const firebaseConfig = {
     apiKey: "AIzaSyCnJByYr-O4k174w1IXRz1QcrS1b-TVPow",
     authDomain: "ff-komentare.firebaseapp.com",
     projectId: "ff-komentare",
     storageBucket: "ff-komentare.firebasestorage.app",
     messagingSenderId: "1007258832780",
     appId: "1:1007258832780:web:779e56da27b0948f5350a9
};

// Firebase initialisieren
let firebaseInitialized = false;
let db, auth;

function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        firebaseInitialized = true;
    }
}

// Chat initialisieren
function initChat() {
    if (!firebaseInitialized) return;
    
    const loginButton = document.getElementById('loginButton');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const onlineCount = document.getElementById('onlineCount');
    const onlineUsersList = document.getElementById('onlineUsersList');
    
    // Anmeldefunktion
    loginButton.addEventListener('click', function() {
        // Hier würde die eigentliche Anmeldung implementiert werden
        // Für die Demo simulieren wir einen eingeloggten Benutzer
        
        const demoUser = {
            displayName: "Max Mustermann",
            uid: "demo123",
            email: "max@beispiel.de"
        };
        
        auth.currentUser = demoUser;
        updateUserUI(demoUser);
        
        loginButton.textContent = "Abmelden";
        messageInput.disabled = false;
        sendButton.disabled = false;
    });
    
    // Benutzeroberfläche aktualisieren
    function updateUserUI(user) {
        if (user) {
            userName.textContent = user.displayName;
            const initials = user.displayName.split(' ').map(n => n[0]).join('');
            userAvatar.textContent = initials;
        } else {
            userName.textContent = "Gast Benutzer";
            userAvatar.textContent = "GU";
        }
    }
    
    // Nachricht senden
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        if (!auth.currentUser || !messageInput.value.trim()) return;
        
        const message = messageInput.value.trim();
        
        // Hier würde die Nachricht an Firebase gesendet werden
        // db.collection("messages").add({ ... })
        
        // Für die Demo fügen wir die Nachricht lokal hinzu
        addMessageToUI({
            text: message,
            user: auth.currentUser.displayName,
            userId: auth.currentUser.uid,
            timestamp: new Date()
        });
        
        messageInput.value = '';
    }
    
    // Nachricht zur UI hinzufügen
    function addMessageToUI(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="message-avatar">${message.user.split(' ').map(n => n[0]).join('')}</div>
            <div class="message-content">
                <div class="message-user">${message.user}</div>
                <div class="message-text">${message.text}</div>
                <div class="message-time">${formatTime(message.timestamp)}</div>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Zeit formatieren
    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Online-Benutzer simulieren
    const demoUsers = [
        { name: "Thomas Schmidt", status: "online" },
        { name: "Anna Schulz", status: "online" },
        { name: "Michael Weber", status: "away" },
        { name: "Julia Becker", status: "online" },
        { name: "David Wagner", status: "offline" }
    ];
    
    function updateOnlineUsers() {
        const onlineUsers = demoUsers.filter(u => u.status === "online" || u.status === "away");
        onlineCount.textContent = onlineUsers.length;
        
        onlineUsersList.innerHTML = '';
        onlineUsers.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name;
            if (user.status === "away") {
                li.style.opacity = 0.7;
            }
            onlineUsersList.appendChild(li);
        });
    }
    
    updateOnlineUsers();
    setInterval(updateOnlineUsers, 30000); // Alle 30 Sekunden aktualisieren
}
