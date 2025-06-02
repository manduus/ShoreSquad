// ShoreSquad App.js

// Constants for API endpoints
const API_ENDPOINTS = {
    FORECAST: 'https://api.data.gov.sg/v1/environment/4-day-weather-forecast',
    TEMPERATURE: 'https://api.data.gov.sg/v1/environment/air-temperature',
    WIND: 'https://api.data.gov.sg/v1/environment/wind-speed'
};

// State Management
const state = {
    events: [],
    weather: null,
    userLocation: null
};

// Event Handlers
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    try {
        await getUserLocation();
        await Promise.all([
            loadEvents(),
            loadWeather(),
            initializeMap()
        ]);
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Unable to load some features. Please try again later.');
    }
}

// Geolocation
async function getUserLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    state.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    resolve(state.userLocation);
                },
                error => {
                    console.error('Error getting location:', error);
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation not supported'));
        }
    });
}

// Events Management
async function loadEvents() {
    // This would typically fetch from your backend
    // For now, we'll use mock data
    state.events = [
        {
            id: 1,
            title: 'Sunday Beach Cleanup',
            date: '2025-06-15',
            location: 'Sunset Beach',
            participants: 12
        },
        // Add more mock events...
    ];
    renderEvents();
}

function renderEvents() {
    const eventsGrid = document.querySelector('.events-grid');
    if (!eventsGrid) return;

    eventsGrid.innerHTML = state.events.map(event => `
        <div class="event-card" data-event-id="${event.id}">
            <h3>${event.title}</h3>
            <p>${event.date}</p>
            <p>${event.location}</p>
            <p>${event.participants} participants</p>
            <button onclick="joinEvent(${event.id})" class="join-button">
                Join Cleanup
            </button>
        </div>
    `).join('');
}

// Weather Integration
async function loadWeather() {
    if (!state.userLocation) return;
    
    // This would typically fetch from a weather API
    // For now, we'll use mock data    const mockWeather = {
        temperature: 24, // in Celsius
        condition: 'Sunny',
        windSpeed: 8, // in km/h
        tideLevel: 'Low'
    };
    
    state.weather = mockWeather;
    renderWeather();
}

function renderWeather() {
    const weatherWidget = document.querySelector('.weather-widget');
    if (!weatherWidget || !state.weather) return;    weatherWidget.innerHTML = `
        <div class="weather-info">
            <h3>Current Conditions</h3>
            <p>${state.weather.temperature}°C</p>
            <p>${state.weather.condition}</p>
            <p>Wind: ${state.weather.windSpeed} km/h</p>
            <p>Tide: ${state.weather.tideLevel}</p>
        </div>
    `;
}

// Map Integration
async function initializeMap() {
    // This would typically initialize a map service
    // You'll need to add your preferred map service library
    console.log('Map initialization pending...');
}

// UI Helpers
function showError(message) {
    // Create and show an error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Event Interactions
function joinEvent(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event) return;
    
    event.participants++;
    renderEvents();
    showError(`Successfully joined ${event.title}!`);
}
