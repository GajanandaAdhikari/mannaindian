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

document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("page");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  const currentPageNum = parseInt(window.location.pathname.match(/(\d+)\.html$/)?.[1]) || 1;

  function flipAndNavigate(direction) {
    if (!page) return;

    // Add flip class based on direction
    if (direction === "next") {
      page.classList.add("flip-next");
    } else {
      page.classList.add("flip-prev");
    }

    // Wait for animation duration before navigating
    setTimeout(() => {
      const targetPage = currentPageNum + (direction === "next" ? 1 : -1);
      if (targetPage < 1) return; // prevent negative or zero pages
      window.location.href = `${targetPage}.html`;
    }, 700); // match transition duration in CSS
  }

  nextBtn?.addEventListener("click", () => flipAndNavigate("next"));
  
  // Only add prev listener if currentPageNum > 1
  if (prevBtn && currentPageNum > 1) {
    prevBtn.addEventListener("click", () => flipAndNavigate("prev"));
  } else if (prevBtn) {
    // disable prev button on page 1
    prevBtn.disabled = true;
    prevBtn.style.opacity = "0.5";
    prevBtn.style.cursor = "not-allowed";
  }
});

