$(document).ready(function(e) {
    getExternal();

}); 

function getExternal() {
    let url = "https://api.covid19api.com/summary";
    fetch(url)
      .then(function(res){
        return res.json();
      })
      .then(function(data) {
        data = `
        <td>${data.Global.TotalConfirmed}</td>
        <td>${data.Global.TotalDeaths}</td>
        <td>${data.Global.TotalRecovered}</td>
        <td>${data.Global.NewRecovered}</td>
        <td>${data.Global.NewConfirmed}</td>
        <td>${data.Global.NewDeaths}</td>
        `;
      
        document.getElementById('data').innerHTML = data;
    
      });
     
  };

  let myForm = document.getElementById("myForm");

  myForm.addEventListener("submit", function(e){

    e.preventDefault();
    let country = document.getElementById("country").value;

    let url = "https://api.covid19api.com/total/dayone/country/" + country;
    
     
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
      
      let length = res.length;
      let index = length - 1;
      let confirmed = document.querySelector(".confirmed");
      let recovered = document.querySelector(".recovered");
      let deaths = document.querySelector(".deaths");

      confirmed.innerHTML = "";
      confirmed.append(res[index].Confirmed);

      deaths.innerHTML = "";
      deaths.append(res[index].Deaths);

      recovered.innerHTML = "";
      recovered.append(res[index].Recovered);
        
    })

  });

  // graph

  window.onload = function () {

var options = {
	animationEnabled: true,
	title: {
		text: "Countries with most covid cases - 2021"
	},
	axisY: {
		title: "Total cases",
	},
	axisX: {
		title: "Countries"
	},
	data: [{
		type: "column",
		dataPoints: [
			{ label: "USA", y: 32538342 },	
			{ label: "India", y: 15616130 },	
			{ label: "Brazil", y: 14050885 },
			{ label: "France", y: 5339920 },	
			{ label: "Russia", y: 4727125 },
			{ label: "UK", y: 4393307 },
			{ label: "Turkey", y: 4384624 },
			{ label: "Italy", y: 3891063 }
			
		]
	}]
};
$("#chartContainer").CanvasJSChart(options);

}
