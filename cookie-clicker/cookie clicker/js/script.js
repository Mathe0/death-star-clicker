// Background
$(document).ready(function() {
    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $("#top-image").mousemove(function(e){
              var pageX = e.pageX - ($(window).width() / 2);
              var pageY = e.pageY - ($(window).height() / 2);
              var newvalueX = width * pageX * -1 - 25;
              var newvalueY = height * pageY * -1 - 50;
              $('#top-image').css("background-position", newvalueX+"px     "+newvalueY+"px");
    });
    });

// Data
function save() {
  var sauvegarde = {score: score, nb_autoclicks : parseconde, 
                    nb_multiplicateur : parclique, 
                    prix_multiplicateur : prix_multiplicateur, 
                    prix_autoclick : prix_autoclick,
                  } 
  localStorage.setItem("sauvegarde", JSON.stringify(sauvegarde));
}

function load() {
  var sauvegarde = localStorage.getItem("sauvegarde");
  sauvegarde = JSON.parse(sauvegarde)
  console.log(sauvegarde)
  score = sauvegarde.score;
  parseconde = sauvegarde.nb_autoclicks;
  parclique = sauvegarde.nb_multiplicateur;
  prix_multiplicateur = sauvegarde.prix_multiplicateur;
  prix_autoclick = sauvegarde.prix_autoclick;
  affichage_prix()
  actualisation_affichage()
}

function supprimer() {
  var sauvegarde = localStorage.clear("sauvegarde");
}


// Variable 
var score = 0;
var affichage = document.getElementById("result")
var prix_multiplicateur = 5
var prix_autoclick = 10
var affichage_nombre_autoclique = document.getElementById("nombre_autoclique")
var affichage_cout_autoclique = document.getElementById("cout_autoclique")
var affichage_nombre_multiplicateur = document.getElementById("nombre_multiplicateur")
var affichage_cout_multiplicateur = document.getElementById("cout_multiplicateur")




// Affichage
function actualisation_affichage(){
  affichage.innerHTML = score;
}

function affichage_prix() {
  affichage_nombre_autoclique.innerHTML = "vous avez "+ parseconde +" Autocliques";
  affichage_cout_autoclique.innerHTML = "L'autoclique coûte "+ prix_autoclick;
  affichage_nombre_multiplicateur.innerHTML = "vous avez "+ parclique +" multiplicateurs";
  affichage_cout_multiplicateur.innerHTML = "Le multiplicateur coûte "+ prix_multiplicateur;
}

// Clique
document.getElementById("planet").addEventListener("click", clique)

function clique() {
    score = score + parclique;
    actualisation_affichage()
  }

// autoclick

var parSecondeInterval = setInterval(parSeconde, 1000)
var parseconde = 0 

function autoclick(){
  if (score >= prix_autoclick){
  score = score - prix_autoclick;
  prix_autoclick = prix_autoclick * 2;
  parseconde = parseconde + 1;
  affichage_prix();
  }
  else{
    alert("Pas assez de clique")
  }
}

function parSeconde() {
  score = score + parseconde; 
  actualisation_affichage();
}


// Multiplicateur

var parclique = 1

 function multiplicateur() {
  if (score >= prix_multiplicateur){
    score = score - prix_multiplicateur;
    prix_multiplicateur = prix_multiplicateur * 2;
    parclique++;
    affichage_prix();
  }
  else {
    alert("Pas assez de clique")
  }
 }


 // Random Message

 var message_interval= setInterval(message_aleatoire, 120000)

 var message = ["La Princesse Leïla vous passe le bonjour.", "Han Solo vous fait un clin d'oeil.", "Luke Skywalker est gratifiant envers votre travail.", "Chewbacca cri quelque chose(vous ne comprenez pas...", "R2D2 semble approuver votre acharnement."]

 function message_aleatoire() {
  var random = [Math.floor(Math.random()*message.length)];
  var message_random = message[random];
  alert(message_random)
}


