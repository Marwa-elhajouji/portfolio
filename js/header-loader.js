document.addEventListener("DOMContentLoaded", () => {
  // Détermine si on est dans un sous-dossier
  const path = window.location.pathname;
  const isInSubfolder = path.includes('/competences/') || path.includes('/realisations/');
  const headerPath = isInSubfolder ? "../header.html" : "header.html";
  
  fetch(headerPath)
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      // Si on est dans un sous-dossier, ajuste les chemins
      if (isInSubfolder) {
        // Ajuste uniquement les liens principaux (pas ceux du sous-menu)
        document.querySelectorAll(".nav-menu > li > a").forEach(link => {
          const href = link.getAttribute("href");
          if (href && !href.startsWith("http") && !href.startsWith("../")) {
            link.setAttribute("href", "../" + href);
          }
        });
        
        // Pour les liens du sous-menu, ajuster selon le dossier actuel
        document.querySelectorAll(".submenu a").forEach(link => {
          const href = link.getAttribute("href");
          if (href) {
            if (path.includes('/competences/') && href.includes('competences/')) {
              // Si on est dans competences/ et le lien pointe vers competences/
              const filename = href.split('/').pop();
              link.setAttribute("href", filename);
            } else if (path.includes('/realisations/') && href.includes('realisations/')) {
              // Si on est dans realisations/ et le lien pointe vers realisations/
              const filename = href.split('/').pop();
              link.setAttribute("href", filename);
            } else if (path.includes('/competences/') && href.includes('realisations/')) {
              // Si on est dans competences/ et le lien pointe vers realisations/
              link.setAttribute("href", "../" + href);
            } else if (path.includes('/realisations/') && href.includes('competences/')) {
              // Si on est dans realisations/ et le lien pointe vers competences/
              link.setAttribute("href", "../" + href);
            }
          }
        });
        
        // Ajuste l'image
        const img = document.querySelector("img.photo");
        if (img) {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("../")) {
            img.setAttribute("src", "../" + src);
          }
        }
      }

      // Marque la page active
      const currentPage = window.location.pathname.split("/").pop();
      
      // Pour tous les liens de navigation
      document.querySelectorAll(".nav-menu a").forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref) {
          const linkPage = linkHref.split("/").pop();
          if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
            link.classList.add("active");
          }
        }
      });
      
      // Si on est dans un sous-dossier, marque aussi le menu parent comme actif
      if (path.includes('/competences/')) {
        // Marque le menu Compétences comme actif
        document.querySelectorAll('.nav-menu a').forEach(link => {
          const href = link.getAttribute("href");
          if (href && href.includes("competences.html")) {
            link.setAttribute("aria-current", "page");
            link.classList.add("active");
          }
        });
      } else if (path.includes('/realisations/')) {
        // Marque le menu Réalisations comme actif
        document.querySelectorAll('.nav-menu a').forEach(link => {
          const href = link.getAttribute("href");
          if (href && href.includes("realisations.html")) {
            link.setAttribute("aria-current", "page");
            link.classList.add("active");
          }
        });
      }
    });
});