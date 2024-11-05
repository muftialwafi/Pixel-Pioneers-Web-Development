// buat hal akun 
let userakun = document.getElementById('nmaakun');
let user_akun = document.getElementById('user');
let passakun = document.getElementById('pass');
let mailakun = document.getElementById('mail');
namaakun = JSON.parse(localStorage.getItem('akun'));

console.log(namaakun);

userakun.innerHTML = `<h3 style="margin:auto;margin-top:20px;font-size:20px;text-align:center">${namaakun[0].nama}</h3>`

user_akun.value = `${namaakun[0].nama}`;
passakun.value = `${namaakun[0].pw}`;
mailakun.value = `${namaakun[0].email}`;

// buat liat pw
const liatpw = document.getElementById('liatpw');


liatpw.addEventListener('click', () => {
    // Toggle tipe input antara 'password' dan 'text'
    const type = passakun.getAttribute('type') === 'password' ? 'text' : 'password';
    passakun.setAttribute('type', type);

    // Mengubah ikon atau teks toggle
    liatpw.textContent = type === 'password' ? 'OPEN' : 'CLOSE';
});

// buat ganti akun 
const ganti = document.getElementById('gantiakun');

ganti.addEventListener('click', () => {
    namaakun[0].nama = user_akun.value;
    namaakun[0].email = mailakun.value;
    namaakun[0].pw = passakun.value;
    localStorage.setItem('akun', JSON.stringify(namaakun));
    location.reload();
});