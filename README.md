# Présentation
Cette extension voit le jour le 19 juin 2024. Elle permet d'ajouter à Firefox (le meilleur navigateur de mon point de vue :wink:) une fonctionnalité de recherche dans les pages web. Quand on clique sur l'icone de l'extension (en haut à droite généralement), une petite popup souvre, contenant une barre de recherche moderne avec à droite une loupe. Si vous taper un texte dans la barre de recherche puis que vous appuyez sur la loupe ou sur la touche "Entrée" de votre clavier, les mots de la page correspondant à votre recherche seront mis en surbrillance.

À côté de la barre de recherche, à gauche, se trouve un bouton permettant d'annuler la recherche (c'est à dire qu'il supprime tous les mots mis en surbrillance par la recherche précédente).

## IMPORTANT ⚠️
**Cette extension ne sert à rien puisque Firefox propose déjà une fonction de recherche avec surlignement (dynamique, en plus!) accessible avec le raccourci clavier Ctrl+F ou Ctrl+G**. Je l'ai créé uniquement parce que c'était un challenge de programmation, elle n'est pas utile!

# Permission
Cette extension n'a besoin que de l'acces à l'onglet courant, et rien d'autre. Elle est donc très sur d'utilisation.

## Fonctionnement
L'extension se compose de deux parties principales : le script de la popup (script.js) et le content script (content.js).
Elle utilise l'API WebExtensions de Firefox pour la communication entre la popup et le script de contenu.

### Script de la popup (script.js)
Ce script gère l'interface utilisateur de l'extension et communique avec le content script.
Principales fonctionnalités :

1. **Initialisation** : Le script attend que le DOM soit chargé avant d'initialiser les écouteurs d'événements.

2. **Gestion des événements de recherche** :
   - Écoute les clics sur l'icône de loupe.
   - Écoute la touche "Entrée" dans la barre de recherche.
   - Déclenche la fonction `performSearch()` dans ces deux cas.

3. **Fonction performSearch()** :
   - Récupère le terme de recherche depuis la barre de recherche.
   - Envoie un message au content script pour effectuer la mise en surbrillance.

4. **Gestion de l'annulation de recherche** :
   - Écoute les clics sur l'icône d'annulation.
   - Vide la barre de recherche.
   - Envoie un message au content script pour supprimer les surlignements.

5. **Communication avec le content script** :
   - Utilise l'API `browser.tabs` pour envoyer des messages au content script de l'onglet actif.

6. **Écoute des messages retour** :
   - Peut recevoir des messages du content script pour mettre à jour l'interface de la popup si nécessaire.

### Content Script (content.js)

Ce script s'exécute dans le contexte de la page web et gère la mise en surbrillance du texte.
Principales fonctionnalités :

1. **Écoute des messages** :
   - Reçoit les messages du script de la popup.
   - Réagit aux actions "highlight" et "cancelHighlight".

2. **Fonction highlightSearchTerms(searchTerm)** :
   - Utilise une expression régulière pour trouver les occurrences du terme de recherche.
   - Parcourt le DOM de la page à l'aide d'un TreeWalker.
   - Crée des éléments `<span>` avec un fond jaune pour entourer les termes trouvés.
   - Conserve une liste des éléments mis en surbrillance.

3. **Fonction removeHighlights()** :
   - Supprime tous les surlignements créés précédemment.
   - Restaure le texte original sans les balises `<span>`.

4. **Préservation du style de la page** :
   - La mise en surbrillance se fait en ajoutant des éléments `<span>` plutôt qu'en modifiant directement le HTML, ce qui préserve la structure et le style originaux de la page.

## Utilisation
1. Ouvrez la popup de l'extension.
2. Entrez un terme de recherche dans la barre.
3. Appuyez sur Entrée ou cliquez sur l'icône de loupe pour lancer la recherche.
4. Les occurrences du terme seront mises en surbrillance sur la page.
5. Pour annuler la recherche, cliquez sur l'icône d'annulation.