export default function highlightHashtags(text) {
  let result = '';

  text.split(' ').forEach((value, index) => {
    if (index !== text.split(' ').length - 1) {
      if (value.startsWith('#')) {
        result += `<a href="/search?tag=${value.slice(1, value.length)}">${value}</a> `;
      } else {
        result += `${value} `;
      }
    } else if (index === text.split(' ').length - 1) {
      if (value.startsWith('#')) {
        result += `<a href="/search?tag=${value.slice(1, value.length)}">${value}</a>`;
      } else {
        result += value;
      }
    }
  });

  return result;
}
