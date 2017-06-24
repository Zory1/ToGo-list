var app = window.app || {};
app.IndexViewModel = (function(a,b,c,d,e,f){
    'use strict';
    var me = {
        filtersAvailableViewModel: a,
        mapViewModel: b,
        placeViewModel: c,
        savedPlacesViewModel: d,
        searchPlaceViewModel: e,
        visitedPlacesViewModel: f
    };
    return me;
}(app.FiltersAvailableViewModel, app.MapViewModel, app.PlaceViewModel, app.SavedPlacesViewModel, app.SearchPlaceViewModel, app.VisitedPlacesViewModel));