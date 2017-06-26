var app = window.app || {};
app.SavePlaceViewModel = (function(ko,db){
    'use strict';
    var me = {
        visited: ko.observable(false),
        visitedDate: ko.observable(),
        name: ko.observable(),
        tags: ko.observableArray(),
        description: ko.observable(),
        wasItGood: ko.observable("not sure"),
        point: ko.observable(),
        lngLat: ko.observable(),
        places: ko.observableArray([]),
        addTag: addTag,
        removeTag: removeTag,
        savePlace: savePlace,
        cancelSavePlace: cancelSavePlace,
        nullifyPlace: nullifyPlace
    };

    function _init() {
        db.getPlaces(function (data) {
            var a = [];
            ko.utils.arrayForEach(data || [], function (item) {
                a.push(new app.Place(item.name, item.id, item.tags, item.description, item.visited, item.visitedDate, item.visitedTimestamp, item.wasItGood, item.lngLat, item.point));
            });
            me.places(a);
        });
    }

    function addTag(tag){
        if(typeof tag != "undefined" && tag.length > 0)me.tags.push(tag);
    }

    function removeTag(tag){
        if(typeof tag != "undefined" && tag.length > 0)me.tags.remove(tag);
    }

    function savePlace(){
        var place = {};
        place.id = new Date().getTime();
        place.name = me.name();
        place.tags = me.tags();
        place.description = me.description();
        place.visited = me.visited();
        place.visitedDate = "n/a";
        place.visitedTimestamp = 0;
        place.wasItGood = "n/a";

        if(place.visited){
            place.visitedDate = me.visitedDate();
            place.visitedTimestamp = new Date(me.visitedDate()).getTime();
            place.wasItGood = me.wasItGood();
        }

        place.lngLat = me.lngLat();
        place.point = me.point();
        console.log("Item to be added:");
        console.log(place)

        //TODO: need to implement feedback to user so she can input req values (later, if still relevant)
        if(place.name && place.lngLat && place.point){
            me.places.push(new app.Place(place.name, place.id, place.tags, place.description, place.visited, place.visitedDate, place.visitedTimestamp, place.wasItGood, place.lngLat, place.point));
            db.savePlace(place);
        }
        me.nullifyPlace();
    }

    function cancelSavePlace(){
        me.nullifyPlace();
    }

    function nullifyPlace(){
        //there is probably a better way of doing this. TODO: research ko API, if still relevant.
        me.visited(false);
        me.visitedDate('');
        me.name('');
        me.tags([]);
        me.description('');
        me.wasItGood("not sure");
        me.point('');
        me.lngLat('')  
    }

    _init();
    return me;
}(ko, app.DataContext));