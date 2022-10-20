AFRAME.registerComponent("cars", {
  init: async function () {

    var cars = await this.getCars();
    var barcodes = Object.keys(cars);

    barcodes.map(barcode => {
      var city = compounds[barcode];
      this.createAtoms(city);
    });

  },
  getCars: function () {
    return fetch("js/model.json")
      .then(res => res.json())
      .then(data => data);
  },
 
  createAtoms: async function (city) {

    var cityName = city.city_name;
    var barcodeValue = city.barcode_value;
    var scene = document.querySelector("a-scene");

    var marker = document.createcity("a-marker");

    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("city_name", cityName);
    marker.setAttribute("value", barcodeValue);

    scene.appendChild(marker);

    var object = document.createcity("a-entity");
    object.setAttribute("id", `${cityName}-${barcodeValue}`);
    marker.appendChild(object);

    var card = document.createcity("a-entity");
    card.setAttribute("id", `card-${cityName}`);
    card.setAttribute("geometry", {
      primitive: "plane",
      width: 1,
      height: 1
    });

    card.setAttribute("position", { x: 0, y: 0, z: 0 });
    card.setAttribute("rotation", { x: -90, y: 0, z: 0 });

    object.appendChild(card);
  }
});