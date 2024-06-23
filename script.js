document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('barre-de-recherche');
    const searchIcon = document.querySelector('.icone-loupe-recherche');
    const cancelIcon = document.querySelector('.icone-annuler-recherche');
    let originalContent = '';
    let highlightedElements = [];

    // Fonction pour effectuer la recherche
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            highlightSearchTerms(searchTerm);
        }
    }

    // Écouteur d'événement pour l'icône de recherche
    searchIcon.addEventListener('click', performSearch);

    // Écouteur d'événement pour la touche Entrée dans la barre de recherche
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Écouteur d'événement pour l'icône d'annulation
    cancelIcon.addEventListener('click', cancelSearch);

    // Fonction pour mettre en surbrillance les termes de recherche
    function highlightSearchTerms(searchTerm) {
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                action: "highlight",
                searchTerm: searchTerm
            });
        });
    }

    // Fonction pour annuler la recherche
    function cancelSearch() {
        searchInput.value = '';
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                action: "cancelHighlight"
            });
        });
    }
});

// Écoute des messages du content script
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updatePopup") {
        // Mettre à jour l'interface de la popup si nécessaire
    }
});