var ConstructeurMines = function(shark, offset) {

    this.gestesDeLaMine = {
        MineFall: [{
            largeurMasque: '140px',
            hauteurMasque: '146px',
            topDeImage: '-5px',
            leftDeImage: '-5px',
        }, {
            largeurMasque: '140px',
            hauteurMasque: '146px',
            topDeImage: '-1px',
            leftDeImage: '-158px',
        }, {
            largeurMasque: '140px',
            hauteurMasque: '146px',
            topDeImage: '-1px',
            leftDeImage: '-314px',
        }
        ]}; // fin du gestesDeLaMine

    /**** ANIMATION Mine ****** */

    //Création du div en html

    this.mineContainerADeplacer = window.document.createElement('div');
    this.mineContainerADeplacer.id = 'mineContainer';
    this.mineContainerADeplacer.style.top = offset + 'px';

    this.mineContenuADeplacer = window.document.createElement('img');
    this.mineContenuADeplacer.id = 'mineContenu';
    this.mineContenuADeplacer.src = '../Assets/Images/Bomb/Bomb_fall.png';
    //console.log('var mineContenuADeplacer ok ')

    this.mineContainerADeplacer.appendChild(this.mineContenuADeplacer); // j insere le contenu recupere ds le container

    //On rattache le container créé dynamiquement au DOM
    window.document.getElementsByTagName('body')[0].appendChild(this.mineContainerADeplacer);

    this.continuerMineFall = true;
    // console.log('var continuerMineFall OK')

    this.decalageTopMineFall = 1800; // definit la zone de depart/creation du fish1 (dans l'ecran)
    // console.log('decalageTopMineFall -5 ok')

    // definit la vitesse de deplacement du bomb
    this.vitesseMineFall = 3;
    // console.log('vitesseMineFall ok')

    this.timestampInitial = 0;

    this.removeMine = 0;

    this.compteurPourAnimationMine = 0;

    this.animationMineFall = function(i) { // animation de la mine
        
        var that = this;
    
        //console.log('animationMineFall if OK')

        that.mineContainerADeplacer.style.width = that.gestesDeLaMine.MineFall[i].largeurMasque; // recuperation des coordonnees

        that.mineContainerADeplacer.style.height = that.gestesDeLaMine.MineFall[i].hauteurMasque;

        that.mineContenuADeplacer.style.top = that.gestesDeLaMine.MineFall[i].topDeImage;

        that.mineContenuADeplacer.style.left = that.gestesDeLaMine.MineFall[i].leftDeImage;

        // 
        i++;
        // console.log('animationMineFall i++ OK')

        /********COLLISIONS */
        var bomb = that.mineContainerADeplacer;
        var sharko = shark.sharkContainerADeplacer;

        if (
            bomb.offsetLeft < sharko.offsetLeft + sharko.offsetWidth &&
            bomb.offsetLeft > sharko.offsetLeft + sharko.offsetWidth  &&
            bomb.offsetTop + bomb.offsetHeight > sharko.offsetTop &&
            bomb.offsetTop < sharko.offsetTop + sharko.offsetHeight
        ) {
            var divScore = window.document.getElementById('score');
            var scoreWin = 10 // definition du score a realiser pour gagner
            var scoreValue = divScore.innerHTML; // je recupere la valeur du score
            //console.log(scoreValue);

            if (scoreValue < scoreWin && window.document.getElementById('gameover').style.display === "") { 
                try {
                    that.mineContainerADeplacer.remove();
                } catch (err) {
                    that.mineContainerADeplacer.parentNode.removeChild(that.mineContainerADeplacer);
                }
                // gestion du score
                scoreValue--; // a la collision, on decremente le score
                divScore.innerHTML = scoreValue; // je remets le nouveau score ds la div score

                // // gestion win & loose
                // if (scoreValue === scoreWin) { // si score =10, je gagne dc j affiche la div win
                //     window.document.getElementById('win').style.display = "block";
                //     window.document.getElementById('treisureContainer').style.display = "block";
                // }
            }
        };
                /******** fin COLLISIONS */

                if (that.continuerMineFall && that.removeMine == 0) {
                    that.animationMineFall(i);
                } else {
                    // console.log('animation stop !!'); 
                }
            
                that.decalageTopMineFall += that.vitesseMineFall // definition du sens de deplacement
            
                that.mineContainerADeplacer.style.top = that.decalageTopMineFall + 'px';
                // console.log('mineContainerADeplacer.style.top ok')
            
                if (parseFloat(that.mineContainerADeplacer.style.top) < parseFloat(that.mineContainerADeplacer.style.height) && (that.removeMine == 0)) { // suppression dela mine qd tte la hauteur du masque de la mine a depassee la limite basse du cadre du jeu
            
                    that.removeMine = 1; // si removeMine = 1, je stop l'animation 
                    
                    try {
                        that.mineContainerADeplacer.remove();
                    } catch (err) {
                        that.mineContainerADeplacer.parentNode.removeChild(that.mineContainerADeplacer);
                    }
                    // console.log('suppression fish1 OK ');
            
                }; 
    };// fin animation

    this.animationMineFall(0);
};// fin constructeur