const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// Perubahan di sini: otomatis mengambil semua elemen class paper
const papers = document.querySelectorAll(".paper");

let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;

// Inisialisasi urutan z-index awal
papers.forEach((paper, index) => {
  paper.style.zIndex = numOfPapers - index;
});

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Fungsi untuk mengontrol posisi tengah buku secara dinamis
function updateBookPosition() {
  book.classList.remove("open", "closed-back");

  if (currentLocation === 1) {
    // Tidak tambah class apa-apa (kembali ke transform: translateX(0%))
  } else if (currentLocation === maxLocation) {
    book.classList.add("closed-back"); // transform: translateX(100%)
  } else {
    book.classList.add("open"); // transform: translateX(50%)
  }
}

function goNextPage() {
  if (currentLocation < maxLocation) {
    const paper = papers[currentLocation - 1];
    paper.classList.add("flipped");

    // Atur z-index di pertengahan animasi agar tidak tumpang tindih
    setTimeout(() => {
      paper.style.zIndex = currentLocation;
    }, 300);

    currentLocation++;
    updateBookPosition();
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    currentLocation--;

    const paper = papers[currentLocation - 1];
    paper.classList.remove("flipped");

    // Kembalikan z-index ke semula di pertengahan animasi
    setTimeout(() => {
      paper.style.zIndex = numOfPapers - currentLocation + 1;
    }, 300);

    updateBookPosition();
  }
}
// --- KODE PENGHITUNG WAKTU (TIMER) ---
// --- KODE PENGHITUNG WAKTU (TIMER) ---
function updateLoveTimer() {
  const startDate = new Date("2024-03-09T00:00:00");
  const currentDate = new Date();

  // Hitung total hari keseluruhan
  const timeDifference = currentDate.getTime() - startDate.getTime();
  const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const timerElement = document.getElementById("love-timer");

  // Jika hari ini belum mencapai tanggal yang ditentukan
  if (currentDate < startDate) {
    if (timerElement) {
      timerElement.innerHTML = "0 Days";
    }
    return;
  }

  // Tampilkan hanya total hari ke dalam elemen HTML
  if (timerElement) {
    timerElement.innerHTML = `${totalDays} Days`;
  }
}

// Jalankan pertama kali saat halaman dimuat
updateLoveTimer();

// Update otomatis setiap 1 jam
setInterval(updateLoveTimer, 1000 * 60 * 60);
