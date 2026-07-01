/* SIMULADOR DA LIGA PORTUGUESA v1.5
- podes simular jogos
- podes ver a evolução dos clubes
- podes mudar o código
Coisas para fazer:
- aquela coisa de salvar o jogo (fazendo)
- fazer uma versão de "football manager" (não feito)
- fazer um "port" para c++ e rust (fazendo)
- fazer uma sistema de jogos mais complexo (vou fazer em 2030 kkkk)
*/


const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/* Ainda não é disponivel para 1.0
try {
    ficho = JSON.parse(fs.readFileSync("simulacao.json"))
    
    tmz = new Date(ficho.toje)
    console.log(tmz)
} catch (error) {
    
}
*/
// POW inicial das equipas
let att = { SLBenficaPOW: 85, SportingCPPOW: 81, FCPortoPOW: 82, BragaPOW: 77, GilVicentePOW: 75, FamalicaoPOW: 68, MoreirensePOW: 64, EstorilPOW: 65, VitoriaSCPOW: 70, AlvercaPOW: 63, AroucaPOW: 60, EstrelaAmadoraPOW: 66, CasaPiaPOW: 63, NacionalPOW: 59, SantaClaraPOW: 67, RioAvePOW: 64, TondelaPOW: 59, AVSPOW: 54 };
let def = { SLBenficaPOW: 87, SportingCPPOW: 77, FCPortoPOW: 79, BragaPOW: 72, GilVicentePOW: 70, FamalicaoPOW: 70, MoreirensePOW: 65, EstorilPOW: 62, VitoriaSCPOW: 64, AlvercaPOW: 65, AroucaPOW: 69, EstrelaAmadoraPOW: 59, CasaPiaPOW: 49, NacionalPOW: 60, SantaClaraPOW: 59, RioAvePOW: 57, TondelaPOW: 56, AVSPOW: 46 };

let pontos = { };
let saldogols = { };

let liga2att = { AcademicoViseuPOW: 65, MaritimoPOW: 62, VizelaPOW: 60, TorreensePOW: 64, VitoriaFCPOW: 59, UniaoLeiriaPOW: 63, MafraPOW: 51, LourosaPOW: 58, ChavesPOW: 50, FeirensePOW: 54, AcademicaPOW: 51, LeixoesPOW: 53, FelgueirasPOW: 49, PacosFerreiraPOW: 47, PenafielPOW: 49, FarensePOW: 49, OliveirensePOW: 47, PortimonensePOW: 47, BelenensesPOW: 44 };
let liga2def = { AcademicoViseuPOW: 62, MaritimoPOW: 59, VizelaPOW: 59, TorreensePOW: 56, VitoriaFCPOW: 55, UniaoLeiriaPOW: 60, MafraPOW: 54, LourosaPOW: 55, ChavesPOW: 59, FeirensePOW: 56, AcademicaPOW: 49, LeixoesPOW: 49, FelgueirasPOW: 45, PacosFerreiraPOW: 47, PenafielPOW: 51, FarensePOW: 47, OliveirensePOW: 43, PortimonensePOW: 41, BelenensesPOW: 40 };

let liga2Pontos = {};
let liga2saldogols = {};
let cupwin = "";
let textthing = "";

// Inicializar tabelas da Liga 2
Object.keys(liga2att).forEach(k => {
    let nome = k.replace("POW", "");
    liga2Pontos[nome] = 0;
    liga2saldogols[nome] = 0;
});
// Inicializar tabelas da Liga 1
Object.keys(att).forEach(k => {
    let nome = k.replace("POW", "");
    pontos[nome] = 0;
    saldogols[nome] = 0;
});

let liga1 = Object.keys(pontos);
let liga2 = Object.keys(liga2Pontos);
let ano = 2025;

