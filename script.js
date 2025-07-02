const form = document.getElementById("usernameForm");
const langToggle = document.getElementById("langToggle");
const quoteBox = document.getElementById("quoteBox");
const verseBox = document.getElementById("verseBox");

const quotes_en = [
  "{{name}}, God is within you, you will not fall. – Psalm 46:5",
  "Be strong and courageous, {{name}}. Do not be afraid – Joshua 1:9",
  "{{name}}, you are fearfully and wonderfully made – Psalm 139:14",
  "{{name}}, trust in the Lord with all your heart – Proverbs 3:5",
  "Let your light shine before others, {{name}} – Matthew 5:16"
];

const quotes_ta = [
  "{{name}}, தேவன் உன்னுடன் இருக்கிறார் – யோசுவா 1:9",
  "{{name}}, பயப்படாதே! தேவன் உன் பக்கம் இருக்கிறார் – ஏசாயா 41:10",
  "{{name}} நீ தரிசனத்திற்கு உருவாக்கப்பட்டவன் – சங்கீதம் 139:14",
  "{{name}} உன் விசுவாசம் பெரிதாக இருக்கட்டும் – மத்தேயு 9:29"
];

let verseText = "Loading verse...";

// Fetch verse from API
fetch("https://beta.ourmanna.com/api/v1/get/?format=json")
  .then(res => res.json())
  .then(data => {
    verseText = `"${data.verse.details.text}" — ${data.verse.details.reference}`;
  })
  .catch(() => {
    verseText = "Couldn't load verse of the day.";
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  if (!name) return alert("Please enter your name");

  const quotes = langToggle.checked ? quotes_ta : quotes_en;
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const personalized = randomQuote.replace("{{name}}", name);

  quoteBox.innerText = personalized;
  verseBox.innerText = verseText;
});

function downloadQuote() {
  html2canvas(document.querySelector("#outputBox")).then(canvas => {
    const link = document.createElement("a");
    link.download = "faithful_quote.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function shareOnWhatsApp() {
  const message = `${quoteBox.innerText}\n${verseBox.innerText}`;
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
}
