export function formatScreeningDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  const day = date.getDate();
  const months = [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
  ];
  const month = months[date.getMonth()];

  if (date.toDateString() === today.toDateString()) {
    return `Today ${day} ${month}`;
  }

  return `${day} ${month}`;
}
