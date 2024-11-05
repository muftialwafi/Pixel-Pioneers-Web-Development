// Buat rank 

// Mengambil data akun dari localStorage
const data_akun = JSON.parse(localStorage.getItem('akun'));
console.log('Data akun:', data_akun); 

let pangkat = '';

// Menentukan pangkat berdasarkan rank
if (data_akun && data_akun.length > 0) { 
    if (data_akun[0].rank < 10 && data_akun[0].rank >= 0) {
        pangkat = 'Task director';   
    } else if (data_akun[0].rank < 20 && data_akun[0].rank >= 10) {
        pangkat = 'Productivity Booster';
    } else if (data_akun[0].rank < 30 && data_akun[0].rank >= 20) {
        pangkat = 'Power User';
    } else if (data_akun[0].rank < 40 && data_akun[0].rank >= 30) {
        pangkat = 'Productivity Ninja';
    } else {
        pangkat = 'Efficiency Expert';
    }
} else {
    console.error('Data akun tidak valid');
}

// Buat output 
const Elements = document.getElementsByClassName('rank');
console.log('Elemen rank ditemukan:', Elements.length > 0); 

// Membuat output
let rankout = `<p>${data_akun[0] ? data_akun[0].rank : 'Rank tidak tersedia'}</p><h5>${pangkat}</h5>`;

// Menunggu halaman dimuat sepenuhnya
window.addEventListener("load", () => {
    // Memastikan ada elemen dengan class 'rank' sebelum mengubah innerHTML
    if (Elements.length > 0) {
        Elements[0].innerHTML += rankout; 
        console.log('Output berhasil ditambahkan ke elemen rank.'); 
    } else {
        console.error('Elemen rank tidak ditemukan.');
    }
});

function updateRankDisplay() {
    data_akun[0].rank++;
    localStorage.setItem('akun', JSON.stringify(data_akun));
    Elements[0].innerHTML = `<a href="Account.html" style="width: 30px; margin-right: 10px;"><img src="Bahan/PP WA.jpg" alt="Photo Account" class="pphome"></a>`
}