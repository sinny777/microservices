// Angular
import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { GoogleMapsAPIWrapper } from '@agm/core';
import {} from 'googlemaps';

export interface MapData {
	lat: number;
	lng: number;
	mapTypeId: string;
	zoom: number;
	zoomControl: boolean;
	rotateControl: boolean;
	panControl: boolean;
	mapTypeControl: boolean;
	scaleControl: boolean;
	streetViewControl: boolean;
}

@Component({
	selector: 'kt-google-map',
	templateUrl: './googleMap.component.html',
	styleUrls: ['./googleMap.component.scss']
})
export class GoogleMapComponent implements OnInit {

	// Public properties
	@Input() data: MapData;

	@ViewChild('gmap', { static: true }) gmapElement: any;
  gmap: google.maps.Map;

	watertank1 = './assets/media/icons/svg/IoT/water-tank-safe.svg';
	watertank2 = 'https://static.thenounproject.com/png/173862-200.png';
	icon1 = 'https://png.pngtree.com/svg/20170412/65d12bae9c.svg';
	gastank1 = 'http://cdn.onlinewebfonts.com/svg/img_454449.png';

	selectedMarker;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { label: 'Water Tank 1' ,
			lat: 36.526836233616166,
			lng: 128.8196917439518,
			alpha: 1,
			iconUrl: {
				'url': 'https://cdn.iconscout.com/icon/premium/png-256-thumb/water-tank-10-842834.png',
				'scaledSize': {
						width: 20,
						height: 20
				},
				fillColor: '#FF0000',
		    fillOpacity: .6,
		    strokeWeight: 0,
		    scale: 1
			}
		},
		{ label: 'Gas Tank 1' ,
			lat: 36.52529081566948,
			lng: 128.81939858984015,
			alpha: 1,
			iconUrl: {
				'url': this.icon1,
				'scaledSize': {
						width: 20,
						height: 20
				},
				fillColor: '#FF0000',
		    fillOpacity: .6,
		    strokeWeight: 0,
		    scale: 1
			}
		}

  ];

	/**
	 * On init
	 */
	ngOnInit() {
		if (!this.data) {
			this.data = {
					lat: 36.5262,
  				lng: 128.8201,
  				mapTypeId: 'SATELLITE',
					zoom: 18,
					rotateControl: true,
					panControl: true,
					scaleControl: true,
					zoomControl: true,
					streetViewControl: true,
					mapTypeControl: true
				};
		}
		this.initMap();
	}

	initMap() {
			const mapProperties = {
	        center: new google.maps.LatLng(this.data.lat, this.data.lng),
	        zoom: this.data.zoom,
	        mapTypeId: google.maps.MapTypeId.SATELLITE,
					rotateControl: this.data.rotateControl,
					panControl: this.data.panControl,
					scaleControl: this.data.scaleControl,
					zoomControl: this.data.zoomControl,
					streetViewControl: this.data.streetViewControl,
					mapTypeControl: this.data.mapTypeControl,
					tilt: 45
	   };

			this.gmap = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);

			this.initMarkers();

	}

	initMarkers() {
		let arrow_icon = {
	    path: 'M -1.1500216e-4,0 C 0.281648,0 0.547084,-0.13447 0.718801,-0.36481 l 17.093151,-22.89064 c 0.125766,-0.16746 0.188044,-0.36854 0.188044,-0.56899 0,-0.19797 -0.06107,-0.39532 -0.182601,-0.56215 -0.245484,-0.33555 -0.678404,-0.46068 -1.057513,-0.30629 l -11.318243,4.60303 0,-26.97635 C 5.441639,-47.58228 5.035926,-48 4.534681,-48 l -9.06959,0 c -0.501246,0 -0.906959,0.41772 -0.906959,0.9338 l 0,26.97635 -11.317637,-4.60303 c -0.379109,-0.15439 -0.812031,-0.0286 -1.057515,0.30629 -0.245483,0.33492 -0.244275,0.79809 0.0055,1.13114 L -0.718973,-0.36481 C -0.547255,-0.13509 -0.281818,0 -5.7002158e-5,0 Z',
	    strokeColor: 'black',
	    strokeOpacity: 1,
	    strokeWeight: 1,
	    fillColor: '#fefe99',
	    fillOpacity: 1,
	    rotation: 0,
	    scale: 1.0
	  };

	  const scaledSize: google.maps.Size =  {
			width: 20,
			height: 20,
			equals: undefined
	};

		const waterTank_options: google.maps.ReadonlyMarkerOptions = {
									position: {lat: 36.526836233616166, lng: 128.8196917439518},
									icon: {
											url: this.watertank1,
											scaledSize: scaledSize,
											fillColor: '#FF0000',
												fillOpacity: .6,
												strokeWeight: 0,
												scale: 1
											},
									clickable: true,
									draggable: true,
									crossOnDrag: true,
									visible: true,
									animation: 0,
									title: 'Water Tank 1'
								};
	  let tank_marker = new google.maps.Marker(waterTank_options);
	  tank_marker.setMap(this.gmap);
	}

	addMarker(lat: number, lng: number) {
    console.log('addMarker, lat: %s, lng: %s', lat, lng);
  }

	selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
		console.log(this.selectedMarker);
  }

}
