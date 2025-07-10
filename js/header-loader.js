document.addEventListener("DOMContentLoaded", () => {
  
  const path = window.location.pathname;
  const isInSubfolder = path.includes('/competences/') || path.includes('/realisations/');
  const headerPath = isInSubfolder ? "../header.html" : "header.html";
  
  fetch(headerPath)
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      
      if (isInSubfolder) {
        
        document.querySelectorAll(".nav-menu > li > a").forEach(link => {
          const href = link.getAttribute("href");
          if (href && !href.startsWith("http") && !href.startsWith("../")) {
            link.setAttribute("href", "../" + href);
          }
        });
        
        
        document.querySelectorAll(".submenu a").forEach(link => {
          const href = link.getAttribute("href");
          if (href) {
            if (path.includes('/competences/') && href.includes('competences/')) {
              
              const filename = href.split('/').pop();
              link.setAttribute("href", filename);
            } else if (path.includes('/realisations/') && href.includes('realisations/')) {
              
              const filename = href.split('/').pop();
              link.setAttribute("href", filename);
            } else if (path.includes('/competences/') && href.includes('realisations/')) {
              
              link.setAttribute("href", "../" + href);
            } else if (path.includes('/realisations/') && href.includes('competences/')) {
              
              link.setAttribute("href", "../" + href);
            }
          }
        });
        
        
        const img = document.querySelector("img.photo");
        if (img) {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("../")) {
            img.setAttribute("src", "../" + src);
          }
        }
      }

      
      const currentPage = window.location.pathname.split("/").pop();
      
      
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
      
      
      if (path.includes('/competences/')) {
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
          const href = link.getAttribute("href");
          if (href && href.includes("competences.html")) {
            link.setAttribute("aria-current", "page");
            link.classList.add("active");
          }
        });
      } else if (path.includes('/realisations/')) {
        
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