document.addEventListener('DOMContentLoaded', () => {
  // Gestion du clic sur les headers pour afficher/masquer les détails
  const timelineHeaders = document.querySelectorAll('.timeline-header');
  
  timelineHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const timelineItem = header.closest('.timeline-item');
      const wasActive = timelineItem.classList.contains('active');
      
      // Fermer tous les autres items
      document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle l'item cliqué
      if (!wasActive) {
        timelineItem.classList.add('active');
      }
    });
  });
  
  // Animation au scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, observerOptions);
  
  // Observer tous les timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });
  
  // Ajouter un indicateur visuel pour les items cliquables
  timelineHeaders.forEach(header => {
    const arrow = document.createElement('span');
    arrow.className = 'expand-arrow';
    arrow.innerHTML = '▼';
    arrow.style.cssText = `
      position: absolute;
      right: 20px;
      top: 20px;
      color: #b28cd9;
      transition: transform 0.3s ease;
      font-size: 0.8em;
    `;
    header.style.position = 'relative';
    header.appendChild(arrow);
  });
  
  // Rotation de la flèche quand ouvert
  const updateArrows = () => {
    document.querySelectorAll('.timeline-item').forEach(item => {
      const arrow = item.querySelector('.expand-arrow');
      if (arrow) {
        if (item.classList.contains('active')) {
          arrow.style.transform = 'rotate(180deg)';
        } else {
          arrow.style.transform = 'rotate(0deg)';
        }
      }
    });
  };
  
  // Mettre à jour les flèches au clic
  timelineHeaders.forEach(header => {
    header.addEventListener('click', updateArrows);
  });
  
  // Ouvrir automatiquement le premier item
  const firstItem = document.querySelector('.timeline-item');
  if (firstItem) {
    firstItem.classList.add('active');
    updateArrows();
  }
});