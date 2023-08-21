const allWorks = new Set()
const allCategories = new Set()

const projectGal = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filterContainer = document.querySelector("#filterBtnContainer");
let login = document.querySelector('#login');

async function init(){
    const works = await fetchDatabaseData("works")
    for (const work of works) {
        allWorks.add(work)
    }
    const categories = await fetchDatabaseData("categories")
    for (const categorie of categories) {
        allCategories.add(categorie)
    }
    genProGal()
    createFilter()

}
init()

function isConnected(){
    login.textContent = "logout";
    login.addEventListener("click", (e) =>{
        e.preventDefault();
        // suprimer le local storage et remettre le site en mode visiteur

    });

    // creation de la barre noir en haut avec le mode edition 

    // les button modifier pour la section intro et projet 

}

// get works form api and make gallery be generated by javascript automaticly
async function fetchDatabaseData(type) {
    try {
        const response = await fetch(`http://localhost:5678/api/${type}`);
        return response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des données depuis l\'API:', error);
    }
}


// creation of the elements of the gallery 
function genProGal(filtre = "0"){
    projectGal.innerHTML = ""
    const fragment = document.createDocumentFragment()
    let selectedWorks = allWorks

    if (filtre != "0") {
        selectedWorks = [...allWorks].filter(work => work.categoryId == filtre);
        console.log(selectedWorks);
    }
    for (const work of selectedWorks){
        // we build the <figure> frist
        const project = document.createElement('figure');
        project.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>`
        //now we appenchild the figure to the main gallery div
        fragment.appendChild(project);
    }
    projectGal.appendChild(fragment)
}

function createFilter(){
    const buttonAll = document.createElement("button")
    buttonAll.dataset.id = "0"
    buttonAll.textContent = "Tous"
    buttonAll.setAttribute("class", "filterBtn filterBtn_selected");
    filterContainer.appendChild(buttonAll)
    
    for (const category of allCategories) {
        const button = document.createElement("button");
        button.dataset.id = category.id;
        button.textContent = category.name;
        button.setAttribute("class", "filterBtn");
        filterContainer.appendChild(button);
    }
    
    FilterEvent()
}

function FilterEvent() {
    const filterButtons = document.querySelectorAll(".filterBtn");

    filterButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            const clickedButton = e.target
            const categoryId = clickedButton.dataset.id;
            //retiré selected de l'ancien et le mettre sur le nouveau
            filterButtons.forEach(btn => {
                btn.classList.remove('filterBtn_selected');
            });
            clickedButton.classList.add('filterBtn_selected');
            genProGal(categoryId);
        });
    });
}

