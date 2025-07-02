const quotes = [
    "{name}, God is within you, you will not fall. – Psalm 46:5",
    "{name}, be strong and courageous. – Joshua 1:9",
    "{name}, the Lord will fight for you. – Exodus 14:14",
    "Fear not, {name}, for I am with you. – Isaiah 41:10",
    "The plans I have for you, {name}, are to prosper you. – Jeremiah 29:11"
  ];
  
  const images = [
    "https://source.unsplash.com/800x400/?cross",
    "https://source.unsplash.com/800x400/?bible",
    "https://source.unsplash.com/800x400/?church",
    "https://source.unsplash.com/800x400/?jesus",
    "https://source.unsplash.com/800x400/?sunlight,cross"
  ];
  
  function generateQuote() {
    const name = document.getElementById('username').value.trim();
    if (!name) {
      alert("Please enter your name!");
      return;
    }
  
    const quote = quotes[Math.floor(Math.random() * quotes.length)].replace("{name}", name);
    const img = images[Math.floor(Math.random() * images.length)];
  
    document.getElementById('output').innerHTML = `
      <h2>${quote}</h2>
      <img src="${img}" style="width:100%; border-radius: 10px; margin-top: 20px;" />
    `;
  }
  