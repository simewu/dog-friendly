let map, searchBox, searchService, markers, updateSearch, profile = null, circle = null;

let getQuery = query => 'explore#' + encodeURI(query.trim())

function initSearch() {
    let input = document.getElementById('external-search-bar');
    let searchBox = new google.maps.places.SearchBox(input);
    let onKeyPress = (e) => {
        if (e.which == 13) window.location.href = getQuery(input.value)
    };
    $('#external-search-bar').on('keypress', onKeyPress);

    return true
}

function initMap() {
    window.onresize();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.8930357,
            lng: -104.8009232
        },

        zoom: 15,
        backgroundColor: '#333',
        mapTypeId: 'terrain',
        
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: false,
        keyboardShortcuts: true,

        styles: [{
                "featureType": "all",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#e5c163"
                }]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#c4c4c4"
                }]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#e5c163"
                }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#e5c163"
                    },
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#e5c163"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#575757"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#2c2c2c"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#999999"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    });

    let input = document.getElementById('search-bar');
    let inputGroup = document.getElementById('search-group');
    let results = document.getElementById('search-results');

    searchBox = new google.maps.places.SearchBox();
    searchService = new google.maps.places.PlacesService(map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputGroup);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(results);

    circle = new google.maps.Circle({
        strokeColor: '#FFE694',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFE694',
        fillOpacity: 0.05,
        map: null,
        center: null,
        radius: 50
    });
        
    markers = [];
    window.updateSearch = () => {
        window.location.hash = encodeURI(input.value);
        let places = searchBox.getPlaces();
        if (places.length == 0) {
            results.innerHTML = '';
            if (input.value != '') setTimeout(() => alert('Your query returned no results for dog friendly establishments.\n\nTry searching for a different term, or for additional help you can contact us through the Support button.'), 500);
            return;
        }
        if (places.length == 1) {
            input.value = places[0].name;
        }
        let resultshtml = '';
        for (let place of places) {
            resultshtml += `<a href="javascript:putIntoView(${place.geometry.location.lat()},${place.geometry.location.lng()})" class="list-group-item">`;
            resultshtml += `<img src="${place.icon}" height="16px">&nbsp;${place.name}`;

            if (place.rating !== undefined) resultshtml += `<span class="badge badge-pill badge-search-result" style="float:right; margin-left: 10px">${place.rating} ${place.rating == 1 ? 'star' : 'stars'} (${place.user_ratings_total} ${place.user_ratings_total == 1 ? 'rating' : 'ratings'})</span>`;

            resultshtml += `<br><sub>${place.formatted_address}</sub>`;
            resultshtml += '</a>';
        }
        results.innerHTML = resultshtml;

        circle.setMap(null);
        markers.forEach(function(marker) {
            marker.setMap(null)
        });
        markers = [];

        let bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log('Returned place contains no geometry');
                return;
            }

            /*let icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };*/
            let usersHome = 'Your location'; // Another possibility: Have an input address for the directions, in the format: 'LAT,LNG'
            let latLng = place.geometry.location.lat() + ',' + place.geometry.location.lng();
            let marker = new google.maps.Marker({
                map: map,
                icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                    scaledSize: new google.maps.Size(45, 45),
                },
                title: place.name,
                position: place.geometry.location,
                animation: google.maps.Animation.DROP,
                directionsURL: 'https://www.google.com/maps/dir/' + usersHome + '/\'' + latLng + '\'',
                infowindowcontent: '<b>' + place.name + '</b><br><span>' + place.formatted_address.match(new RegExp('.{1,' + Math.max(30, place.name.length) + '}','g')).join('<br>') + '</span><br><br><a href="javascript:scrollTo(' + latLng + ')">Scroll into view</a><br><br><a target="_blank" href="https://www.google.com/maps/place/\'' + latLng + '\'">View in Google Maps</a><br><a target="_blank" href="https://www.google.com/maps/dir/' + usersHome + '/\'' + latLng + '\'">Get directions</a>'
            });

            markers.push(marker);

            if (place.geometry.viewport) bounds.union(place.geometry.viewport);
            else bounds.extend(place.geometry.location);
        });
        map.fitBounds(bounds);


        var infowindow = new google.maps.InfoWindow();
        for (let marker of markers) {
            marker.addListener('click', function() {
                infowindow.setContent(marker.infowindowcontent);
                infowindow.open(map, marker);
                //window.open(marker.directionsURL, '_blank');
            });
        }
    }



    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds())
    });
    searchBox.addListener('places_changed', window.updateSearch);

    // Take the URL search argument, and put it into the search bar
    let query = getHash();

    if (query != '') {
        input.value = query;
        makeSearchQuery(input.value);
    } // On query initialize

    map.addListener('tilesloaded', function(e) {
        inputGroup.style.display = 'flex';
        results.style.display = 'block'
    }); // Map loaded

    // Update the URI hash if not already done
    $('#search-bar').on('keypress', function(e) {
        if (e.which == 13) makeSearchQuery(input.value);
    });

    return true
}

