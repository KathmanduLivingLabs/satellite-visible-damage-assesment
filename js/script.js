config={
	"layer-styles": {
		"idp-camp": {
			fillColor: "#074803",
			fillOpacity: 0.8,
			color: "#074803",
			weight: 6
		},
		"rubble": {
			fillColor: "#AA2300",
			fillOpacity: 0.8,
			color: "#AA2300",
			weight: 6
		},
        "task":{
            "-1":{
                fillOpacity: 0,
                opacity: 0,
                clicka: false
            },
            "0":{
                fillOpacity: 0,
                opacity: 0,
                clickable: false
            },
            "1":{
                fillOpacity: 0,
                opacity: 0,
                clickable: false
            },
            "2":{
                fillColor: "#9BC1A9",
                //fillColor: "#6faf93",
                fillOpacity: 0.4,
                color: "#9BC1A9",
                //color: "#6faf93",
                weight: 1,
                opacity: 1
            },
            "3":{
                fillColor: "#22aa00",
                fillOpacity: 0.4,
                color: "#22AA00",
                weight: 1,
                opacity: 1
            }
        }
	}
};

function LegendRow(options){
    	var cssClass = options.mapFeature.toLowerCase().replace(/ /g,"-");
    	return $("<div/>").addClass("legend-row").append("<div class='legend-icon'></div><div class='legend-label'>"+options.mapFeature+"</div>").addClass(cssClass);
    }

function drawLayer(options){



	$.ajax({
    	url: options.url,
    	success: function(data){    				


    		var geojsonLayer = L.geoJson(data, {
                onEachFeature: function(feature, layer){
                    layer.setStyle(config["layer-styles"]["task"][feature.properties.state]);
                    layer.on("click", function(e){
                        options.map.setView(function(){
                            var tileCenter = layer.getBounds().getCenter();
                            tileCenter.lat -= 0.015;
                            return tileCenter;
                                                      }(), 12);
                    });
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
        zoom: 9,
        layers: [ L.tileLayer("https://{s}.tiles.mapbox.com/v4/kll.m4l44c1a/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2xsIiwiYSI6IktVRUtfQnMifQ.GJAHJPvusgK_f0NsSXS8QA"), L.tileLayer("https://{s}.tiles.mapbox.com/v4/kll.8fb56087/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2xsIiwiYSI6IktVRUtfQnMifQ.GJAHJPvusgK_f0NsSXS8QA",{
            attribution: "© OpenStreetMap Contributors | Satellite Imagery Dates: April 29, 2015 and May 3, 2015 | Data Updated: May 7, 2015"
        })]
    });
    
    config.map=map;

    

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
    
    
    
    
    
    $("<div/>").addClass("map-title").html("<h4>Satellite-Visible Damage and IPD Camps<h4><p>Using Satellite Imagery, volunteers have mapped IDP Camps (<span class='legend-icon idp-camps'></span>) and Visible Damage (<span class='legend-icon visible-damage'></span>). Boxes overlaid indicate where mapping and validation have been done. IDP Camps and visible damage outside mapped boxes indicate mapping in progress.</p>").appendTo("body");
    
    var legend = function(){
    	var container = $("<div/>").addClass("legend-box");
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
    }().appendTo(".map-title");
    
    $("<a href='.' target='_blank' class='btn-maximize'/>").appendTo("body");


    
});
