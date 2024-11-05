// Buat Akun
let akun;
let namaakun = [];

if (localStorage.getItem('akun')) {
    namaakun = JSON.parse(localStorage.getItem('akun'));
    akun = true;
} else {
    akun = false;
}

// Popup akun di home
const popup = document.querySelector('.form-container');
const overlay = document.querySelector('.overlay');

function bukaPopupakun() {
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function tutupPopupakun() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

function dataakun(nama, email, pw,rank) {
    this.nama = nama;
    this.email = email;
    this.pw = pw;
    this.rank = rank;
}

if (akun) {
    console.log("Akun sudah ada:", namaakun);
} else {
    bukaPopupakun();
}

const isiakun = function () {
    let nama = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let pw = document.querySelector('#password').value;
    let rank = 0;
    return new dataakun(nama, email, pw, rank);
}

let daftarakun = document.getElementById('daftarakun');

daftarakun.addEventListener("click", function () {
    let data = isiakun();
    namaakun.push(data);
    localStorage.setItem('akun', JSON.stringify(namaakun));
    tutupPopupakun();
});

