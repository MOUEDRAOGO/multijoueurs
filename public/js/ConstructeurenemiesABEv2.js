var Constructeurenemies = function(shark, offset) {

    this.gestesDuFish1Reverse = {
        fish1ReverseRun: [{
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1639px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1548px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1457px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1366px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1275px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1184px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1093px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1002px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-911px',
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-820px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-729px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-638px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-547px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-456px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-365px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-274px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-183px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-92px',
        }, {
            largeurMasque: '89px',
            hauteurMasque: '41px',
            topDeImage: '-1px',
            leftDeImage: '-1px',
        }]
    }; // fin du gestesDuFish1

    /**** ANIMATION FISH1 ****** */

    //Création du div en html

    this.fish1ReverseContainerADeplacer = window.document.createElement('div');
    this.fish1ReverseContainerADeplacer.id = 'fish1ReverseContainer';
    this.fish1ReverseContainerADeplacer.style.top = offset + 'px';

    this.fish1ReverseContenuADeplacer = window.document.createElement('img');
    this.fish1ReverseContenuADeplacer.id = 'fish1ReverseContenu';
    this.fish1ReverseContenuADeplacer.src = './Assets/Images/Fish/Fish_1/Animations/Fish1reverse/spriteFish1reverse.png';
    //console.log('var fish1ReverseContenuADeplacer ok ')

    this.fish1ReverseContainerADeplacer.appendChild(this.fish1ReverseContenuADeplacer); // j insere le contenu recupere ds le container

    //On rattache le container créé dynamiquement au DOM
    window.document.getElementsByTagName('body')[0].appendChild(this.fish1ReverseContainerADeplacer);

    this.continuerNageFish1Reverse = true;
    // console.log('var continuerNageFish1Reverse OK')

    this.decalageLeftFish1Reverse = 2000; // definit la zone de depart/creation du fish1 (en dehors de l'ecran)
    // console.log('decalageLeftFish1Reverse -5 ok')

    // definit la vitesse de deplacement du fish
    this.vitesseFish1Reverse = 20;
    // console.log('vitesseFish1Reverse ok')

    this.timestampInitial = 0;

    this.removeFish = 0;

    this.nageFish1Reverse = function(i) { // animation du fish1
        var that = this;
        window.requestAnimationFrame(function(timestampActuel) {
            if (that.timestampInitial === undefined) {
                that.timestampInitial = timestampActuel;
            }

            var decalageNageoires = timestampActuel - that.timestampInitial;

            if (decalageNageoires > 0.5) { // vitesse de mouvement des nageoires

                that.timestampInitial = timestampActuel;

                if (i >= that.gestesDuFish1Reverse.fish1ReverseRun.length) {
                    i = 0;
                }

                //console.log('nageFish1Reverse if OK')

                that.fish1ReverseContainerADeplacer.style.width = that.gestesDuFish1Reverse.fish1ReverseRun[i].largeurMasque; // recuperation des coordonnees

                that.fish1ReverseContainerADeplacer.style.height = that.gestesDuFish1Reverse.fish1ReverseRun[i].hauteurMasque;

                that.fish1ReverseContenuADeplacer.style.top = that.gestesDuFish1Reverse.fish1ReverseRun[i].topDeImage;

                that.fish1ReverseContenuADeplacer.style.left = that.gestesDuFish1Reverse.fish1ReverseRun[i].leftDeImage;

                i++;
                // console.log('nageFish1Reverse i++ OK')

                /********COLLISIONS */


                var fish = that.fish1ReverseContainerADeplacer;
                var sharko = shark.sharkContainerADeplacer;

                if (
                    fish.offsetLeft < sharko.offsetLeft + sharko.offsetWidth &&
                    fish.offsetLeft > sharko.offsetLeft + sharko.offsetWidth - 50 && // -50 pour que le poisson disparaisse au milieu de la gueule du requin
                    fish.offsetTop + fish.offsetHeight > sharko.offsetTop &&
                    fish.offsetTop < sharko.offsetTop + sharko.offsetHeight
                ) {
                    var divScore = window.document.getElementById('score');
                    var scoreWin = 10 // definition du score a realiser pour gagner
                    var scoreValue = divScore.innerHTML; // je recupere la valeur du score
                    //console.log(scoreValue);

                    if (scoreValue < scoreWin && window.document.getElementById('gameover').style.display === "") { 
                        try {
                            that.fish1ReverseContainerADeplacer.remove();
                        } catch (err) {
                            that.fish1ReverseContainerADeplacer.parentNode.removeChild(that.fish1ReverseContainerADeplacer);
                        }
                        // gestion du score
                        scoreValue++;
                        divScore.innerHTML = scoreValue; // je remets le nouveau score ds la div score

                        // gestion win & loose
                        if (scoreValue === scoreWin) { // si score =10, je gagne dc j affiche la div win
                            window.document.getElementById('win').style.display = "block";
                            window.document.getElementById('treisureContainer').style.display = "block";
                        }
                    }
                };
                /******** fin COLLISIONS */

            }
            if (that.continuerNageFish1Reverse && that.removeFish == 0) {
                that.nageFish1Reverse(i);
            } else {
                // console.log('animation stop !!'); 
            }

            that.decalageLeftFish1Reverse -= that.vitesseFish1Reverse // inversion du sens de deplacement

            that.fish1ReverseContainerADeplacer.style.left = that.decalageLeftFish1Reverse + 'px';
            // console.log('fish1ReverseContainerADeplacer.style.left ok')

            if (parseFloat(that.fish1ReverseContainerADeplacer.style.left) < -parseFloat(that.fish1ReverseContainerADeplacer.style.width) && (that.removeFish == 0)) { // suppression du fish1 qd tte la largeur du masque du fish1 a depassee la limite gauche de l ecran 

                that.removeFish = 1; // si removeFish = 1, je stop l'animation 
                
                try {
                    that.fish1ReverseContainerADeplacer.remove();
                } catch (err) {
                    that.fish1ReverseContainerADeplacer.parentNode.removeChild(that.fish1ReverseContainerADeplacer);
                }
                // console.log('suppression fish1 OK ');
            }
        });
    };
    this.nageFish1Reverse(0);
};