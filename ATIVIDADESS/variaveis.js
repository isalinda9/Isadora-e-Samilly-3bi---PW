const botao = document.getElementById("btnComprar");

botao.addEventListener("click", function () {

    // STRING
    const evento = document.getElementById("evento").value;

    // NUMBER
    const quantidade = Number(
        document.getElementById("ingressos").value
    );


    // Verificação

    if (evento === "") {

        console.log("Digite o nome do evento.");

        return;
    }


    if (quantidade <= 0) {

        console.log(
            "Digite uma quantidade válida de ingressos."
        );

        return;
    }


    // Valor fictício do ingresso

    const precoIngresso = 120;


    // Fazendo algo com os dados

    const valorTotal =
        quantidade * precoIngresso;


    const taxa =
        valorTotal * 0.10;


    const valorFinal =
        valorTotal + taxa;


    // Console

    console.clear();

    console.log(
        "🎤 ===== SHOWPASS ===== 🎤"
    );

    console.log("");

    console.log(
        "🎵 Evento:",
        evento
    );

    console.log(
        "🎟️ Quantidade de ingressos:",
        quantidade
    );

    console.log(
        "💰 Preço por ingresso:",
        "R$ " + precoIngresso.toFixed(2)
    );

    console.log(
        "💵 Valor dos ingressos:",
        "R$ " + valorTotal.toFixed(2)
    );

    console.log(
        "🧾 Taxa:",
        "R$ " + taxa.toFixed(2)
    );

    console.log(
        "💳 Valor final:",
        "R$ " + valorFinal.toFixed(2)
    );

    console.log("");

    console.log(
        "🎉 Aproveite o show!"
    );


    // Alterando o botão

    botao.innerHTML =
        "✓ Pedido calculado!";

});
