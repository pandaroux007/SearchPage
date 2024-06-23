let originalContent = '';
let highlightedElements = [];

// Écoute des messages du script de la popup
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "highlight") {
        highlightSearchTerms(request.searchTerm);
    } else if (request.action === "cancelHighlight") {
        removeHighlights();
    }
});

// Fonction pour mettre en surbrillance les termes de recherche
function highlightSearchTerms(searchTerm) {
    removeHighlights(); // Enlève les surlignements précédents
    const regex = new RegExp(searchTerm, 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
        const parent = node.parentNode;
        if (parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
            const content = node.textContent;
            if (regex.test(content)) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                content.replace(regex, function(match, index) {
                    fragment.appendChild(document.createTextNode(content.slice(lastIndex, index)));
                    const span = document.createElement('span');
                    span.style.backgroundColor = 'yellow';
                    span.textContent = match;
                    fragment.appendChild(span);
                    highlightedElements.push(span);
                    lastIndex = index + match.length;
                    return match;
                });
                fragment.appendChild(document.createTextNode(content.slice(lastIndex)));
                parent.replaceChild(fragment, node);
            }
        }
    }
}

// Fonction pour enlever les surlignements
function removeHighlights() {
    highlightedElements.forEach(el => {
        const parent = el.parentNode;
        if (parent) {
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        }
    });
    highlightedElements = [];
}