// Background
/* ça va permettre de faire bouger le background image en fonction de la position de la souris. */
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

/* Ce bouton va sauvegarder le nombre de clique (score), le nombre clique par seconde(parseconde), le nombre de multiplicateur (parclique)
le prix de l'autoclique supplémentaire (prix_autoclick), le prix du multiplicateur(prix_multiplicateur).*/
function save() {
  const sauvegarde = {score: score, 
                    nb_autoclicks : parseconde, 
                    nb_multiplicateur : parclique, 
                    prix_multiplicateur : prix_multiplicateur, 
                    prix_autoclick : prix_autoclick,
                  } 
  localStorage.setItem("sauvegarde", JSON.stringify(sauvegarde));
}

/* Ce bouton va charger la page avec les données qui étaient sauvegardés et les afficher via les fonctions d'affichage. */
function load() {
  let sauvegarde = localStorage.getItem("sauvegarde");
  sauvegarde = JSON.parse(sauvegarde)
  score = sauvegarde.score;
  parseconde = sauvegarde.nb_autoclicks;
  parclique = sauvegarde.nb_multiplicateur;
  prix_multiplicateur = sauvegarde.prix_multiplicateur;
  prix_autoclick = sauvegarde.prix_autoclick;
  affichage_prix()
  actualisation_affichage()
}

/* Ce bouton va supprimer la sauvegarde */
function supprimer() {
  localStorage.clear("sauvegarde");
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

/* Cette fonction va permettre d'actualiser la valeur du nombre par rapport aux fonctions*/
function actualisation_affichage(){
  affichage.innerHTML = score;
}


/* Cette fonction va actualiser les phrases des bonus */
function affichage_prix() {
  affichage_nombre_autoclique.innerHTML = "vous avez "+ parseconde +" Autocliques";
  affichage_cout_autoclique.innerHTML = "L'autoclique coûte "+ prix_autoclick;
  affichage_nombre_multiplicateur.innerHTML = "vous avez "+ parclique +" multiplicateurs";
  affichage_cout_multiplicateur.innerHTML = "Le multiplicateur coûte "+ prix_multiplicateur;
}

// Clique
document.getElementById("planet").addEventListener("click", clique)

/* On ajoute à la valeur score +1 à chaque clique. 
La valeur parclique est égale de base à 0, elle servira si le bonus à activer à l'aditionner au clique de base.*/
function clique() {
    score = score + parclique;
    actualisation_affichage()
    tir_laser()
  }

// autoclick

var parSecondeInterval = setInterval(parSeconde, 1000) // Crée un intervale de 1 seconde
var parseconde = 0 

/* Cette fonction sert à ajouter un clique par interval de 1 seconde si le score est supérieur ou égale au prix défini.
Le prix sera ensuite multiplié par 2. 
Si le score n'est pas supérieur ou égale au prix, rien ne se passe.*/
function autoclique(){
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

/* Cette fonction sert à ajouter le nombre de clique par seconde à la valeur score. */
function parSeconde() {
  score = score + parseconde; 
  actualisation_affichage();
}


// Multiplicateur

var parclique = 1


/* Cette fonction sert à ajouter un clique pour chaque clique.
Le prix sera ensuite multiplié par 2. 
Si le score n'est pas supérieur ou égale au prix, rien ne se passe.*/
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

 var message_interval= setInterval(message_aleatoire, 120000) // Crée un interval de 2 minutes 

 /* Tableau avec les phrases qui seront cités aléatoirement */
 var message = ["La Princesse Leïla vous passe le bonjour.", "Han Solo vous fait un clin d'oeil.", "Luke Skywalker est gratifiant envers votre travail.", "Chewbacca cri quelque chose(vous ne comprenez pas...", "R2D2 dit bip-boop boo-bip."]

 /* Cette fonction va permettre de créer via l'interval une alerte qui va afficher un message du tableau.*/
 function message_aleatoire() {
  var random = [Math.floor(Math.random()*message.length)];
  var message_random = message[random];
  alert(message_random)
}


// Tir laser


/* La fonction sert à créer une image dans le body, et va la retirer au bout de 200ms. */
async function tir_laser() {
  const bruit_tir = new Audio("son/tir.WAV")
  const element = document.createElement("img");
    element.src = "./images/laser.png"
    element.className = "laser"
    element.style.left = 45 + 'vw';
    element.style.bottom = -10 + 'vh';
    document.querySelector("body").appendChild(element)
    bruit_tir.play()

    await sleep(200)
    document.querySelector("body").removeChild(element)

}

/* Cette fonction va être relié à celle du dessus et c'est ce qui va permettre de retirer l'image au bout de 200ms. */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}