function putIntoView(lat, lng) {
    scrollTo(lat, lng)
    if(circle != null) {
        circle.setMap(map);
        circle.setCenter(new google.maps.LatLng({lat: lat, lng: lng}));
    }
}

// Update the search query in the URL
function setHash(query) {
    query = query.trim();
    if (query == getHash()) return;
    if (query == '') clearSearch();
    else {
        if (/q=([A-z%0-9]*)/.exec(window.location.search) != null) window.history.pushState({}, document.title, '/explore');
        window.location.hash = encodeURI(query);
    }
}

function clearSearch() {
    //history.replaceState(null, null, ' ');
    window.history.pushState({}, document.title, '/explore');
    document.getElementById('search-results').innerHTML = '';
    circle.setMap(null);
    for (marker of markers) {
        marker.setMap(null);
    }
    markers = [];
}

// Get the current hash
function getHash() {
    let args = /q=([A-z%0-9]*)/.exec(window.location.search);
    if (args != null) {
        let query = args[1];
        window.history.pushState({}, document.title, '/explore');
        window.location.hash = query;
        return decodeURI(query)
    } else {
        return decodeURI(window.location.hash).replace(/#/, '').trim();
    }
}

function getFilters() {
    const checkbox = document.getElementById('search-dog-friendly');
    const filterBy = document.getElementById('search-filter-by');
    const near = document.getElementById('search-near');
    const contains = document.getElementById('search-contains');

    let filter = '';
    if (near != null && near.value.trim() != '') filter += 'AROUND(' + near.value.trim() + ') ';
    if (filterBy != null && filterBy.value.trim() != '') filter += 'category:' + filterBy.value.trim() + ' ';
    if (checkbox != null && checkbox.checked) filter += 'dog friendly ';
    if (contains != null && contains.value.trim() != '') filter += '"' + contains.value.trim().split(' ').join('" "') + '" ';
    filter = filter.trim();
    if (filter != '') filter += ' ';
    return filter;
}

// Given a string, make a map search query
function makeSearchQuery(query = document.getElementById('search-bar').value) {
    document.getElementById('search-bar').blur();
    let dropdown = document.getElementById('search-dropdown');
    if (dropdown != null) dropdown.classList.remove('open');
    query = query.trim();
    setHash(query);
    query = getFilters() + query;
    //query += "pet = ~dog"; // https://cloud.google.com/appengine/docs/standard/python/search/query_strings
    if (query == '') return;
    console.log('Query made: ' + query)
    let request = {
        query: query
    };
    if (searchBox.getBounds()) {
        request.bounds = searchBox.getBounds();
    }
    searchService.textSearch(request, function(places) {
        searchBox.set('places', places || [])
    });
    return true;
}

// Scroll to a specific location
function scrollTo(lat, lng) {
    if (lat == 0 || lng == 0) return true; // Prevent initialization error
    if (map.getZoom() != 18) map.setZoom(18);
    map.panTo(new google.maps.LatLng(lat, lng));
    return true;
}

function init() {
    gapi.load('auth2', function() {
        /* Ready. Make a call to gapi.auth2.init or some other API */
    });
    return true;
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    document.getElementById('profile-photo').src = profile.getImageUrl();
    document.getElementById('profile-photo').style.display = 'block';
    //document.getElementById('google-button').style.display = 'none';
    return true
}

window.onresize = () => {
    let width = window.innerWidth,
        height = window.innerHeight;
    let search = document.getElementById('external-search-bar');
    if (search != null) {
        if (search.offsetWidth < 350) {
            if (search.placeholder != 'Search') search.placeholder = 'Search';
        } else if (search.placeholder == 'Search') {
            search.placeholder = 'Where do you want to bring your dog?';
        }
    }
    search = document.getElementById('search-bar');
    if (search != null) {
        if (search.offsetWidth < 254) {
            if (search.placeholder != 'Search') search.placeholder = 'Search';
        } else if (search.placeholder == 'Search') {
            search.placeholder = 'What can we help you locate?';
        }
    }
}

$(document).bind("DOMNodeInserted",function(e){
    if(e.target.id == 'launcher') {
        var content = (e.target.contentWindow || e.target.contentDocument);
        let d = content.document;
        if(!d) return;
        setTimeout(() => {
            d.getElementsByClassName('wrapper-AtBcr')[0].style = 'background-color: #444 !important;';
        }, 500);
    }
});


function simpleTest() {
    return 42;
}

try {
    module.exports = {
        simpleTest: simpleTest,
        getQuery: getQuery,
        initSearch: initSearch,
        initMap: initMap,
        setHash: setHash,
        clearSearch: clearSearch,
        getHash: getHash,
        getFilters: getFilters,
        makeSearchQuery: makeSearchQuery,
        scrollTo: scrollTo,
        init: init,
        onSignIn: onSignIn,
    }
} catch (e) {}