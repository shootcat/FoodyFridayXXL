// Gemeinsame JavaScript-Funktionen für alle Seiten

// Hintergrundanimation erstellen
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Zufällige Größe
        const size = Math.random() * 100 + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Zufällige Position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Zufällige Opazität
        const opacity = Math.random() * 0.2 + 0.1;
        particle.style.opacity = opacity;
        
        // Zufällige Animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
}

// Wetterdaten aktualisieren
function updateWeather() {
    const weatherCity = document.querySelector('.weather-city');
    if (!weatherCity) return;
    
    const cities = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const temps = [22, 23, 24, 25, 26, 27, 28];
    const randomTemp = temps[Math.floor(Math.random() * temps.length)];
    const weatherTypes = [
        {icon: 'fa-sun', desc: 'Sonnig'},
        {icon: 'fa-cloud-sun', desc: 'Teilweise bewölkt'},
        {icon: 'fa-cloud', desc: 'Bewölkt'},
        {icon: 'fa-cloud-showers-heavy', desc: 'Regnerisch'}
    ];
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    
    weatherCity.textContent = randomCity;
    document.querySelector('.weather-temp').textContent = `${randomTemp}°C`;
    document.querySelector('.weather-icon i').className = `fas ${randomWeather.icon}`;
    document.querySelector('.weather-desc').textContent = randomWeather.desc;
}

// Scroll-Header-Effekt
function initScrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Suchfunktionalität
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
                window.open(googleSearchUrl, '_blank');
            }
        });
    }
});

// Essensplan initialisieren
function initMealPlan() {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthEl = document.getElementById('currentMonth');
    
    if (!prevMonthBtn || !nextMonthBtn || !currentMonthEl) return;
    
    let currentDate = new Date();
    currentDate.setDate(1);
    
    function updateCalendar() {
        const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
                           "Juli", "August", "September", "Oktober", "November", "Dezember"];
        
        currentMonthEl.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        // Hier würde der Kalender mit den Essensdaten befüllt werden
    }
    
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });
    
    updateCalendar();
}

// Admin-Bereich initialisieren
function initAdminPage() {
    const menuItems = document.querySelectorAll('.admin-menu-item');
    const tabs = document.querySelectorAll('.admin-tab');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Aktiven Menüpunkt markieren
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Richtigen Tab anzeigen
            const tabId = this.getAttribute('data-tab') + '-tab';
            tabs.forEach(tab => {
                tab.style.display = 'none';
                if (tab.id === tabId) {
                    tab.style.display = 'block';
                }
            });
        });
    });
    
    // News Editor Funktionen
    const newNewsBtn = document.getElementById('newNewsBtn');
    const newsEditor = document.getElementById('newsEditor');
    const cancelEdit = document.getElementById('cancelEdit');
    
    if (newNewsBtn && newsEditor && cancelEdit) {
        newNewsBtn.addEventListener('click', function() {
            newsEditor.style.display = 'block';
        });
        
        cancelEdit.addEventListener('click', function() {
            newsEditor.style.display = 'none';
        });
    }
}