var app = window.app || {};
app.Place = function (name, id, tags, description, visited, visitedDate, visitedTimestamp, wasItGood, lngLat, point) {
    'use strict';
    this.name = ko.observable(name);
    this.id = ko.observable(id);
    this.tags = ko.observableArray(tags);
    this.description = ko.observable(description);
    this.visited = ko.observable(visited);
    this.visitedDate = ko.observable(visitedDate);
    this.visitedTimestamp = ko.observable(visitedTimestamp);
    this.wasItGood = ko.observable(wasItGood);
    this.lngLat = ko.observable(lngLat);
    this.point = ko.observable(point);        
};