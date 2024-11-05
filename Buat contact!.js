document.getElementById('bukakontak').onclick = function() {
    document.getElementById('popup').style.display = 'block';
}

document.getElementById('tutupkontak').onclick = function() {
    document.getElementById('popup').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
}

document.getElementById('contactForm').onsubmit = function(event) {
    event.preventDefault();
    alert('Form telah dikirim!'); // Ganti dengan logika pengiriman form yang sesuai
    document.getElementById('popup').style.display = 'none'; // Menutup popup setelah pengiriman
}