function taca() {
    console.log(`\n--- TAÇA DE PORTUGAL ${ano}/${ano + 1} ---\n`)
    let participantes = [...liga1, ...liga2];
    
    fase = 1
    if (participantes.length > 32) {
        console.log(`\n--- PRÉ-ELIMINATÓRIAS DA TAÇA ---\n`)
        let partsis = participantes.length - 32
        for (let i = 0; i < partsis; i++) {
            
            let p1 = participantes.pop(); 
            let p2 = participantes.pop();
            
            
            let gol1 = Math.floor(Math.random() * 4) + (liga2att[p1 + "POW"] > liga2att[p2 + "POW"] ? 1 : 0); // já que só equipas da segunda liga podem participar nos playoffs, metemos o POW da segunda liga
            let gol2 = Math.floor(Math.random() * 4) + (liga2att[p2 + "POW"] > liga2att[p1 + "POW"] ? 1 : 0); // e sim, não há vantagem da casa
            
            if ( gol1 == gol2 ) { Math.random() > 0.5 ? gol1++ : gol2++; }
            if (gol1 > gol2) {participantes.unshift(p2); console.log(`${p1} ${gol1} - ${gol2} ${p2}`);}
            else if (gol2 > gol1) { participantes.unshift(p1); console.log(`${p1} ${gol1} - ${gol2} ${p2}`);}
            
            
        
    }
        
    while (participantes.length > 1) {
        
        let faseUAU = []; // Typescript FC 98-0 Tottenham Hotspur in 98 years
        let fases = {32: "1ª Eliminatória", 16: "Oitavas de Final", 8: "Quartas de Final", 4: "Semi-finais", 2: "Final"} // O GRANDE VENCEDOOOOOOOR
        let fasesfasosfaçoslaços = fases[participantes.length] || `${fase}ª Eliminatória`;
        console.log(`\n--- ${fasesfasosfaçoslaços} (${participantes.length} equipas) ---`);
        participantes.sort(() => Math.random() - 0.5);
        while (participantes.length >= 2) {
            let p1 = participantes.pop(); 
            let p2 = participantes.pop();
            let att1 = att[p1 + "POW"] || liga2att[p1 + "POW"] || 6;
            let att2 = att[p2 + "POW"] || liga2att[p2 + "POW"] || 6;
            let adv1 = 0
            let adv2 = 0
            if (att1 > att2) {
                adv1 = 3
            } else if (att2 > att1) {
                adv2 = 2
            }
            let gol1 = Math.floor(Math.random() * 4) + adv1; // temos o cirstaione ronaldeopsa 910290838190
            let gol2 = Math.floor(Math.random() * 4) + adv2; // taçenfica
            
            if ( gol1 == gol2 ) { 
                Math.random() > 0.5 ? gol1++ : gol2++; 
            }
            if (gol1 > gol2) {
                faseUAU.push(p1);
                console.log(`${p1} ${gol1} - ${gol2} ${p2}`);
            }
            else if (gol2 > gol1) {
                faseUAU.push(p2);
                console.log(`${p1} ${gol1} - ${gol2} ${p2}`);
            }
        }
        participantes = faseUAU; // Tudo pode acontecer, milagres, sustos, TUDO. PQ É A TAAAAAAAAAAAÇÇÇÇÇÇÇAAAAAAAAAAAAAAAAAAAAAAAAAAAAA DE PORTUGALLLLLLLLLLLLLLL
        fase++;
        
        }
        
    }
    let cupwinner = participantes[0];
    return cupwinner
}

function tabela() {
    let txt = `\n--- LIGA PORTUGAL ${ano}/${ano + 1} ---\n`;
    const ordenado = Object.entries(pontos).sort((a, b) => b[1] - a[1] || saldogols[b[0]] - saldogols[a[0]]);
    ordenado.forEach((equipa, i) => {
        let status = "";
        if (i == 0) status = "[CAMPEÃO/UCL]"; // Marca o campeão
        if (i == 1) status = "[Qualificação UCL]"; // Marca contra Real Madrid
        if (i == 2) status = "[UEL]"; // Marca contra Real Madrid
        if (i == 3) status = "[Qualificação UEL]"; // Marca contra Real Madrid
        if (i == 4) status = "[Qualificação UECL]"; // Marca contra Real Madrid
        if (cupwin == equipa[0] && i >= 2) status = "[UEL]";
        if (i >= ordenado.length - 2) status = "[REBAIXADO]"; // Marca os 2 búúúúúúúúú
        txt += `${(i + 1).toString().padStart(2, ' ')}. ${equipa[0].padEnd(15)} | Pts: ${equipa[1].toString().padStart(2, ' ')} | SG: ${saldogols[equipa[0]].toString().padStart(3, ' ')} ${status}\n`;
    });
    return { txt, ordenado };
}

function tabela2() {
    let txt2 = `\n--- LIGA PORTUGAL 2 ${ano}/${ano + 1} ---\n`;
    const ordenado2 = Object.entries(liga2Pontos).sort((a, b) => b[1] - a[1] || liga2saldogols[b[0]] - liga2saldogols[a[0]]);
    ordenado2.forEach((equipa, i) => {
        let status = "";
        if (i < 2) status = "[SUBIU]";
        if (cupwin == equipa[0]) status = "[UEL]";
        txt2 += `${(i + 1).toString().padStart(2, ' ')}. ${equipa[0].padEnd(15)} | Pts: ${equipa[1].toString().padStart(2, ' ')} | SG: ${liga2saldogols[equipa[0]].toString().padStart(3, ' ')} ${status}\n`;
    });
    return { txt2, ordenado2 };
}

