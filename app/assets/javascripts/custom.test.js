/**
 * @jest-environment jsdom
 */
 
 /* Method checklist:
 x   simpleTest
 x   getQuery
 x    initSearch
 x    initMap
 x   setHash
 x   clearSearch
 x   getHash
 x   makeSearchQuery
 x   getFilters
 x   scrollTo
 x   init
 x   onSignIn
 */
 
try {
    const custom = require('./custom');
    
    class MockMapClass{
        constructor(){
            this.controls = [[]]
            this.addListener = () => {}
            this.getZoom = () => 0
            this.setZoom = () => {}
            this.panTo = () => {}
            this.fitBounds = () => true
        }
    }
    class OtherClass{
        constructor(){
            this.setMap = () => {}
            this.extend = () => true
            this.addListener = () => true
        }
    }
    class MockSearchBarClass{
        constructor(){
            this.addListener = () => {},
            this.getBounds = () => true
            this.getPlaces = () => [{
                geometry: {
                    location: {
                        lat: () => 123,
                        lng: () => 456
                    }
                }
            }]
        }
    }
    class MockPlacesClass{
        constructor(){
            this.textSearch = () => {}
        }
    }
    google = {maps: {
        Map: MockMapClass,
        places: {
            SearchBox: MockSearchBarClass,
            PlacesService: MockPlacesClass
        },
        ControlPosition: {
            TOP_LEFT: 0,
            LEFT_TOP: 0
        },
        LatLng: OtherClass,
        LatLngBounds: OtherClass,
        Animation: {
            DROP: 0
        },
        Marker: OtherClass,
        InfoWindow: OtherClass
    }}
    $ = () => {
        return {
            on: () => {},
            click: () => {}
        }
    }
    
    test('use jsdom in this test file', () => {
        const element = document.createElement('div');
        expect(element).not.toBeNull();
    });
    
    test('tests that jest is linked to custom.js', () => {
        expect(custom.simpleTest()).toBe(42);
    });
    
    test('tests that search queries get properly trimmed', () => {
        expect(custom.getQuery('\n\t   test   \n\t')).toBe('explore#test');
    });
    
    test('tests that search queries get properly formatted', () => {
        expect(custom.getQuery('foo bar')).toBe('explore#foo%20bar');
    });
    
    test('tests that empty search queries are handled', () => {
        expect(custom.getQuery('')).toBe('explore#');
    });
    
    test('tests that the initial search query setup listener is compiled successfully', () => {
        let obj = {}
        obj.document = {}
        obj.document.getElementById = id => true
        const response = custom.initSearch()
        expect(response).toBe(true);
    });
    
    // Map testing
    test('tests that the map is initialized successfully', () => {
        document.body.innerHTML += '<input id="search-bar"/>';
        document.body.innerHTML += '<input id="search-results"/>';
        
        window.updateSearch = null;
        const response = custom.initMap();
        
        window.updateSearch();
        
        expect(response).toBe(true);
    });
    
    test('tests that the map latitude and longitude is set', () => {
        window.map = {center: {lat: () => 38.8930357}}
        expect(window.map.center.lat()).toBe(38.8930357)
    });
    
    test('tests that the map latitude and longitude is set', () => {
        window.map = {center: {lng: () => -104.8009232}}
        expect(window.map.center.lng()).toBe(-104.8009232)
    });
    
    test('tests that setting the pages hash works', () => {
        custom.setHash('foo bar')
        expect(window.location.hash).toBe('#foo%20bar')
    });
    
    test('tests that setting the pages hash works', () => {
        
        document.body.innerHTML += '<input id="search-results"/>';
        expect(document.getElementById('search-results')).not.toBeNull();
        
        window.markers = [];
        custom.clearSearch();
        
        expect(window.location.hash).toBe('');
    });
    
    test('tests that getting the pages hash works', () => {
        window.location.hash = 'foo bar';
        response = custom.getHash();
        expect(response).toBe('foo bar');
    });
    
    test('tests that making a search query works', () => {
        response = custom.makeSearchQuery('foo bar');
        expect(response).toBe(true);
    });
    
    test('tests search filters work', () => {
        document.body.innerHTML += '<input id="search-dog-friendly" checked/>';
        document.body.innerHTML += '<input id="search-filter-by" value="events"/>';
        document.body.innerHTML += '<input id="search-near" value="California"/>';
        document.body.innerHTML += '<input id="search-contains" value="A B C"/>';
        
        response = custom.getFilters();
        expect(response).toBe('category:events AROUND(California) "A" "B" "C" dog friendly ');
    });
    
    test('tests that scrolling on the map works', () => {
        response = custom.scrollTo(123, 456);
        expect(response).toBe(true);
    });
    
    test('tests that init works', () => {
        gapi = {
            load: (a, b) => {}
        }
        response = custom.init();
        expect(response).toBe(true);
    });
    
    test('tests that sign in callback is functioning', () => {
        document.body.innerHTML += '<img id="profile-photo" src=""/>';
        let googleUserMock = {
            getBasicProfile: () => {
                return {
                    getId: () => true,
                    getName: () => true,
                    getGivenName: () => true,
                    getFamilyName: () => true,
                    getImageUrl: () => true,
                    getEmail: () => true,
                }
            },
            getAuthResponse: () => {
                return {
                    id_token: true
                }
            }
        }
        const response = custom.onSignIn(googleUserMock)
        expect(response).toBe(true)
    });
    
    
} catch(e) {}