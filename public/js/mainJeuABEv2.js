/**** Gestion de la compatibilité */
if (!window.document.getElementsByClassName) {
    // Si la méthode getElementsByClassName n'existe pas sur le navigateur
    window.document.getElementsByClassName = function (nomDeClasse) {
        // Ma propre implémentation de la méthode getElementsByClassName
    }
}

window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (aExecuter) {
        window.setTimeout(function () {
            aExecuter(new Date().getTime());
        }, 1)
    };

/****  fin Gestion de la compatibilité */

window.addEventListener('DOMContentLoaded', function () {


    /**** GESTION DU LOGIN */

    var formulaireRequin1 = window.document.getElementById('formPseudoRequin1');
    var formulaireRequin2 = window.document.getElementById('formPseudoRequin2');

    // A l'établissement de la connexion
    uneConnexionWebsocket.addEventListener('open', function (event) {

        // A la soumission du formulaireRequin1
        formulaireRequin1.addEventListener('submit', function (event) {
            // On annule le comportement par défaut du formulaireRequin1
            event.preventDefault();
            // On récupére les valeur des champs du formulaireRequin1
            var elementPseudo = window.document.getElementById('pseudoRequin1');
            var elementMotDePasse = window.document.getElementById('motDePasseRequin1');

            // ... qu'on place dans un objet
            var identifiant = {
                pseudoValue: elementPseudo.value,
                motDePasseValue: elementMotDePasse.value
            };

            // On transforme l objet en chaine de caractere
            var identifiantEnTexte = JSON.stringify(identifiant);

            // On envoie cette chaine de caractère au serveur.
            websocketConnexion.send(identifiantEnTexte);
        });

        formulaireRequin2.addEventListener('submit', function (event) {
            // On annule le comportement par défaut du formulaireRequin2
            event.preventDefault();
            // On récupére les valeur des champs du formulaireRequin2
            var elementPseudo = window.document.getElementById('pseudoRequin2');
            var elementMotDePasse = window.document.getElementById('motDePasseRequin2');

            // ... qu'on place dans un objet
            var identifiant = {
                pseudoValue: elementPseudo.value,
                motDePasseValue: elementMotDePasse.value
            };

            // On transforme l objet en chaine de caractere
            var identifiantEnTexte = JSON.stringify(identifiant);

            // On envoie cette chaine de caractère au serveur.
            websocketConnexion.send(identifiantEnTexte);
        });

        // En cas de réception de motDePasseValue depuis le serveur.
        websocketConnexion.addEventListener('motDePasseValue', function (motDePasseValueEvent) {
            var identifiant = JSON.parse(motDePasseValueEvent.data);

            motDePasseValues.innerHTML = '<p><strong>' + identifiant.pseudoValue + '</strong>:</p><p><i>' + identifiant.motDePasseValue + ' </i></p>' + motDePasseValues.innerHTML;
        });
    });

    /****FIN GESTION LOGIN */









    /*********************************** */

    var websocketConnection = io('http://192.168.104.99:8888'); // handshake ; WEBSOCKETCONNEXION IO 


    var shark = new ConstructeurShark(); // est execute une fois que le DOM est charge
    console.log(shark);
    var largeurEcran = window.innerWidth; //recupere automatiquement la valeur de l'ecran du joueur
    var gameHeight = document.getElementById('background').offsetHeight; //definit la hauteur d evolution du jeu
    var topBackground = document.getElementById('background').offsetTop; // definit le top a partir duquel commence la hauteur d 'evolution du jeu

    dataInitJeuDom = {
        propShark: shark,
        propLargeurEcran: largeurEcran,
        propGameHeight: gameHeight,
        propTopBackground: topBackground,
    }

    // au chargement du Dom on envoie les donnees d initialisation du jeu.
    websocketConnection.emit('InitJeuDom', dataInitJeuDom); // .emit InitJeuDom


    document.getElementById('regleJeu').addEventListener('click', function () { // fermeture du panneau regle du jeu et lancement du jeu au clic sur le panneau regle du jeu

        var divRegleJeu = document.getElementById('regleJeu');
        divRegleJeu.style.display = "none"; // fermeture du panneau regle du jeu 

        var delaiCreationFish = 1000; // ttes les 1s = 1 fish

        /////// creation de fish a la volee    /////// 

        var setIntervalEnemies = setInterval(function () {
            var randomHeight = Math.random() * (gameHeight * 0.9 - topBackground) + topBackground; // 0.9 pour reduire la hauteur du ramdom afin que le poisson n apparaisse pas hors du cadre du jeu
            new Constructeurenemies(shark, randomHeight)
        }, delaiCreationFish);



        /////// gestion du temps alloué a une partie de jeu   ///////

        var tempsPartie = 30000; // definition en ms de la duree d 'une partie


        /////// gestion de l affichage du temps de jeu restant  ///////

        var tempsRestant = tempsPartie / 1000 - 1; // convertion en seconde
        var setIntervalTempsRestant = setInterval(function () {
            tempsRestant = tempsRestant - 1
            window.document.getElementById('tempsRestant').innerHTML = 'Temps restant : ' + tempsRestant
        }, 1000);

        /////// gestion du win  ///////

        var scoreWin = 10 // definition du score a realiser pour gagner


        /////// gestion du gameover   ///////

        setTimeout(function () {
            //si au bout de 20s, valeur div score <10
            if (window.document.getElementById('score').innerHTML < scoreWin) {
                window.document.getElementById('gameover').style.display = "block"; // affiche le gameover
                window.location.reload();

                window.document.getElementById('gameover').addEventListener("click", function () { // au clic sur gameover, recharge une partie

                    window.location.reload();
                });
            }
            clearInterval(setIntervalTempsRestant);
            window.document.getElementById('tempsRestant').innerHTML = 'Temps restant : 0'
        }, tempsPartie);

        dataReglejeu = {
            propReglejeu: divRegleJeu,
            propDelaiCreationFish: delaiCreationFish,
            propSetIntervalEnemies: setIntervalEnemies,
            propTempsPartie: tempsPartie,
            propTempsRestant: tempsRestant,
            propSetIntervalTempsRestant: setIntervalTempsRestant,
            propScoreWin: scoreWin,
            propSetTimeout: setTimeout,
        }


        // A chaque clic de souris sur la div regle du jeu on envoie l'action au back end.
        websocketConnection.emit('mouseClickRegleJeu', dataReglejeu); // .emit regleJeu

    }); // fin du addEventListener creation du jeu


    /////// relancer une partie   ///////

    rejouer = document.getElementById("boutonRejouer");
    rejouer.addEventListener("click", function () { // relance une partie au clic sur le bouton rejouer
        window.location.reload();

        dataReload = {
            propReload: window.location.reload();
        }

        // A chaque clic de souris sur la div boutonRejouer on envoie l'action au back end.
        websocketConnection.emit('boutonRejouer', dataReload); // .emit boutonRejouer
    });

    /////// afficher les regles du jeu avec le bouton interrogation  ///////

    document.getElementById('boutonInterrogation').addEventListener('click', function () { // affiche le panneau regle du jeu qd on clique sur le bouton '?'

        divRegleJeu = document.getElementById('regleJeu');

        if (divRegleJeu.style.display == 'none')
            divRegleJeu.style.display = 'block';
        else
            divRegleJeu.style.display = 'none';

        window.location.reload(); // recharge le jeu qd on clicque sur le bouton regles du jeu 

        //console.log(window.document.getElementById('regleJeu').style.display)

        dataBoutonInterrogation = {
            propDivRegleJeu: divRegleJeu,
            propReload: window.location.reload();
        }

        // A chaque clic de souris sur la div boutonInterrogation on envoie l'action au back end.
        websocketConnection.emit('boutonInterrogation', dataBoutonInterrogation); // .emit boutonInterrogation

    });


    //ecoute les touches du clavier
    window.addEventListener("keydown", function (event) {

        //recupere le code de la touche
        this.code = event.keyCode;

        //39 est le code de la fleche de droite
        if (this.code === 39) {

            //collison ecran droite = largeur ecran - largeur div shark
            if (shark.decalageLeftShark > largeurEcran - parseFloat(shark.sharkContainerADeplacer.style.width)) {

            } else {
                shark.decalageLeftShark += shark.vitesseShark; //incrementation horizontal
            }

        } // fin du if(code === 39)

        if (this.code === 37) { // touche fleche gauche
            // console.log('*************gauche' + decalageLeftShark);

            if (shark.decalageLeftShark < 0) { // collison ecran gauche  = 0 = decalage hors bordure gauche ecran

            } else {
                shark.decalageLeftShark -= shark.vitesseShark; //decrementation horizontal
            }
        }

        if (this.code === 40) { // touche fleche bas
            if (shark.decalageTop >= 648) { // collison ecran bas = 648 = limite basse du masqueBackground

            } else {
                shark.decalageTop += shark.vitesseShark;
            }
            // console.log('fleche bas (40)');    
        }

        if (this.code === 38) { // touche fleche haut

            if (shark.decalageTop <= 50) { // collison ecran haut = 42 = limite haute du masqueBackground

            } else {
                shark.decalageTop -= shark.vitesseShark;
            }
            // console.log('fleche haut (40)');
        }

        shark.animationSharkRun(shark.compteurPourAnimationRequin);
        // On prepare le compteur pour la prochaine fois
        shark.compteurPourAnimationRequin++;

        shark.sharkContainerADeplacer.style.left = shark.decalageLeftShark + 'px';
        //console.log('sharkContainerADeplacer.style.left ok')

        shark.sharkContainerADeplacer.style.top = shark.decalageTop + 'px';
        //console.log('sharkContainerADeplacer.style.top ok')

        dataKeydown = {
            propThisCode: this.code,
            propSharkAnimationSharkRun: shark.animationSharkRun(shark.compteurPourAnimationRequin),
            propSharkCompteurPourAnimationRequinPlusPlus: shark.compteurPourAnimationRequin++,
            propSharkSharkContainerADeplacerStyleLeft: shark.sharkContainerADeplacer.style.left,
            propSharkSharkContainerADeplacerStyleTop: shark.sharkContainerADeplacer.style.top,
        }

        // A chaque utilisation d'une touche definit danxs le keydown on envoie l'action au back end.
        websocketConnection.emit('keydown', dataKeydown); // .emit keydown
    }); // fin window.addEventListener keydown



}); // fin window.addEventListener DOMContentLoaded