export const addScrollAnimations = () => {
    const sections = document.querySelectorAll(".animate-content");
  
    const observerOptions = {
      threshold: 0.1, // Déclenche l'observation quand 10% de la section est visible
    };
  
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Ajouter la classe visible pour déclencher l'animation
          entry.target.classList.add("visible");
        } else {
          // Supprimer la classe visible quand la section quitte la vue
          entry.target.classList.remove("visible");
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  };
  