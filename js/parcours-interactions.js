document.addEventListener('DOMContentLoaded', () => {
  
  const timelineHeaders = document.querySelectorAll('.timeline-header');
  
  timelineHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const timelineItem = header.closest('.timeline-item');
      const wasActive = timelineItem.classList.contains('active');
      
      
      document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
      });
      
      
      if (!wasActive) {
        timelineItem.classList.add('active');
      }
    });
  });
  
  
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
  
  
  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });
  
  
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
  
  
  timelineHeaders.forEach(header => {
    header.addEventListener('click', updateArrows);
  });
  
  
  const firstItem = document.querySelector('.timeline-item');
  if (firstItem) {
    firstItem.classList.add('active');
    updateArrows();
  }
});