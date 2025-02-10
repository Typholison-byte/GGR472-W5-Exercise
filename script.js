mapboxgl.accessToken = 'pk.eyJ1IjoibGFrZWVyaWUiLCJhIjoiY201cG5nbmptMDM0eDJxb215YXB0OGV0ZSJ9.yGNd3OQ2HqXdTSTuJcD9ug'; // Add default public map token from your Mapbox account 

const map = new mapboxgl.Map({
    container: 'my-map', // map container ID 
    style: 'mapbox://styles/mapbox/streets-v12', // style URL 
    center: [-75, 60], // starting position [lng, lat] 
    zoom: 3, // starting zoom level
});

map.on('load', () => {
    // Add a data source containing GeoJSON data     
    map.addSource('uoft-data', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {
                    "name": "Sidney Smith Hall"
                },
                "geometry": {
                    "coordinates": [-79.39865237301687, 43.662343395037766],
                    "type": "Point"
                }
            }]
        }
    }); map.addLayer({
        'id': 'uoft-pnt',
        'type': 'circle',
        'source': 'uoft-data',
        'paint': {
            'circle-radius': 6, 'circle-color': '#B42222'
        }
    });

    // Add a data source from a GeoJSON file 
    map.addSource('buildings-data', {
        type: 'geojson', data: '...' // Your URL to your buildings.geojson file 
    });

    map.addLayer({
        'id': 'buildings-point',
        'type': 'circle',
        'source': 'buildings-data',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    });

    // Add a data source from a Mapbox tileset    
    map.addSource('...', { // Create your own source ID         
        'type': 'vector',
        'url': 'mapbox://username.…' // Update to your mapbox tileset ID     
    });
    map.addLayer({
        'id': '...', // Create your own layer ID         
        'type': 'fill', // Note this is different to point data         
        'source': '...', // Must match source ID from addSource Method         
        'paint': {
            'fill-color': '#888888', // Test alternative colours and style properties             
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        },
        'source-layer': '...' // Tileset NAME (diff to ID), get this from mapbox tileset page     
    }, 'uoft-buildings' // Drawing order - places layer below points         
    // // Here the addlayer method takes 2 arguments (the layer as an object and a string for another layer's name). If the other layer already exists, the new layer will be drawn before that one     
    ); 
});