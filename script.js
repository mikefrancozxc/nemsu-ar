import mapboxgl from 'mapbox-gl';
import 'aframe';
mapboxgl.accessToken = "pk.eyJ1IjoibWlrZWZyYW5jb3EiLCJhIjoiY2xqOHg4ZGR6MHU3aTNzcXBqNm1vemV5YiJ9.lek5_593XJy1bE-UjhzgwA";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
});

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([8.633157, 126.093582]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });

  map.addControl(directions, "top-left");

  var markers = [
    {
      name: 'Administrative Building',
      coordinates: { lat: 8.633317, lng: 126.093709 },
      info: 'This is the administrative building.',
      image: 'images/admin-office.jpg'
    },
    {
      name: 'Hotel / HM Building',
      coordinates: { lat: 8.633368, lng: 126.093393 },
      info: 'This is the hotel / HM building.',
      image: 'images/HM-Building.jpg'
    },
    {
      name: 'Old Academic Building',
      coordinates: { lat: 8.633939, lng: 126.093858 },
      info: 'This is the old academic building.',
      image: 'images/Old-Building.jpg'
    },
    {
      name: 'New Academic Building',
      coordinates: { lat: 8.634180, lng: 126.093542 },
      info: 'This is the new academic building.',
      image: 'images/New-Building.jpg'
    },
    {
      name: 'Auditorium',
      coordinates: { lat: 8.634167, lng: 126.092871 },
      info: 'This is the auditorium.',
      image: 'images/Auditorium.jpg'
    },
    {
      name: 'Main Gate',
      coordinates: { lat: 8.633157, lng: 126.093582 },
      info: 'This is the main gate.',
      image: 'images/Main-Gate.jpg'
    }
    // Add more markers here...
  ];
  

  markers.forEach(marker => {
    // Create a Mapbox marker pin
    var mapMarker = new mapboxgl.Marker()
      .setLngLat(marker.coordinates)
      .addTo(map);
  
    // Create a popup for the marker
    var popupContent = document.createElement('div');
    popupContent.innerHTML = `
      <h3>${marker.name}</h3>
      <p>Coordinates: ${marker.coordinates.lat.toFixed(6)}, ${marker.coordinates.lng.toFixed(6)}</p>
      <p>${marker.info}</p>
      <button class="ar-button">View AR</button>
    `;
  
    // Create a Mapbox popup using the popup content
    var popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false }).setDOMContent(popupContent);
  
    // Handle marker click to open the popup
    mapMarker.getElement().addEventListener('click', function () {
      popup.addTo(map).setLngLat(marker.coordinates);
    });
    
    // Handle popup button click to redirect to panorama.html
    popupContent.querySelector('.ar-button').addEventListener('click', function () {
      window.location.href = `panorama.html?image=${marker.image}`;
    });
  });  
}

// Usage example:
setupMap([8.633157, 126.093582]);
