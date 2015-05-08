config={
	"layer-styles": {
		"idp-camp": {
			fillColor: "#66ffcc",
			fillOpacity: 0.8,
			color: "#66ccff",
			weight: 6
		},
		"rubble": {
			fillColor: "#aa6633",
			fillOpacity: 0.8,
			color: "#aa6633",
			weight: 6
		},
        "task":{
            "-1":{
                fillOpacity: 0,
                opacity: 0
            },
            "0":{
                fillOpacity: 0,
                opacity: 0
            },
            "1":{
                fillOpacity: 0,
                opacity: 0
            },
            "2":{
                fillColor: "#22aa88",
                fillOpacity: 0.2,
                color: "#22aa88",
                weight: 1,
                opacity: 1
            },
            "3":{
                fillColor: "#22aa00",
                fillOpacity: 0.2,
                color: "#22aa00",
                weight: 1,
                opacity: 1
            }
        }
	}
};

function drawLayer(options){



	$.ajax({
    	url: options.url,
    	success: function(data){    				


    		var geojsonLayer = L.geoJson(data, {
                onEachFeature: function(feature, layer){
                    layer.setStyle(config["layer-styles"]["task"][feature.properties.state]);
                }
            });
    		geojsonLayer.setStyle(options.layerStyles);
            geojsonLayer.addTo(options.map);
    		// options.overlay.addLayer(geojsonLayer);
    	},
    	dataType: "json"
    });
}


$(document).ready(function(){
    var map = L.map("map", {
        center: [27.8006, 85.3934],
        zoom: 8,
        layers: [L.tileLayer("https://{s}.tiles.mapbox.com/v4/kll.11e42515/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2xsIiwiYSI6IktVRUtfQnMifQ.GJAHJPvusgK_f0NsSXS8QA")]
    });

    

    var overlays = {
        "IDP Camps": L.featureGroup(),
        "Rubble": L.featureGroup(),
        "Mapped Areas": L.featureGroup()
    }

    // var layerControl = L.control.layers({},overlays,{
    //     collapsed: false
    // }).addTo(map);

    drawLayer({
        url: "data/task.geojson",
        layerStyles: config["layer-styles"]["task"],
        layerName: "Mapped Areas",
        overlay: overlays["Mapped Areas"],
        filter: true,
        map: map
    });

    /*drawLayer({
    	url: "data/idp-camp.geojson",
    	layerStyles: config["layer-styles"]["idp-camp"],
    	layerName: "IDP Camps",
    	overlay: overlays["IDP Camps"],
        map: map
    });

    drawLayer({
    	url: "data/rubble.geojson",
    	layerStyles: config["layer-styles"]["rubble"],
    	layerName: "Rubble",
    	overlay: overlays["Rubble"],
        map: map
    });*/
    
    function LegendRow(options){
    	var cssClass = options.mapFeature.toLowerCase().replace(/ /g,"-");
    	return $("div").addClass("legend-row").append("<div class='legend-icon'></div><div class='legend-label'>"+options.mapFeature+"</div>").addClass(cssClass);
    }
    
    var legend = function(){
    	var container = $("div").addClass("legend-box");
    	container.append(new LegendRow({
    		"mapFeature": "IDP Camps"
    	}));
    	container.append(new LegendRow({
    		"mapFeature": "Visible Damage"
    	}));
    	container.append(new LegendRow({
    		"mapFeature": "Mapped Areas"
    	}));
    	container.append(new LegendRow({
    		"mapFeature": "Validated Areas"
    	}));
    	
    	return container
    }().appendTo("body");
    
    $("div").addClass("map-title").text("Satellite-Visible Damage and IPD Camps");

    

    
});
