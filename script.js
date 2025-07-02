const form = document.getElementById("usernameForm");
const quoteBox = document.getElementById("quoteBox");
const verseBox = document.getElementById("verseBox");
const langToggle = document.getElementById("langToggle");
const output = document.getElementById("output");

const quotes_en = [
  "{{name}}, God is within you, you will not fall. – Psalm 46:5",
  "Be strong and courageous, {{name}}. Do not be afraid – Joshua 1:9",
  "{{name}}, you are fearfully and wonderfully made – Psalm 139:14",
  "{{name}}, trust in the Lord with all your heart – Proverbs 3:5",
  "Let your light shine before others, {{name}} – Matthew 5:16",
  "{{name}}, nothing is impossible with God – Luke 1:37"
];

const quotes_ta = [
  "{{name}} நீதிமானாக இருக்கும்போது தேவன் உன் பக்கத்தில் இருப்பார் - சங்கீதம் 34:19",
  "{{name}}, உன்னை ஆற்றலுடன் தேவன் நிரப்புவார் - யோவான் 14:27",
  "{{name}}, தேவன் உன்னை ஒருபோதும் விட்டு விடமாட்டார் - யோசுவா 1:5",
  "{{name}} தேவன் உன் வாழ்க்கைக்கு ஒரு திட்டம் வைத்துள்ளார் - எரேமியா 29:11",
  "{{name}}, அன்பும் சத்தியமும் உன்னை வழிநடத்தட்டும் - நூல் 3:3"
];

const images = [
  "https://source.unsplash.com/800x400/?cross",
  "https://source.unsplash.com/800x400/?bible",
  "https://source.unsplash.com/800x400/?church",
  "https://source.unsplash.com/800x400/?jesus",
  "https://source.unsplash.com/800x400/?sunlight,cross"
];

// 📖 Fetch Verse of the Day
fetch("https://beta.ourmanna.com/api/v1/get/?format=json")
  .then(response => response.json())
  .then(data => {
    const verse = `"${data.verse.details.text}" — ${data.verse.details.reference}`;
    verseBox.textContent = verse;
  })
  .catch(error => {
    verseBox.textContent = "Verse of the day couldn't be loaded.";
    console.error("Error fetching verse:", error);
  });

// ✨ Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const isTamil = document.getElementById("langToggle").checked;
    const selectedQuotes = isTamil ? quotes_ta : quotes_en;
  
    // 🔒 Check localStorage for today's date
    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    const lastUsed = localStorage.getItem("quoteDate");
  
    if (lastUsed === today) {
      alert("🌟 You have already received a quote for today. Please come back tomorrow!");
      return;
    }
  
    // ✅ Generate new quote
    const randomQuote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)].replace("{{name}}", username);
    quoteBox.textContent = randomQuote;
  
    // 🕒 Save date to localStorage
    localStorage.setItem("quoteDate", today);
  });
  

  const isTamil = langToggle.checked;
  const selectedQuotes = isTamil ? quotes_ta : quotes_en;
  const randomQuote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)].replace("{{name}}", username);
  const img = images[Math.floor(Math.random() * images.length)];

  quoteBox.textContent = randomQuote;

  output.innerHTML = `
    <div id="outputBox" style="margin-top: 20px;">
      <div style="padding: 10px; background: #fff; border-radius: 10px;">
        <h2 style="color:#333;">${randomQuote}</h2>
        <img src="${img}" alt="Quote Image" style="width:100%; border-radius:10px; margin-top:10px;" />
      </div>
      <button onclick="downloadQuote()" style="margin-top: 10px;">📥 Download as Image</button>
      <button onclick="shareOnWhatsApp()" style="margin-top: 10px;">📤 Share on WhatsApp</button>
    </div>
  `;

  localStorage.setItem("quoteDate", today);

// 📥 Download quoteBox as image
function downloadQuote() {
  html2canvas(document.querySelector("#outputBox")).then(canvas => {
    let link = document.createElement('a');
    link.download = 'christian-quote.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// 📤 Share on WhatsApp
function shareOnWhatsApp() {
  const text = quoteBox.textContent + "\n\n" + verseBox.textContent;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
