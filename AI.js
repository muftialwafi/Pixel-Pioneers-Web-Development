const suituser = document.getElementById('suit');
const tombol = document.getElementById('tombolvs');
const popup = document.querySelector('.form-container');
const agenda_user = document.querySelector('#agendauser');
const date_user = document.querySelector('#dateuser');
const agenda_ai = document.querySelector('#agendaai');
const date_ai = document.querySelector('#dateai');

let hasil, output, comp;

// Buat rule 
function rule(user, comp) {
    if (user === comp) {
        return "Seri";
    } else if (user === 'scissor') {
        return comp === 'rock' ? false : true; 
    } else if (user === 'rock') {
        return comp === 'paper' ? false : true; 
    } else if (user === 'paper') {
        return comp === 'rock' ? true : false; 
    }
}

// Buat pilihan AI 
function ai() {
    let comp = Math.floor(15 * Math.random());
    if (comp <= 5) {
        return 'scissor';
    } else if (comp > 5 && comp <= 10) {
        return 'rock';
    } else {
        return 'paper';
    }
}

// Mulai adu 
tombol.addEventListener('click', () => {
    const user = suituser.value; 
    comp = ai();

    hasil = rule(user, comp);

    if (hasil === true) {
        output = `You Win! ${user} beat ${comp}.`;
        document.querySelector('#kegiatan').value = agenda_user.value;
        document.querySelector('#waktu').value = date_user.value;
    } else if (hasil === false) {
        output = `You lose! ${comp} beat ${user}.`;
        document.querySelector('#kegiatan').value = agenda_ai.value;
        document.querySelector('#waktu').value = date_ai.value;
    } else {
        output = `Draw! You and Bot choose ${user}.`;
    }

    popup.innerHTML = output;
    bukaPopupakun(); 
});

// Fungsi untuk membuka popup
function bukaPopupakun() {
    document.querySelector('.overlay').style.display = 'block';
    popup.style.display = 'block';
}

// Fungsi untuk menutup popup
function tutupPopupakun() {
    document.querySelector('.overlay').style.display = 'none'; 
}

// Tambahkan event listener untuk menutup popup ketika mengklik di luar popup
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('overlay')) {
        tutupPopupakun();
        window.location.href('Schedule.html');
    }
});