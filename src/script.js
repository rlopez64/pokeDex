function fetchPokemon() {
  const pokemon = $(".pokemon").val().toLowerCase();

  // quit function if user hasn't entered a value
  if (pokemon == null || pokemon.trim() === "") {
    return;
  }

  const request = new XMLHttpRequest();
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

  request.open("GET", url, true);

  request.onload = function () {
    if (this.response == "Not Found") {
      $("#pokeID").text("Pokemon not found. Please try again.");
    } else {
      const data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
        loadImages(data);
        loadInfo(data);
      }
    }
  };

  request.send();
}

function loadImages(data) {
  const frontImg = data.sprites.front_default;
  const backImg = data.sprites.back_default;
  const shinyImg = data.sprites.front_shiny;

  // Images
  $("#front").attr("src", frontImg);
  $("#back").attr("src", backImg);
  $("#shiny").attr("src", shinyImg);
}

function loadInfo(data) {
  const pokeID = data.id;
  const name = data.forms[0].name;
  const pokeName = name.charAt(0).toUpperCase() + name.slice(1);
  const pokeType = getTypes(data);
  const pokeWeight = data.weight / 10;
  const pokeHeight = data.height / 10;

  $("#pokeID").text("#" + pokeID);
  $("#pokeName").text("Name: " + pokeName);
  $("#pokeType").text("Type: " + pokeType);
  $("#pokeWeight").text("Weight: " + pokeWeight.toFixed(2) + " kg");
  $("#pokeHeight").text("Height: " + pokeHeight.toFixed(2) + " m");
}

function getTypes(data) {
  const types = data.types;
  let pokeType = "";
  for (let i = 0; i < types.length; i++) {
    let type = types[i].type.name;
    pokeType += type.charAt().toUpperCase() + type.slice(1);

    if (i !== types.length - 1) {
      pokeType += ", ";
    }
  }
  return pokeType;
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
