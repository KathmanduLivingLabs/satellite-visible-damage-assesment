config={
	"layer-styles": {
		"idp-camp": {
			fillColor: "#ff9966",
			fillOpacity: 0.8,
			color: "#66ffcc",
			weight: 1
		},
		"rubble": {
			fillColor: "#ff9966",
			fillOpacity: 0.8,
			color: "#ff9966",
			weight: 1
		}
	}
};

function drawLayer(options){
	$.ajax({
    	url: options.url,
    	success: function(data){
    		var geojsonLayer = L.geoJson(data);
    		geojsonLayer.setStyle(options.layerStyles);
    		layerControl.addOverlay(geojsonLayer, options.layerName);
    });
}


$(document).ready(function(){
    var map = L.map("map", {
        center: [27.8006, 85.3934],
        zoom: 8,
        layers: [L.tileLayer("https://{s}.tiles.mapbox.com/v4/kll.m410hgod/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2xsIiwiYSI6IktVRUtfQnMifQ.GJAHJPvusgK_f0NsSXS8QA")]
    });

    var layerControl = L.control.layers({},{},{
    	collapsed: false
    }).addTo(map);

    drawLayer({
    	url: "data/idp-camp.geojson",
    	layerStyles: config["layer-styles"]["idp-camp"],
    	layerName: "IDP Camps"
    });

    drawLayer({
    	url: "data/rubble.geojson",
    	layerStyles: config["layer-styles"]["idp-camp"],
    	layerName: "Rubble"
    });

    
});