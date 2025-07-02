// Quotes
const quotes_en = [
    "{{name}}, God is within you – Psalm 46:5",
    "Be strong, {{name}} – Joshua 1:9",
    "{{name}}, you are wonderfully made – Psalm 139:14"
  ];
  const quotes_ta = [
    "{{name}}, தேவன் உன்னுடன் இருக்கிறார் – யோசுவா 1:9",
    "{{name}}, நீ அற்புதமாக உருவாக்கப்பட்டவனாக இருக்கிறாய் – சங்கீதம் 139:14"
  ];
  
  const backgrounds = [
    "https://unsplash.com/photos/brown-wooden-cross-on-brown-rock-near-green-mountains-under-blue-sky-and-white-clouds-during-7Khwr4mkhNQ",
    "https://unsplash.com/photos/shallow-focus-photography-of-hand-and-people-RAZQiZOX3mU",
    "https://unsplash.com/photos/shallow-focus-photo-of-book-on-brown-wooden-table-H6gTVBETAI4",
    "https://unsplash.com/photos/hands-of-an-unrecognizable-woman-with-bible-praying-M_iqJHlus8A"
  ];
  
  // 🌄 Set Random Background
  document.body.style.backgroundImage = `url('${backgrounds[Math.floor(Math.random() * backgrounds.length)]}')`;
  
  // ✨ Parse Name and Language
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") || "Beloved";
  const lang = params.get("lang") || "en";
  
  const quoteList = lang === "ta" ? quotes_ta : quotes_en;
  const quote = quoteList[Math.floor(Math.random() * quoteList.length)].replace("{{name}}", name);
  
  // ✝️ Display Quote
  document.getElementById("quoteBox").innerText = quote;
  
  // 📖 Fetch Verse
  fetch("https://beta.ourmanna.com/api/v1/get/?format=json")
    .then(res => res.json())
    .then(data => {
      const verse = `"${data.verse.details.text}" — ${data.verse.details.reference}`;
      document.getElementById("verseBox").innerText = verse;
    })
    .catch(() => {
      document.getElementById("verseBox").innerText = "Couldn't load Bible verse.";
    });
  
  // 📥 Download as Image
  function downloadQuote() {
    html2canvas(document.querySelector(".container")).then(canvas => {
      const link = document.createElement("a");
      link.download = "faithful-quote.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  
  // 📤 Share on WhatsApp
  function shareOnWhatsApp() {
    const quote = document.getElementById("quoteBox").innerText;
    const verse = document.getElementById("verseBox").innerText;
    const message = `${quote}\n\n${verse}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }
  