ko.bindingHandlers.mapbox = {
    init: function (element,valueAccessor, allBindings) {
        if (typeof(L) !== 'undefined') {
            var options = allBindings().mapOptions;
            var mapBox = L.mapbox.map(element, 'mapbox.streets',options);
            element._mapBox = mapBox;
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof (L) === 'undefined') {
            return;
        }

        if (element._mapBoxLayer) {
            element._mapBox.removeLayer(element._mapBoxLayer);
        }

        var bindings = allBindingsAccessor();
        var points = bindings.mapbox();

        if (points && points.length > 0) {
            var geojson = {
                type: 'FeatureCollection',
                features: points.map(function(point) {
                    var lat = point.lat();
                    var lng = point.lng();

                    return {
                        type: 'Feature',
                        properties: {
                            'marker-color': '#f86767',
                            'marker-size': 'large',
                            'marker-symbol': 'star'
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        }
                    };
                })
            };

            element._mapBoxLayer = L.mapbox.featureLayer(geojson);
            element._mapBoxLayer.addTo(element._mapBox);
            element._mapBox.fitBounds(element._mapBoxLayer.getBounds());
        }
    }
};

var app = window.app || {};
app.MapViewModel = (function(){
    'use strict';
    var map = {};

    //TODO: if still relevant, skill up on custom bindings and create proper MapViewModel.js  
    return map;
}());