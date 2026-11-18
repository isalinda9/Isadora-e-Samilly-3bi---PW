
const API_URL = "https://pokeapi.co/api/v2/";

const input = document.getElementById("pokemonInput");
const buscarBtn = document.getElementById("buscarBtn");
const aleatorioBtn = document.getElementById("aleatorioBtn");

const nome = document.getElementById("pokemonNome");
const numero = document.getElementById("pokemonNumero");
const imagem = document.getElementById("pokemonImagem");

const tipos = document.getElementById("pokemonTipos");
const altura = document.getElementById("pokemonAltura");
const peso = document.getElementById("pokemonPeso");
const xp = document.getElementById("pokemonXP");

const habilidades = document.getElementById("pokemonHabilidades");
const status = document.getElementById("pokemonStatus");
const card = document.getElementById("pokemonCard");

const nomesStatus = {
    hp: "❤️ HP",
    attack: "⚔️ Ataque",
    defense: "🛡️ Defesa",
    "special-attack": "✨ Ataque especial",
    "special-defense": "💜 Defesa especial",
    speed: "⚡ Velocidade"
};

const classesStatus = {
    hp: "hp",
    attack: "ataque",
    defense: "defesa",
    "special-attack": "especial",
    "special-defense": "especial",
    speed: "velocidade"
};

const coresTipos = {
    fire: "#ffad91",
    water: "#92c5ff",
    grass: "#9de4ad",
    electric: "#ffe58a",
    psychic: "#ffacd2",
    ice: "#a4e9f2",
    dragon: "#b7a0ff",
    dark: "#aaa0ae",
    fairy: "#f7b9dc",
    normal: "#d7d3b9",
    fighting: "#eea18b",
    flying: "#b6c8fa",
    poison: "#d7a0e8",
    ground: "#e8c49c",
    rock: "#d9ca91",
    bug: "#c5df8a",
    ghost: "#b5a5e7",
    steel: "#c5d1df"
};

const traducoesTipos = {
    fire: "Fogo",
    water: "Água",
    grass: "Planta",
    electric: "Elétrico",
    psychic: "Psíquico",
    ice: "Gelo",
    dragon: "Dragão",
    dark: "Sombrio",
    fairy: "Fada",
    normal: "Normal",
    fighting: "Lutador",
    flying: "Voador",
    poison: "Veneno",
    ground: "Terra",
    rock: "Pedra",
    bug: "Inseto",
    ghost: "Fantasma",
    steel: "Metal"
};


// CONSULTA COM TEMPO LIMITE

async function consultar(url) {

    const controlador = new AbortController();

    const temporizador = setTimeout(
        () => controlador.abort(),
        12000
    );

    try {

        const resposta = await fetch(url, {
            signal: controlador.signal
        });

        if (!resposta.ok) {
            throw new Error("Não encontrado");
        }

        return await resposta.json();

    } finally {

        clearTimeout(temporizador);

    }
}


// BUSCAR POKÉMON OU TIPO

