
const produtos = [
    {
        nome: "Gel de limpeza",
        descricao: "Ajuda a limpar as impurezas da pele.",
        preco: "R$ 39,90",
        emoji: "🧴"
    },
    {
        nome: "Hidratante facial",
        descricao: "Ajuda a manter a pele hidratada.",
        preco: "R$ 49,90",
        emoji: "🌸"
    },
    {
        nome: "Protetor solar",
        descricao: "Ajuda a proteger a pele dos raios UV.",
        preco: "R$ 59,90",
        emoji: "☀️"
    }
];

// FOR: repete a criação dos cartões de produtos
const lista = document.getElementById("listaProdutos");

for (let i = 0; i < produtos.length; i++) {
    lista.innerHTML += `
        <div class="produto">
            <div class="emoji">${produtos[i].emoji}</div>
            <h3>${produtos[i].nome}</h3>
            <p>${produtos[i].descricao}</p>
            <strong>${produtos[i].preco}</strong>
        </div>
    `;
}

// SWITCH: escolhe uma rotina de acordo com o tipo de pele
function mostrarRotina() {
    const tipo = document.getElementById("tipoPele").value;
    const resultado = document.getElementById("resultado");

    let rotina = "";

    switch (tipo) {
        case "oleosa":
            rotina = "Use um gel de limpeza suave, hidratante leve e protetor solar.";
            break;

        case "seca":
            rotina = "Prefira limpeza suave, hidratante mais nutritivo e protetor solar.";
            break;

        case "mista":
            rotina = "Use limpeza suave, hidratante equilibrado e protetor solar.";
            break;

        case "sensivel":
            rotina = "Prefira produtos suaves, sem fragrância, e protetor solar adequado.";
            break;

        default:
            rotina = "Escolha um tipo de pele para ver sua rotina.";
    }

    resultado.innerHTML = `
        <h3>Sua rotina de skincare 💗</h3>
        <p>${rotina}</p>
    `;
}

// WHILE: exibe os passos de uma rotina básica
function mostrarPassos() {
    const passos = [
        "1. Limpar a pele",
        "2. Hidratar a pele",
        "3. Aplicar protetor solar pela manhã"
    ];

    let i = 0;
    let texto = "";

    while (i < passos.length) {
        texto += `<p>${passos[i]}</p>`;
        i++;
    }

    return texto;
}

// Exibe os passos abaixo do seletor de tipo de pele
document.getElementById("resultado").innerHTML = `
    <h3>Passos básicos 💕</h3>
    ${mostrarPassos()}
`;
