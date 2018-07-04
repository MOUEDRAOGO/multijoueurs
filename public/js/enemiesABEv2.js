function createEnemies(largeurEcran, offset) {

    var gestesDuFish1Reverse = {
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
    //debugger;
    var fish1ReverseContainerADeplacer = window.document.createElement('div');
    fish1ReverseContainerADeplacer.id = 'fish1ReverseContainer';
    fish1ReverseContainerADeplacer.style.top = offset + 'px';

    var fish1ReverseContenuADeplacer = window.document.createElement('img');
    fish1ReverseContenuADeplacer.id = 'fish1ReverseContenu';
    fish1ReverseContenuADeplacer.src = 'Assets/Images/Fish/Fish_1/Animations/Fish1reverse/spriteFish1reverse.png';
    //console.log('var fish1ReverseContenuADeplacer ok ')

    fish1ReverseContainerADeplacer.appendChild(fish1ReverseContenuADeplacer);

    //On rattache le container créé dynamiquement au DOM
    window.document.getElementsByTagName('body')[0].appendChild(fish1ReverseContainerADeplacer);

    var continuerNageFish1Reverse = true;
    // console.log('var continuerNageFish1Reverse OK')

    var decalageLeftFish1Reverse = 1930;
    // console.log('decalageLeftFish1Reverse -5 ok')

    // definit la vitesse de deplacement du fish
    var vitesseFish1Reverse = 10;
    // console.log('vitesseFish1Reverse ok')

    var timestampInitial = 0;

    var removeFish = 0;

    var nageFish1Reverse = function(i) {
        window.requestAnimationFrame(function(timestampActuel) {
            if (timestampInitial === undefined) {
                timestampInitial = timestampActuel;
            }

            var decalage = timestampActuel - timestampInitial;

            if (decalage > 0.5) { // vitesse de mouvement des nageoires

                timestampInitial = timestampActuel;

                if (i >= gestesDuFish1Reverse.fish1ReverseRun.length) {
                    i = 0;
                }

                //console.log('nageFish1Reverse if OK')



                fish1ReverseContainerADeplacer.style.width = gestesDuFish1Reverse.fish1ReverseRun[i].largeurMasque;

                fish1ReverseContainerADeplacer.style.height = gestesDuFish1Reverse.fish1ReverseRun[i].hauteurMasque;

                fish1ReverseContenuADeplacer.style.top = gestesDuFish1Reverse.fish1ReverseRun[i].topDeImage;

                fish1ReverseContenuADeplacer.style.left = gestesDuFish1Reverse.fish1ReverseRun[i].leftDeImage;

                i++;
                // console.log('nageFish1Reverse i++ OK')

                /********ESSAIS COLLISIONS */

                if (sharkContainer.offsetTop + 250 > fish1ReverseContainerADeplacer.offsetTop && sharkContainer.offsetTop - 50 < fish1ReverseContainerADeplacer.offsetTop && sharkContainer.offsetLeft + 190 > fish1ReverseContainerADeplacer.offsetLeft && sharkContainer.offsetLeft - 340 < fish1ReverseContainerADeplacer.offsetLeft) {
                    var divScore = window.document.getElementById('score');
                    var scoreValue = divScore.innerHTML; //getAttribute('value');	   //fait disparaitre le requin

                    if (scoreValue < 10 && window.document.getElementById('gameover').style.display === "") {
                        fish1ReverseContainerADeplacer.remove();
                        // fish1ReverseContainer.style.display = "none";

                        // gestion du score

                        scoreValue++;
                        divScore.innerHTML = scoreValue;

                        // gestion win & loose

                        if (scoreValue === 10) {
                            window.document.getElementById('win').style.display = "block";
                        }
                    }
                }



                /////////////////////////////////////////////


                // console.log('Position gauche poisson ' + document.getElementById('fish1ReverseContainer').offsetLeft);

                // console.log('Position gauche requin ' + (400 + document.getElementById('sharkRunContainer').offsetLeft));

                // if ((document.getElementById('fish1ReverseContainer').offsetLeft < (parseFloat(sharkRunContainerADeplacer.style.width) + document.getElementById('sharkRunContainer').offsetLeft)) && (document.getElementById('fish1ReverseContainer').offsetTop < (parseFloat(sharkRunContainerADeplacer.style.width) + document.getElementById('sharkRunContainer').offsetTop))
                // ) {

                //     alert("collision Christophe");

                // }


                /////////////////////////////////////////////

                //1ere condition

                // var collisionVerticale = parseFloat(sharkRunContainerADeplacer.style.left) + parseFloat(sharkRunContainerADeplacer.style.width) > parseFloat(fish1ReverseContainerADeplacer.style.left) && parseFloat(sharkRunContainerADeplacer.style.left) < parseFloat(fish1ReverseContainerADeplacer.style.left) + parseFloat(fish1ReverseContainerADeplacer.style.width);

                // // console.log(parseFloat(sharkRunContainerADeplacer.style.left) + ' parseFloat(sharkRunContainerADeplacer.style.left)'); RETOUR VALEUR OK
                // // console.log(parseFloat(sharkRunContainerADeplacer.style.width) + ' parseFloat//:(sharkRunContainerADeplacer.style.width)'); RETOUR VALEUR OK
                // // console.log(parseFloat(fish1ReverseContainerADeplacer.style.left) + ' parseFloat(fish1ReverseContainerADeplacer.style.left)'); RETOUR VALEUR OK
                // // console.log(parseFloat(fish1ReverseContainerADeplacer.style.width) + 'parseFloat(fish1ReverseContainerADeplacer.style.width)'); RETOUR VALEUR OK

                // // 2ieme condition 

                // var collisionHorizontale = parseFloat(sharkRunContainerADeplacer.style.top) < (parseFloat(fish1ReverseContainerADeplacer.style.top) + parseFloat(fish1ReverseContainerADeplacer.style.height)) && (parseFloat(sharkRunContainerADeplacer.style.top) + parseFloat(sharkRunContainerADeplacer.style.height)) > parseFloat(fish1ReverseContainerADeplacer.style.top);
                // //console.log(sharkRunContainerADeplacer);

                // // console.log(sharkRunContainerADeplacer.style.top + ' parseFloat(sharkRunContainerADeplacer.style.top)');
                // // console.log(sharkRunContainerADeplacer.style.height + ' parseFloat(sharkRunContainerADeplacer.style.height)');
                // //console.log(fish1ReverseContainerADeplacer.offsetTop + 'OFFSET TOP');
                // // Travailler avec les oofset top plutot que les style.top qui  ne sont pas définis
                // // console.log(fish1ReverseContainerADeplacer.style.top + ' parseFloat(fish1ReverseContainerADeplacer.style.top)');
                // // console.log(fish1ReverseContainerADeplacer.style.height + ' parseFloat(fish1ReverseContainerADeplacer.style.height)');






                // // 3ieme condition : La collision
                // // Si
                // //     Requin ET Poisson sont présents sur la même colonne.
                // // ET
                // //     Requin ET Poisson sont présents sur la même ligne.  
                // // ALORS

                // //     COLLISION CONDITION !


                // var collisionVerticaleEtHorizontale = collisionVerticale && collisionHorizontale

                // if (collisionVerticaleEtHorizontale) {
                //     alert("collision verticale et horizontale")
                // }


                /////////////////////////////////////////////


                // if (parseFloat(sharkRunContainerADeplacer.style.left) + parseFloat(sharkRunContainerADeplacer.style.width) > parseFloat(fish1ReverseContainerADeplacer.style.left) && parseFloat(sharkRunContainerADeplacer.style.left) < parseFloat(fish1ReverseContainerADeplacer.style.left) + parseFloat(fish1ReverseContainerADeplacer.style.width) && parseFloat(sharkRunContainerADeplacer.style.top) < parseFloat(fish1ReverseContainerADeplacer.style.top) + parseFloat(fish1ReverseContainerADeplacer.style.height) && parseFloat(sharkRunContainerADeplacer.style.top) + parseFloat(sharkRunContainerADeplacer.style.height) > parseFloat(fish1ReverseContainerADeplacer.style.top)) {

                //     alert("collision verticale et horizontale")

                // }





                /******** fin ESSAIS COLLISIONS */


            }
            if (continuerNageFish1Reverse && removeFish == 0) {
                nageFish1Reverse(i);
            } else {
                // console.log('animation stop !!'); // si removeFish = 1, je stop l'animation nageFish1Reverse
            }

            decalageLeftFish1Reverse -= vitesseFish1Reverse

            fish1ReverseContainerADeplacer.style.left = decalageLeftFish1Reverse + 'px';
            // console.log('fish1ReverseContainerADeplacer.style.left ok')



            if (parseFloat(fish1ReverseContainerADeplacer.style.left) < -parseFloat(fish1ReverseContainerADeplacer.style.width) && (removeFish == 0)) { // suppression du fish1 qd tte la largeur du masque du fish1 a depassee la limite gauche de l ecran 

                removeFish = 1; // si removeFish = 1, je stop l'animation 

                fish1ReverseContainerADeplacer.remove();
                // console.log('suppression fish1 OK ');

            }







        });
    };

    nageFish1Reverse(0);
}