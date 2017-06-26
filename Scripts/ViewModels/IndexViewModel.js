var app = window.app || {};
app.IndexViewModel = (function(ko,a,b,c,d,e,f,db){
    'use strict';
    var me = {
        filtersAvailableViewModel: a,
        mapViewModel: b,
        savePlaceViewModel: c,
        savedPlacesViewModel: d,
        searchPlaceViewModel: e,
        visitedPlacesViewModel: f,
        db: db,
        displayPlace: ko.observable(false),
        toggleDisplayPlace: toggleDisplayPlace,
        deletePlace: deletePlace
    };

    function toggleDisplayPlace(){
        if(me.displayPlace()){
            me.displayPlace(false)
        } else {
            me.displayPlace(true);
        }
    }

    function deletePlace(obj){
         db.deletePlace(ko.toJS(obj));
         db.getPlaces(function (data) {
            var a = [];
            ko.utils.arrayForEach(data || [], function (item) {
                a.push(new app.Place(item.name, item.id, item.tags, item.description, item.visited, item.visitedDate, item.visitedTimestamp, item.wasItGood, item.lngLat, item.point));
            });
            me.savePlaceViewModel.places(a);
        });
    }
    return me;
}(ko,app.FiltersAvailableViewModel, app.MapViewModel, app.SavePlaceViewModel, app.SavedPlacesViewModel, app.SearchPlaceViewModel, app.VisitedPlacesViewModel, app.DataContext));