async function buscarPokemon(valor) {

    const pesquisa = String(valor).trim().toLowerCase();

    if (!pesquisa) {
        alert("Digite um nome, número ou tipo!");
        return;
    }

    buscarBtn.disabled = true;
    nome.textContent = "Carregando...";
    numero.textContent = "Aguarde...";
    habilidades.textContent = "Consultando API...";
    status.innerHTML = "";
    tipos.innerHTML = "";

    imagem.style.opacity = "0";

    try {

        let dados;
        let mensagemTipo = "";

        try {

            // Primeiro tenta encontrar um Pokémon

            dados = await consultar(
                API_URL + "pokemon/" + encodeURIComponent(pesquisa)
            );

        } catch (erroPokemon) {

            // Se não encontrar, tenta pesquisar um tipo

            let dadosTipo;

            try {

                dadosTipo = await consultar(
                    API_URL + "type/" + encodeURIComponent(pesquisa)
                );

            } catch (erroTipo) {

                throw new Error(
                    "Não encontramos esse Pokémon ou tipo. Tente outro nome!"
                );

            }

            const lista = dadosTipo.pokemon;

            if (!lista || lista.length === 0) {
                throw new Error("Nenhum Pokémon encontrado nesse tipo.");
            }

            // Seleciona um Pokémon desse tipo

            const escolhido =
                lista[Math.floor(Math.random() * lista.length)];

            dados = await consultar(escolhido.pokemon.url);

            mensagemTipo = "Tipo pesquisado: " +
                (traducoesTipos[pesquisa] || pesquisa);
        }

        // NOME E NÚMERO

        nome.textContent =
            dados.name.charAt(0).toUpperCase() +
            dados.name.slice(1);

        if (mensagemTipo) {
            nome.textContent += " 🔥";
        }

        numero.textContent =
            "#" + String(dados.id).padStart(3, "0");

        // IMAGEM

        const imagemURL =
            dados.sprites.other?.["official-artwork"]?.front_default ||
            dados.sprites.front_default;

        if (imagemURL) {

            imagem.src = imagemURL;
            imagem.alt = dados.name;

            imagem.onload = () => {
                imagem.style.opacity = "1";
            };

            imagem.onerror = () => {
                imagem.style.opacity = "0";
            };

        } else {

            imagem.style.opacity = "0";

        }

        // TIPOS

        tipos.innerHTML = "";

        dados.types.forEach(item => {

            const tipo = item.type.name;

            const elemento = document.createElement("span");

            elemento.className = "tipo";

            elemento.textContent =
                traducoesTipos[tipo] || tipo;

            elemento.style.background =
                coresTipos[tipo] || "#ede5ff";

            tipos.appendChild(elemento);

        });

        if (mensagemTipo) {
            const aviso = document.createElement("p");
            aviso.textContent = mensagemTipo;
            aviso.style.width = "100%";
            aviso.style.textAlign = "center";
            aviso.style.color = "#7956c4";
            tipos.appendChild(aviso);
        }

        // INFORMAÇÕES

        altura.textContent =
            (dados.height / 10).toFixed(1) + " m";

        peso.textContent =
            (dados.weight / 10).toFixed(1) + " kg";

        xp.textContent =
            dados.base_experience ?? "N/A";

        // HABILIDADES

        habilidades.innerHTML = "";

        dados.abilities.forEach(item => {

            const elemento = document.createElement("span");

            elemento.className = "habilidade";

            elemento.textContent =
                item.ability.name.replaceAll("-", " ");

            habilidades.appendChild(elemento);

        });

        // ATRIBUTOS

        status.innerHTML = "";

        dados.stats.forEach(item => {

            const chave = item.stat.name;
            const valor = item.base_stat;

            const elemento = document.createElement("div");

            elemento.className = "status-item";

            const classe = classesStatus[chave] || "hp";
            const nomeAtributo = nomesStatus[chave] || chave;

            const porcentagem = Math.min(
                (valor / 150) * 100,
                100
            );

            elemento.innerHTML = `
                <div class="status-info">
                    <span>${nomeAtributo}</span>
                    <strong>${valor}</strong>
                </div>

                <div class="barra">
                    <div
                        class="preenchimento ${classe}"
                        style="width: ${porcentagem}%"
                    ></div>
                </div>
            `;

            status.appendChild(elemento);

        });

    } catch (erro) {

        console.error("Erro na API:", erro);

        nome.textContent = "Ops! Não conseguimos carregar.";

        numero.textContent = "#???";

        habilidades.innerHTML = `
            <div class="erro">${erro.name === "AbortError"
                ? "⏳ A API demorou muito para responder. Tente novamente."
                : "😢 " + erro.message}
            </div>
        `;

        tipos.innerHTML = "";

        status.innerHTML = "";

        altura.textContent = "--";
        peso.textContent = "--";
        xp.textContent = "--";

        imagem.style.opacity = "0";

    } finally {

        buscarBtn.disabled = false;

    }

}


// BOTÃO BUSCAR

buscarBtn.addEventListener("click", () => {
    buscarPokemon(input.value);
});


// ENTER PARA PESQUISAR

input.addEventListener("keydown", evento => {

    if (evento.key === "Enter") {
        buscarPokemon(input.value);
    }

});


// POKÉMON ALEATÓRIO

aleatorioBtn.addEventListener("click", () => {

    const aleatorio = Math.floor(Math.random() * 1025) + 1;

    input.value = aleatorio;

    buscarPokemon(aleatorio);

});


// INICIAR COM PIKACHU

buscarPokemon("pikachu");
