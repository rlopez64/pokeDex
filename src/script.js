function fetchPokemon() {
  let pokemon = $(".pokemon").val();
  let request = new XMLHttpRequest();

  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
  console.log(url);

  request.open("GET", url, true);
  request.onload = function () {
    if (this.response == "Not Found") {
      $("#res").text('Search Result for:"' + pokemon + '"');
      $("#pokeId").text("Pokemon not found. Please try again.");
    } else {
      let data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
        let frontImg = data.sprites.front_default;
        let backImg = data.sprites.back_default;
        let shinyImg = data.sprites.front_shiny;
        let pokeId = data.id;
        let pokeWeight = data.weight;
        let pokeHeight = data.height;
        let pokeType = data.types[0].type.name;

        $("#res").text('Search Result for: " ' + pokemon + ' "');
        $("#pokeId").text("This pokemon's ID in the pokedex is: " + pokeId);
        $("#pokeWeight").text(
          pokemon + " has a base unit weight of " + pokeWeight
        );
        $("#pokeHeight").text(
          pokemon + " has a base unit height of " + pokeHeight
        );
        $("#pokeType").text("Type: " + pokeType);
        $("#front").attr("src", frontImg);
        $("#back").attr("src", backImg);
        $("#shiny").attr("src", shinyImg);
      }
    }
  };

  request.send();
}

function myFunction(imgs) {
  var expandImg = document.getElementById("expandedImg");
  expandImg.src = imgs.src;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();
