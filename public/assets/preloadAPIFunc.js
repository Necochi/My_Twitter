export default function preloadAPI() {
  const preloadDiv = document.querySelector('.preload_div');
  fetch('https://burtovoy.github.io/messages.json')
    .then((response) => {
      if (response.ok) {
        preloadDiv.classList.add('hidden');
      }
    });
}
