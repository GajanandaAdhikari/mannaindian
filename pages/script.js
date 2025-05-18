    // Default to Japanese on small screens
    if (window.innerWidth <= 768) {
        document.body.classList.add('show-japanese');
    }

    function toggleLanguage() {
        if (document.body.classList.contains('show-japanese')) {
            document.body.classList.remove('show-japanese');
            document.body.classList.add('show-english');
        } else {
            document.body.classList.remove('show-english');
            document.body.classList.add('show-japanese');
        }
    }

