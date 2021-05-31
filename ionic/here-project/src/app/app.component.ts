import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'here-project';
    private platform: any;

    @ViewChild("map",{static: false})
    public mapElement: ElementRef;

    public constructor() {
        this.platform = new H.service.Platform({
            "apikey": "8fhBEOFlae7tr1-NnXvzC--tq-h7Gv9H2vmwyGZiwbY"
        });
    }

    public ngOnInit() { }

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        let map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: { lat: 37.7397, lng: -121.4252 }
            }
        );
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    }

}