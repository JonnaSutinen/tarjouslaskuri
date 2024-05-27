function laskeTarjous() {
    const menu = document.getElementById('menu').value;
    const henkilot = parseInt(document.getElementById('henkilot').value);
    const budjetti = parseInt(document.getElementById('budjetti').value);

    if (isNaN(henkilot) || isNaN(budjetti)) {
        alert('Syötä kelvollinen numero henkilömäärälle ja budjetille.');
        return;
    }

    let hintaPerHenkilo;

    switch (menu) {
        case 'kana':
            hintaPerHenkilo = 10;
            break;
        case 'possu':
            hintaPerHenkilo = 12;
            break;
        case 'kasvis':
            hintaPerHenkilo = 8;
            break;
        case 'nauta':
            hintaPerHenkilo = 15;
            break;
        default:
            hintaPerHenkilo = 0;
    }

    const kokonaisHinta = henkilot * hintaPerHenkilo;

    if (kokonaisHinta > henkilot * budjetti) {
        document.getElementById('tulos').innerText = 'Budjetti ei riitä valittuun menuun.';
    } else {
        document.getElementById('tulos').innerText = `Kokonaiskustannus: ${kokonaisHinta} €`;
    }
}
