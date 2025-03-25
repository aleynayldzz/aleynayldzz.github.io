const unsplashKey = '3L6ifapsBhTe2L7JnNMpiR2L1-vG5Umvfewuncbbr8g'; 



function changeBackground(mood) {
  const body = document.body;

  const moodBackgrounds = {
    happy: "linear-gradient(135deg, #fef9c3, #fde68a)",
    sad: "linear-gradient(135deg, #cbd5e1, #94a3b8)",
    angry: "linear-gradient(135deg, #fca5a5, #ef4444)",
    relaxed: "linear-gradient(135deg, #a7f3d0, #6ee7b7)",
    energetic: "linear-gradient(135deg, #fcd34d, #f97316)",
    romantic: "linear-gradient(135deg, #fbcfe8, #f472b6)",
    bored: "linear-gradient(135deg, #e0e7ff, #c7d2fe)",
    motivated: "linear-gradient(135deg, #93c5fd, #3b82f6)"
  };

  body.style.background = moodBackgrounds[mood] || "#f0f4f8";
}

async function getMoodImages() {
  const mood = document.getElementById("moodSelect").value;
  if (!mood) return alert("Lütfen bir ruh hali seç!");

  changeBackground(mood);

  const randomPage = Math.floor(Math.random() * 5) + 1;

  const imageUrl = `https://api.unsplash.com/search/photos?query=${mood}&page=${randomPage}&per_page=9&client_id=${unsplashKey}`;
  const imageRes = await fetch(imageUrl);
  const imageData = await imageRes.json();

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  imageData.results.forEach(photo => {
    const img = document.createElement("img");
    img.src = photo.urls.regular;
    img.alt = mood + " image";
    gallery.appendChild(img);
  });

  const quoteRes = await fetch("https://zenquotes.io/api/random");
  const quoteData = await quoteRes.json();
  document.getElementById("quoteBox").innerText = `"${quoteData[0].q}" - ${quoteData[0].a}`;
}
