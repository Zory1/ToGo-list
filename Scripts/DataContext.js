var app = window.app || {};
app.DataContext = (function ($) {
    'use strict';
    var me = {
        deletePlace: deletePlace,
        getPlaces: getPlaces,
        savePlace: savePlace,
        editPlace: editPlace,
        getPlace: getPlace,
        deleteAllPlaces: deleteAllPlaces
    };

    function deletePlace(obj) {
        var places = localStorage["places"],
            data = [],
            exists = false,
            i = 0,
            l = 0;
        if (places) {
            data = JSON.parse(places);
            if ($.isArray(data)) {
                for (i = 0, l = data.length; i < l; i++) {
                    if (data[i].id === obj.id) {
                        exists = true;
                        break;
                    }
                }
                if (exists) {
                    data.splice(i, 1);
                }
            }
            localStorage["places"] = JSON.stringify(data);
        }
    }

    
    function getPlaces(callback) {
        var places = [];
        if ($.isFunction(callback)) {
            if(typeof localStorage["places"]== "undefined") {
                localStorage["places"]=JSON.stringify([]);
                return callback(null);
            }
            
            callback(JSON.parse(localStorage["places"]));
        }
    }


    function savePlace(obj) {
        var places = localStorage["places"],
            data = [],
            exists = false,
            i = 0,
            l = 0;
        if (places) {
            data = JSON.parse(places);
            if ($.isArray(data)) {
                for (i = 0, l = data.length; i < l; i++) {
                    if (data[i].name === obj.name && data[i].lngLat.lat === obj.lngLat.lat && data[i].lngLat.lng === obj.lngLat.lng) {
                        data[i] = obj;
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    data.push(obj);
                }
                localStorage["places"] = JSON.stringify(data);
            }
        }
    }


    function editPlace(id){
        //implement once I need it in GUI
    }


    function getPlace(id){
        //implement once I need it in GUI
    }


    function deleteAllPlaces(){
        //implement once I need it in GUI
    }

    return me;
}(jQuery));