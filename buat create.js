// Array Untuk mengambil Data dari User dan diubah jadi JSON :
let data_schedule = [];
let data_accomplished = [];
// Data JSON yg diuah jadi Object dan data-nya diambil buat ditampilkan di HTML :
let LS_schedule = localStorage.getItem('TODO');
let LS_accomplished = localStorage.getItem('TODO-DONE');

// agar UI-nya tidak hilang saat di refresh :
if (LS_schedule || LS_accomplished) {
    // Schedule :
    const json1 = JSON.parse(LS_schedule)
    for(let i=0; i< json1.length; i++) {
        data_schedule.push(json1[i]);
        const rak = document.querySelector('.rak table tbody');
        rak.innerHTML = buatScheduleUI(json1);;
    }

    // Accomplished :
    if (LS_accomplished) {
        const json2 = JSON.parse(LS_accomplished)
        for(let i=0; i< json2.length; i++) {
            data_accomplished.push(json2[i]);
            const rak = document.querySelector('.rak-selesai table tbody');
            rak.innerHTML = buatAccomplishedUI(json2);;
        }
    }
}






// Buat Rak-Schedule :
document.querySelector('#tambah')
    .addEventListener('click', function() {
    buatRakSchedule();
    return window.location.href = 'Schedule.html';
})

document.querySelector('#waktu')
    .addEventListener('keyup', function(e) {
        if (e.keyCode === 13) return buatRakSchedule();
})



function inputUser() {
    const kegiatan = document.querySelector('#kegiatan');
    const waktu = document.querySelector('#waktu');
    const today = hari(waktu.value);
    const data = new dataValidasi(kegiatan.value,waktu.value,today);

    // saat di enter | di klik tombol "Tambah" tulisan pada input jadi kosong :
    kegiatan.value = '';
    waktu.value = '';
    
    return data;
}

function hari(w) {
    const hari = new Date(w).getDay();
    let today = '';
    if(hari == 0) today = 'Sunday'; 
    if(hari == 1) today = 'Monday';
    if(hari == 2) today = 'Thursday';
    if(hari == 3) today = 'Wednesday';
    if(hari == 4) today = 'Tuesday';
    if(hari == 5) today = 'Friday';
    if(hari == 6) today = 'Saturday';

    return today;
}

// buat id
function dataValidasi(todo,waktu,hari) {
    this.kegiatan = todo;
    this.waktu = waktu;
    this.hari = hari;
    this.id = Math.round(Math.random() * 128003)
}

function buatRakSchedule() {
    const input = inputUser();
    LS_schedule = localStorage.getItem('TODO');
    const json = JSON.parse(LS_schedule);

    if (!LS_schedule) {
        data_schedule = [];
        data_schedule.push(input);
    } else if (json.length == 0) {
        data_schedule = [];
        data_schedule.push(input);
    } else {
        data_schedule.push(input);
    }
    

    if(!input.kegiatan || !input.waktu) {
        alert('isi data terlebih dahulu oke!')
        return data_schedule.pop();
    }

    localStorage.setItem('TODO', JSON.stringify(data_schedule));
    document.querySelector('.rak table tbody tr').innerHTML = buatScheduleUI(data_schedule);
}

function buatScheduleUI(data) {
    let UI = '';
    for(let i = 0; i < data_schedule.length; i++) {
        UI += scheduleUI(data[i])
    }
    return UI;
}

function scheduleUI({kegiatan, waktu, hari, id}) {
    return `<tr><td></td><td>${kegiatan}</td><td>${hari}, ${waktu} <img class="remove" src ="closeSvg.svg"data-schedule="${id}"><img class="selesai" src="nextSvg.svg"data-schedule="${id}"></td></tr>`;
}






// Buat Rak-Accomplished :
function libselesai() {
    document.querySelector('.rak table tbody').addEventListener('click', function(e) {
        if (e.target.classList.contains('selesai')) {
            const id = e.target.dataset.schedule;
            const taskIndex = data_schedule.findIndex(task => task.id == id);
            
            if (taskIndex > -1) {
                data_accomplished.push(data_schedule[taskIndex]);
                localStorage.setItem('TODO-DONE', JSON.stringify(data_accomplished));
                data_schedule.splice(taskIndex, 1);
                localStorage.setItem('TODO', JSON.stringify(data_schedule));
                document.querySelector('.rak table tbody').innerHTML = buatScheduleUI(data_schedule);
                document.querySelector('.rak-selesai table tbody').innerHTML = buatAccomplishedUI(data_accomplished);
                updateRankDisplay();
                location.reload();
            }
        }
    });
}

libselesai();

function buatAccomplishedUI(data) {
    let UI = '';
    for(let i = 0; i < data_accomplished.length; i++) {
        UI += accomplishedUI(data[i])
    }
    return UI;
}

function accomplishedUI({kegiatan, waktu, hari, id}) {
    return `<tr><td></td><td>${kegiatan}</td><td>${hari}, ${waktu} <img class="remove" src ="closeSvg.svg"data-schedule="${id}"></td></tr>`;
}






// Pindahin Data dari Rak-Accomplished ke Rak-Schedule :
const div_accomplished = document.querySelector('.rak-selesai table tbody');
div_accomplished.addEventListener('click', function(e) {
    if (e.target.classList.contains('kembali')) {
        const id = e.target.dataset.selesai;
        for(let i=0; i < data_accomplished.length; i++) {
            if(data_accomplished[i].id == id) {
                data_schedule.push(data_accomplished[i]);
                localStorage.setItem('TODO',JSON.stringify(data_schedule));

                data_accomplished.splice(i,1);
                localStorage.setItem('TODO-DONE',JSON.stringify(data_accomplished));

                document.querySelector('.rak table tbody').innerHTML = buatScheduleUI(data_schedule);
                e.target.parentElement.remove();
                
            }  
        }
    }
})





// remove-Schedule & remove-Accomplished
document.querySelector('.rak table tbody').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove')) {
        const scheduleId = e.target.dataset.schedule;
        let LS_schedule = localStorage.getItem('TODO');
        let json1 = JSON.parse(LS_schedule) || []; 

        // Menghapus dari Schedule
        json1 = json1.filter(d => d.id != scheduleId);
        localStorage.setItem('TODO', JSON.stringify(json1));
        e.target.closest('tr').remove(); 
    }
});

document.querySelector('.rak-selesai table tbody').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove')) {
        const scheduleId = e.target.dataset.schedule;
        let LS_accomplished = localStorage.getItem('TODO-DONE');
        let json = JSON.parse(LS_accomplished) || [];

        // Menghapus dari Accomplished
        json = json.filter(d => d.id != scheduleId);
        localStorage.setItem('TODO-DONE', JSON.stringify(json));
        e.target.closest('tr').remove(); 
    }
});



// Hapus semua data pada Schedule | Accomplished :
const btnHapusSemua = document.querySelector('#clear');
btnHapusSemua.addEventListener('click',function(e) {
    localStorage.removeItem('TODO');
    localStorage.removeItem('TODO-DONE');

    document.querySelector('.rak table tbody').remove();
    document.querySelector('.rak-selesai table tbody').remove();
})
