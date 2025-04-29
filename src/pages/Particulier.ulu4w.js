// Compteur des réponses
let responses = {
    etatGeneral: [],
    sommeil: [],
    humeur: []
};

// Fonction pour activer le bouton "Suivant" lorsqu'une réponse est donnée
function enableNextButton(category) {
    let categoryName = "";
    if (category === 1) {
        categoryName = "etatGeneral";
    } else if (category === 2) {
        categoryName = "sommeil";
    } else if (category === 3) {
        categoryName = "humeur";
    }

    // Vérifier si au moins une case est cochée
    const checkboxes = document.querySelectorAll(`input[name="${categoryName}"]:checked`);
    const nextButton = document.getElementById(`next${category}`);

    // Activer le bouton "Suivant" si au moins une case est cochée
    if (checkboxes.length > 0) {
        nextButton.disabled = false;
    } else {
        nextButton.disabled = true;
    }
}

// Fonction pour passer à la catégorie suivante et comptabiliser les réponses
function nextCategory(category) {
    // Récupérer les réponses de la catégorie actuelle
    let categoryName = "";
    if (category === 1) {
        categoryName = "etatGeneral";
    } else if (category === 2) {
        categoryName = "sommeil";
    } else if (category === 3) {
        categoryName = "humeur";
    }

    // Sauvegarder les réponses de la catégorie actuelle
    document.querySelectorAll(`input[name="${categoryName}"]:checked`).forEach(function(checkbox) {
        responses[categoryName].push(checkbox.value);
    });

    // Masquer la catégorie actuelle
    document.getElementById(`category${category}`).style.display = "none";

    // Afficher la prochaine catégorie
    if (category < 3) {
        document.getElementById(`category${category + 1}`).style.display = "block";
    } else {
        // Lorsque toutes les catégories sont complétées, afficher les résultats
        showResults();
    }
}

// Fonction pour afficher les résultats
function showResults() {
    let resultText = "Vos résultats :\n";
    
    // Compte des réponses par catégorie
    resultText += "État général: " + responses.etatGeneral.join(", ") + "\n";
    resultText += "Sommeil: " + responses.sommeil.join(", ") + "\n";
    resultText += "Humeur: " + responses.humeur.join(", ") + "\n";
    
    // Afficher les résultats dans le div
    document.getElementById("resultText").textContent = resultText;
    document.getElementById("result").style.display = "block";
}

// Activation de la fonction pour chaque catégorie lorsque l'utilisateur coche des cases
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const category = this.closest('.category').id.replace('category', '');
        enableNextButton(Number(category));
    });
});
