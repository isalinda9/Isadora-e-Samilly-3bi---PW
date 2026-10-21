
// ==========================================
// 1. WHILE — CONTAGEM DE PRODUTOS
// ==========================================

let contador = 1;
let produtos = [
    "Gel de limpeza",
    "Sérum hidratante",
    "Creme facial"
];

let textoWhile = "";

while (contador <= produtos.length) {
    textoWhile += contador + ". " +
        produtos[contador - 1] + "\n";

    contador++;
}

document.getElementById("resultadoWhile").textContent =
    textoWhile;


// ==========================================
// 2. SWITCH — TIPOS DE PELE
// ==========================================

function executarSwitch() {
    let tipo = document.getElementById("tipoPele").value;
    let mensagem = "";

    switch (tipo) {
        case "seca":
            mensagem = "Pele seca: prefira um hidratante mais "
                + "cremoso e produtos suaves.";
            break;

        case "oleosa":
            mensagem = "Pele oleosa: procure hidratantes leves "
                + "e produtos adequados ao seu tipo de pele.";
            break;

        case "mista":
            mensagem = "Pele mista: busque equilíbrio entre "
                + "hidratação e controle da oleosidade.";
            break;

        case "sensivel":
            mensagem = "Pele sensível: prefira produtos suaves, "
                + "sem fragrância, e teste antes de usar.";
            break;

        default:
            mensagem = "Selecione um tipo de pele.";
    }

    document.getElementById("resultadoSwitch").textContent =
        mensagem;
}


// ==========================================
// 3. DO-WHILE — ROTINA DE SKINCARE
// ==========================================

function executarDoWhile() {
    let etapa = 0;

    let rotina = [
        "Limpar o rosto",
        "Aplicar hidratante",
        "Usar protetor solar pela manhã"
    ];

    let resultado = "";

    do {
        resultado += (etapa + 1) + ". "
            + rotina[etapa] + "\n";

        etapa++;
    } while (etapa < rotina.length);

    document.getElementById("resultadoDoWhile").textContent =
        resultado;
}


// ==========================================
// 4. FOR — ETAPAS DE CUIDADOS
// ==========================================

function executarFor() {
    let etapas = [
        "Limpeza facial",
        "Hidratação",
        "Protetor solar durante o dia"
    ];

    let resultado = "";

    for (let i = 0; i < etapas.length; i++) {
        resultado += (i + 1) + ". " + etapas[i] + "\n";
    }

    document.getElementById("resultadoFor").textContent =
        resultado;
}
