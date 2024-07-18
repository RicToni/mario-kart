const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

// rolando o dado 
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

// obtendo bloco aleatório
async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, atribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);
        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de skill 
        let testSkill1 = 0;
        let testSkill2 = 0;

        if (block === "RETA") {
            testSkill1 = diceResult1 + character1.VELOCIDADE;
            testSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velociade", diceResult1, character1.VELOCIDADE),
                await logRollResult(character2.NOME, "velociade", diceResult2, character2.VELOCIDADE)
        }
        if (block === "CURVA") {
            testSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            testSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "curva", diceResult1, character1.MANOBRABILIDADE),
                await logRollResult(character2.NOME, "curva", diceResult2, character2.MANOBRABILIDADE)
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou ${character2.NOME} 🥊`)
            // testSkill1 = diceResult1 + character1.PODER;
            // testSkill2 = diceResult2 + character2.PODER;

            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER),
                await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto! 🐢`)
                character2.PONTOS--;
            }
            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto! 🐢`)
                character1.PONTOS--;
            }
            if (powerResult2 === powerResult1) {
                console.log(`Confronto empatado! Nenhum ponto foi perdido. `)
            }
        }
        if (testSkill1 > testSkill2) {
            console.log(`${character1.NOME} marcou um ponto. ☑️`)
            character1.PONTOS++
        } else if (testSkill2 > testSkill1) {
            console.log(`${character2.NOME} marcou um ponto. ☑️`)
            character2.PONTOS++
        }
    }
    console.log(`-----------------------------------------------`)
}

async function declareWinner(character1, character2){
    console.log(`Resultado final!`)
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)
    console.log(`-----------------------------------------------`)

    if (character1.PONTOS > character2.PONTOS){
        console.log(`${character1.NOME} venceu! 🏆`)
    } else if (character2.PONTOS > character1.PONTOS){
        console.log(`${character2.NOME} venceu! 🏆`)
    } else {
        console.log(`A corrida terminou em empate! ❌`)
    }

}

async function main() {
    console.log(`🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando.....\n `);

    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
};

main()


