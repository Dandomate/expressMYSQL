document.getElementById('eddigigyros').onclick = gyrosokLista;

async function gyrosokLista() {
    const response = await fetch("/gyrosok");
    const gyrosok = await response.json();

    var gyrosHTML = "<h1>Az eddig felvett gyrosok listája</h1>";
    gyrosHTML += `<table id="gyrostabla"><tr><th>Név</th><th>Telefonszám</th><th>Cím</th><th>Adag</th><th>Típus</th><th>Mártás</th></tr>`;
    for (const egyGyros of gyrosok) {
        var sorClass = "nagyadag";
        if (egyGyros.adag === "kis")
            sorClass = "kis";
        gyrosHTML += `<tr><td>${egyGyros.nev}</td><td>${egyGyros.telefonszam}</td><td>${egyGyros.cim}</td><td>${egyGyros.tipus}</td><td>${egyGyros.martas}</td>
        <td class=>${sorClass}</td></tr>`;
    }
    gyrosHTML += `</table>`;

    document.getElementById("gyrosmut").innerHTML = gyrosHTML;
}

document.getElementById("gyrosform").onsubmit = async function (event) {
    event.preventDefault();
    const nev = event.target.elements.nev.value;
    const telefonszam = event.target.elements.telefonszam.value;
    const cim = event.target.elements.cim.value;
    const nagyadag  = event.target.elements.adag.checked;
    const tipus = event.target.elements.tipus.value;
    const martas = event.target.elements.martas.value;


    var adag = "kis"
    if( nagyadag == true)
    meret = "nagyadag";


    const res = await fetch("/gyrosok", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            nev,
            telefonszam,
            cim,
            adag,
            tipus,
            martas
        }),
    });

    if (res.ok) {
        gyrosokLista();
    } else {
        alert("Server error");
    }
};