document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            highlightSearchTerms(searchTerm);
        }
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                highlightSearchTerms(searchTerm);
            }
        }
    });

    function highlightSearchTerms(searchTerm) {
        const pageContent = document.body.innerText;
        const regex = new RegExp(searchTerm, 'gi');
        const highlightedContent = pageContent.replace(regex, function(match) {
            return `<span style="background-color: yellow;">${match}</span>`;
        });
        document.body.innerHTML = highlightedContent;
    }
});

