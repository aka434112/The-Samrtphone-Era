<template>
  <v-container>
	<v-layout row wrap justify-center>
          <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="300"
            >
            <v-card
            color="primary"
            dark
            >
              <v-card-text>
              Please stand by
              <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
              ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-flex xs10><div id="mapEl"></div><br/><v-toolbar-title class="slidertitle text-center text--darken-3">Timeline</v-toolbar-title>
		  <br/><v-slider
            always-dirty
            thumb-label="always"
            v-model="slider"
            step="1"
            min="2016"
            max="2021"
          ></v-slider></v-flex>
		  <v-flex xs10>
          <v-dialog v-model="info" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="info = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{"Smart phone usage in "+continent}}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
				<v-container>
				  <v-layout row wrap justify-center>
					<v-flex xs1 sm1></v-flex>
					<v-flex xs10 sm5><div id="pie"></div></v-flex>
					<v-flex xs1 sm1></v-flex>
					<v-flex xs10 sm5><div id="bar"></div></v-flex>
				  </v-layout>
				</v-container>
				</div>
			  </div>
              <v-divider></v-divider>
            </v-card>
          </v-dialog>
		</v-flex>
	</v-layout>
  </v-container>
</template>


<script>
import {GoogleCharts} from 'google-charts';

  export default {
    name: "mapComponent",
    data () {
      return {
        slider: 2016,
        JsonUrl: {"2016": "https://www.jasonbase.com/things/R1PM.json",
                  "2017": "https://www.jasonbase.com/things/8gWm.json",
                  "2018": "https://www.jasonbase.com/things/J2Bm.json",
                  "2019": "https://www.jasonbase.com/things/blQL.json",
                  "2020": "https://www.jasonbase.com/things/y5K6.json",
                  "2021": "https://www.jasonbase.com/things/Abq0.json"
                  },
        statesData: {},
        mapState: "",
        dialog: false,
        info: false,
        continent: "",
		topPhones: {},
		OS: {},
		usageData : {	
						"2016" : ["https://www.jasonbase.com/things/rbXx.json", "https://www.jasonbase.com/things/aQkV.json"],
						"2017" : ["https://www.jasonbase.com/things/1ydn.json", "https://www.jasonbase.com/things/kVgW.json"],
						"2018" : ["https://www.jasonbase.com/things/blml.json", "https://www.jasonbase.com/things/y5B3.json"],
						"2019" : ["https://www.jasonbase.com/things/AbxV.json", "https://www.jasonbase.com/things/dye4.json"],
						"2020" : ["https://www.jasonbase.com/things/ew8V.json", "https://www.jasonbase.com/things/3w3e.json"],
						"2021" : ["https://www.jasonbase.com/things/73Pg.json", "https://www.jasonbase.com/things/5bMV.json"],
					}
      }
    },
    methods: {
      drawMap () {
      let that = this
      if(that.mapState !== ""){
        that.mapState.remove()
      }
      var map = L.map("mapEl").setView([0, 0], 3);
      that.mapState = map;
        L.tileLayer(
          "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
          {
            maxZoom: 18,
            attribution:
              'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
              '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: "mapbox.light"
          }
        ).addTo(map);
        // control that shows state info on hover
        var info = L.control();
        info.onAdd = function(map) {
          this._div = L.DomUtil.create("div", "mapInfo");
          this.update();
          return this._div;
        };
        info.update = function(props) {
          this._div.innerHTML =
            "<h4>Smartphone usage over the world</h4>" +
            (props
              ? "<b>" +
                props.CONTINENT +
                "</b><br />" +
                props.count +
                " million"
              : "<h4>Hover/Click over a highlighted continent</h4>");
        };
        info.addTo(map);
        // get color depending on population density value
        function getColor(d) {
          return d > 600
            ? "#800026"
            : d > 400
              ? "#BD0026"
              : d > 350
                ? "#E31A1C"
                : d > 300
                  ? "#FC4E2A"
                  : d > 250
                    ? "#FD8D3C"
                    : d > 200 ? "#FEB24C" : d > 10 ? "#FED976" : "#FFEDA0";
        }
        function style(feature) {
          return {
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.count)
          };
        }
        function highlightFeature(e) {
          var layer = e.target;
          layer.setStyle({
            weight: 1,
            color: "#666",
            dashArray: "",
            fillOpacity: 0.7
          });
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
          that.continent = layer.feature.properties ? layer.feature.properties.CONTINENT : "";
          info.update(layer.feature.properties);
        }
        var geojson;
        function resetHighlight(e) {
          geojson.resetStyle(e.target);
          info.update();
        }
        function zoomToFeature(e) {
          that.info = true;
		  GoogleCharts.load(that.drawChart());
        }
        function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });
        }
        geojson = L.geoJson(that.statesData, {
          style: style,
          onEachFeature: onEachFeature
        }).addTo(map);
        var legend = L.control({ position: "bottomright" });
        legend.onAdd = function(map) {
          var div = L.DomUtil.create("div", "mapInfo legend"),
            grades = [200, 250, 300, 350, 400, 600],
            labels = [],
            from,
            to;
          for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            labels.push(
              '<i style="background:' +
                getColor(from + 1) +
                '"></i> ' +
                from +
                (to ? "&ndash;" + to : "+")
            );
          }
          div.innerHTML = labels.join("<br>");
          return div;
        };
        legend.addTo(map);
      },
	  drawChart() {
			let that = this
			let temp = that.continent
			if(temp === "Asia Pacific")
				temp = "Asia"
			console.log(temp)
			const data = GoogleCharts.api.visualization.arrayToDataTable(that.OS[temp]);
			const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('pie'));
			let options = {
			  title: 'Usage distribution based on Smartphone Operating System',
			  is3D: true,
			  height: 280,
			  chartArea:{left: 0,height:'80%'},
			  slices: {1:{color: '#ff5c21'}, 2:{color: '2c781b'}},
			  legend: {
				position: "labeled",
				labeledValueText: "both",
				sliceVisibilityThreshold: 0,
				pieSliceText: "value"
			  }
			};
			if(that.chartWidth!==0){
				options.width=that.chartWidth-31
				options.chartArea.width="90%"
				
			}else{
				options.chartArea.width="75%"
			}
			pie_1_chart.draw(data, options);
			const data2 = GoogleCharts.api.visualization.arrayToDataTable(that.topPhones[temp]);
			const bar_1_chart = new GoogleCharts.api.visualization.BarChart(document.getElementById('bar'));
			let options2 = {
			  title: 'Top 5 Smartphones in '+that.continent,
			  height: 320,
			  chartArea:{left: 0,height:'80%'},
			  legend: { position: "none" },
			  hAxis: {
				title: "Number of Users (in %)"
			  }
			};
			if(that.chartWidth!==0){
				options2.width=that.chartWidth-31
				options2.chartArea.width="90%"
			}else{
				options2.chartArea.width="75%"
			}
			bar_1_chart.draw(data2, options2);
	  }
    },
    mounted () {
      let that = this
	  that.chartWidth = window.innerWidth
	  if(that.chartWidth>=576)
	  that.chartWidth=0
      that.dialog = true
      let year = that.slider.toString()
	  GoogleCharts.load('visualization', '1', {packages:['corechart']});
      fetch("https://aka434112.github.io/geojson/"+year+".json").then(res => res.json())
				.then(json => that.statesData = json).
	  then(()=>{
				fetch("https://aka434112.github.io/geojson/chartsData/"+year+".json").then(res => res.json())
				.then(json =>{
					that.topPhones = json
				}).then(()=>{
					fetch("https://aka434112.github.io/geojson/chartsData/"+year+"OS.json").then(res => res.json())
				.then(json =>{
					that.OS = json
				}).then(()=>{that.drawMap();that.dialog = false;})})
	  })
    },
    watch: {
      slider (newVal) {
        let that = this
        that.dialog = true
        let year = newVal.toString()
      fetch("https://aka434112.github.io/geojson/"+year+".json").then(res => res.json())
				.then(json => that.statesData = json).
	  then(()=>{
				fetch("https://aka434112.github.io/geojson/chartsData/"+year+".json").then(res => res.json())
				.then(json =>{
					that.topPhones = json
				}).then(()=>{
					fetch("https://aka434112.github.io/geojson/chartsData/"+year+"OS.json").then(res => res.json())
				.then(json =>{
					that.OS = json
				}).then(()=>{that.drawMap();that.dialog = false;})})
	  })
      },
    }
  }
</script>

<style scoped>
.slidertitle{
  color: #1976d2 !important;
}
#mapEl {
  width: 100%;
  z-index: 0;
}

@media screen and (max-width: 768px){
  #mapEl{
    height: 400px;
  }
}
@media screen and (min-width: 769px){
	#mapEl{
	  height: 500px;
	}
}
</style>