function rodarJornada(lista, ptsObj, sgObj, ataquePOW, defesaPOW) {
    let jajogou = {};
    lista.forEach(e => jajogou[e] = false);
    let baralhado = [...lista].sort(() => Math.random() - 0.5);

    while (baralhado.length >= 2) {
        let p1 = baralhado.pop();
        let p2 = baralhado.pop();

        let gol1 = Math.floor(Math.random() * 4) + (ataquePOW[p1 + "POW"] > ataquePOW[p2 + "POW"] ? 2 : 0) - (defesaPOW[p2 + "POW"] > defesaPOW[p1 + "POW"] ? 1 : 0); // VANTAGANAAAAA
        let gol2 = Math.floor(Math.random() * 4) + (ataquePOW[p2 + "POW"] > ataquePOW[p1 + "POW"] ? 1 : 0);

        sgObj[p1] += (gol1 - gol2);
        sgObj[p2] += (gol2 - gol1);

        if (gol1 > gol2) ptsObj[p1] += 3;
        else if (gol2 > gol1) ptsObj[p2] += 3;
        else { ptsObj[p1] += 1; ptsObj[p2] += 1; }
    }
}

function gerirSubidasEDescidas(ord1, ord2) {
    console.log(`\n--- TRANSIÇÃO DE TEMPORADA ---`);
    
    // 1. Identificar quem sabe 🌚🌚🌚🌚
    const rebaixados = [ord1[ord1.length - 1], ord1[ord1.length - 2]];
    const promovidos = [ord2[0], ord2[1]];

    // 2. Processar Rebaixados (Liga 1111111 -> Liga 2)
    rebaixados.forEach(equipa => {
        let nome = equipa[0]; // Extra o nome da equipa
        let novoatt = Math.max(4, (att[nome + "POW"] || 6) - 1);
        let novodef = Math.max(4, (def[nome + "POW"] || 6) - 1);
        delete pontos[nome]; delete saldogols[nome]; delete att[nome + "POW"]; delete def[nome + "POW"]; 
        
        
        liga2Pontos[nome] = 0; liga2saldogols[nome] = 0; liga2att[nome + "POW"] = novoatt; liga2def[nome + "POW"] = novodef;
        console.log(`${nome} rebaixou.`);
    });

    // 3. Processar Promovidos (Liga 53 -> Liga 98)
    promovidos.forEach(equipa => {
        let nome = equipa[0]; // Extra o nome da equipa222223123123
        let novoatt = Math.max(4, (liga2att[nome + "POW"] || 6) + 10);
        let novodef = Math.max(4, (liga2def[nome + "POW"] || 6) + 10);
        delete liga2Pontos[nome]; delete liga2saldogols[nome]; delete liga2att[nome + "POW"]; delete liga2def[nome + "POW"]; 
        
        pontos[nome] = 0; saldogols[nome] = 0; att[nome + "POW"] = novoatt; def[nome + "POW"] = novodef;
        console.log(`${nome} promoveu!`);
    });

    // Atualizar as listinhas
    liga1 = Object.keys(pontos);
    liga2 = Object.keys(liga2Pontos);
}
function mercado() {
    liga1.forEach(e => {
                pontos[e] = 0;
                saldogols[e] = 0;
                if (Math.random() > 0.7) {
                    let alteracaoatt = 0;
                    let alteracaodef = 0;
                    let rondonia = Math.random() * 5
                    if (rondonia > 4.9) { alteracaoatt = 5; }
                    else if (rondonia > 4.7) { alteracaoatt = 4; }
                    else if (rondonia > 4.5) { alteracaoatt = 3; }
                    else if (rondonia > 3.5) { alteracaoatt = 2; }
                    else { alteracaoatt = -25; }
                    rondonia = Math.random() * 5
                    if (rondonia > 4.5) { alteracaodef = 5; }
                    else if (rondonia > 3.5) { alteracaodef = 4; }
                    else if (rondonia > 2.5) { alteracaodef = 3; }
                    else if (rondonia * 5 > 1.5) { alteracaodef = 2; }
                    else { alteracaodef = -10; }
                    att[e + "POW"] = Math.max(1, att[e + "POW"] + alteracaoatt);
                    def[e + "POW"] = Math.max(1, def[e + "POW"] + alteracaodef);
                    console.log(`Mercado: ${e} ${alteracaoatt + alteracaodef > 0 ? 'reforçou-se' : 'enfraqueceu-se'} (Novo ataque: ${att[e + "POW"]} defesa: ${def[e + "POW"]})`);
                }
            });
}
function mercado2() {
    liga2.forEach(e => {
                liga2Pontos[e] = 0;
                liga2saldogols[e] = 0;
                if (Math.random() > 0.7) {
                    let alteracaoatt = 0;
                    let alteracaodef = 0;
                    let rondonia2 = Math.random() * 5
                    if (rondonia2 > 4.9) { alteracaoatt = 5; }
                    else if (rondonia2 > 4.7) { alteracaoatt = 4; }
                    else if (rondonia2 > 4.5) { alteracaoatt = 3; }
                    else if (rondonia2 * 5 > 3.5) { alteracaoatt = 2; }
                    else { alteracaoatt = -20; }
                    rondonia2 = Math.random() * 5
                    if (rondonia2 > 4.5) { alteracaodef = 5; }
                    else if (rondonia2 > 3.5) { alteracaodef = 4; }
                    else if (rondonia2 > 2.5) { alteracaodef = 3; }
                    else if (rondonia2 > 1.5) { alteracaodef = 2; }
                    else { alteracaodef = -15; }
                    liga2att[e + "POW"] = Math.max(1, liga2att[e + "POW"] + alteracaoatt);
                    liga2def[e + "POW"] = Math.max(1, liga2def[e + "POW"] + alteracaodef);
                    console.log(`Mercado: ${e} ${alteracaoatt + alteracaodef > 0 ? 'reforçou-se' : 'enfraqueceu-se'} (Novo ataque: ${liga2att[e + "POW"]} defesa: ${liga2def[e + "POW"]})`);
                }
            });
}
function impossivel() {
    let champion = Object.entries(pontos).sort((a, b) => b[1] - a[1] || saldogols[b[0]] - saldogols[a[0]]);
    let champ = champion[0][0]
    if (att[champ + "POW"] > 150) {
        console.log("IMPOSSÍVEL! O " + champion[0][0].toUpperCase() + " GANHOU A LIGA DOS CAMPEÕES!")
    }
}
function guardalistadoschamps() {
    let champ1 = Object.entries(pontos).sort((a, b) => b[1] - a[1] || saldogols[b[0]] - saldogols[a[0]])[0];
    let champ2 = Object.entries(liga2Pontos).sort((a, b) => b[1] - a[1] || liga2saldogols[b[0]] - liga2saldogols[a[0]])[0];
    
    textthing += `${ano}/${ano + 1}:\nLIGA PORTUGAL: ${champ1[0]} foi campeão da primeira liga com ${champ1[1]} pontos.\nLIGA PORTUGAL 2: ${champ2[0]} foi campeão da segunda liga com ${champ2[1]} pontos.\nTAÇA DE PORTUGAL: ${cupwin} foi campeão da taça.\n`;
    textthing += `------------------------------------\n`;

}
function listadoschamps() {
    console.log(`\n--- LISTA DOS CAMPEÕES ---\n` + textthing);


}
function iniciarTemporada() {
    // Reset de pontos no início do ano
    liga1.forEach(e => { pontos[e] = 0; saldogols[e] = 0; });
    liga2.forEach(e => { liga2Pontos[e] = 0; liga2saldogols[e] = 0; });

    for (let i = 0; i < 34; i++) {
        rodarJornada(liga1, pontos, saldogols, att, def);
        rodarJornada(liga2, liga2Pontos, liga2saldogols, liga2att, liga2def);
    }
    cupwin = taca();
    const { txt, ordenado } = tabela();
    const { txt2, ordenado2 } = tabela2();
    console.log(txt);
    console.log(txt2);
    console.log(cupwin + " ganhou a taça!")
    let champ1 = Object.entries(pontos).sort((a, b) => b[1] - a[1] || saldogols[b[0]] - saldogols[a[0]])[0];
    let champ2 = Object.entries(liga2Pontos).sort((a, b) => b[1] - a[1] || saldogols[b[0]] - saldogols[a[0]])[0];
    impossivel()
    guardalistadoschamps()

    rl.question('\n[1] Próxima Época | [2] Ver a lista dos campeões | [3] Sair: ', (opcao) => {
        /*if (opcao === '4') {
            let toje = Date.now()
            fs.writeFileSync('simulacao.json', JSON.stringify({ toje, pontos, POW, liga2Pontos, liga2POW }, null, 2));
            console.log('Jogo salvo!');
            iniciarTemporada();
        }
        if (opcao === '5') {
            let toje = Date.now()
            fs.writeFileSync('simulacao.json', JSON.stringify({ toje, pontos, POW, liga2Pontos, liga2POW }, null, 2));
            console.log('Jogo salvo!');
            rl.close()
        }*/
        if (opcao === '1') {
            gerirSubidasEDescidas(ordenado, ordenado2);
            ano++;
            mercado()
            mercado2()
            iniciarTemporada();
            
        } else if (opcao === '2') {
            listadoschamps()
            rl.question('\n[1] Próxima Época | [2] Sair: ', (opcao) => {
            if (opcao === '1') {
                
                gerirSubidasEDescidas(ordenado, ordenado2);
                ano++;
                mercado()
                mercado2()
                iniciarTemporada();
            } else {
                rl.close()
            }
        })
            
        } else {
            rl.close();
        }
    });
}

iniciarTemporada();