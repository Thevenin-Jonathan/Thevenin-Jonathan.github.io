const app = {  
    activePixelClassColor : "pixel-dark",

    /*********************************************/
    /*****************FONCTIONS*******************/
    /*********************************************/
    init : function() {
        //Création du main container
        const mainContainer = document.createElement("div");
        mainContainer.classList.add("main-container");
        //On place le formulaire et la grille dans le main container
        const form = document.getElementsByClassName("configuration")[0];
        const invader = document.getElementById("invader");        
        form.before(mainContainer);
        mainContainer.appendChild(form);
        mainContainer.appendChild(invader);

        //Création du header et placement
        const header = document.createElement("header");
        header.classList.add("header");
        mainContainer.appendChild(header)
        header.appendChild(form);

        //Création de l'input taille de la grille et placement
        const gridInput = document.createElement("input");
        gridInput.id = "grid-input";
        gridInput.classList.add("input");
        gridInput.placeholder = "Taille de la grille";
        form.appendChild(gridInput);

        //Création de l'input taille des pixels et placement
        const pixelInput = document.createElement("input");
        pixelInput.id = "pixel-input";
        pixelInput.classList.add("input");
        pixelInput.placeholder= "Taille des pixels";
        form.appendChild(pixelInput);

        //Création du bouton valider et placement
        const validateButton = document.createElement("button");
        validateButton.classList.add("btn-validate");
        validateButton.innerHTML = "Valider";        
        validateButton.addEventListener("click", function(event){
            app.deleteCurrentGrid();
            app.generateGrid(gridInput.value, pixelInput.value);
            event.preventDefault();
        });
        form.appendChild(validateButton);

        //Création du main et placement
        const main = document.createElement("main");
        main.classList.add("main");
        mainContainer.appendChild(main);
        main.appendChild(invader);

        invader.innerText =
        `Paramétrez la grille et cliquez sur valider
        ou appuyez sur entrer`

        //Création de la palette de couleur
        const colorPallet = document.createElement("div");
        colorPallet.classList.add("color-pallet");
        colorPallet.addEventListener("click", function(event) {
            app.changeActiveColor(event, colorPallet);
        })
        invader.after(colorPallet);

        //Création des boutons de couleur
        const btnColorEmpty = document.createElement("div");
        btnColorEmpty.classList.add("color-pallet_btn-color", "color-pallet_btn-color--empty");
        colorPallet.appendChild(btnColorEmpty);

        const btnColorDark = document.createElement("div");
        btnColorDark.classList.add("color-pallet_btn-color", "color-pallet_btn-color--dark", "color-pallet_btn-color--active");
        colorPallet.appendChild(btnColorDark);

        const btnColorLight = document.createElement("div");
        btnColorLight.classList.add("color-pallet_btn-color", "color-pallet_btn-color--light");
        colorPallet.appendChild(btnColorLight);

        const btnColorHighlight = document.createElement("div");
        btnColorHighlight.classList.add("color-pallet_btn-color", "color-pallet_btn-color--highlight");
        colorPallet.appendChild(btnColorHighlight);
    },

    changeActiveColor : function(event, element) {
        if(event.target != element) {                
            for (let i = 0; i < element.children.length; i++) {
                let child = element.children[i];
                if (child === event.target) {
                    child.classList.add("color-pallet_btn-color--active");
                } else {
                    child.classList.remove("color-pallet_btn-color--active");
                }                    
            }

            if (event.target.classList.contains("color-pallet_btn-color--empty")) {
                app.activePixelClassColor = "pixel-empty";
            } else if (event.target.classList.contains("color-pallet_btn-color--dark")) {
                app.activePixelClassColor = "pixel-dark";
            } else if (event.target.classList.contains("color-pallet_btn-color--light")) {
                app.activePixelClassColor = "pixel-light";
            } else if (event.target.classList.contains("color-pallet_btn-color--highlight")) {
                app.activePixelClassColor = "pixel-highlight";
            }
        };
    },

    deleteCurrentGrid : function() {
        invader.innerHTML = "";
    },

    pixelChangeClassColor : function(pixel) {
        pixel.classList = "";
        pixel.classList.add("pixel");
        pixel.classList.add(app.activePixelClassColor); 
    },

    generateGrid : function(sizeGrid, sizePixel) {
        sizeGrid = sizeGrid ? sizeGrid : 10;
        sizePixel = sizePixel ? sizePixel : 30;
        for( let i = 0; i < sizeGrid; i++) {
            const line = document.createElement("div");
            invader.appendChild(line);
        
            for(let j = 0; j < sizeGrid; j++){
                const pixel = document.createElement("div");
                pixel.classList.add("pixel");
                pixel.addEventListener('click', function (){
                    app.pixelChangeClassColor(pixel);                   
                });
                pixel.style.width = sizePixel + "px";
                pixel.style.height = pixel.style.width;
                line.appendChild(pixel);
            }
        };
    }
}

/*********************************************/
/*****************GAME LOOP*******************/
/*********************************************/
app.init();
