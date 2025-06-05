// js/Cenas/FimCena.js

class FimCena extends Phaser.Scene {
    constructor() {
        super({ key: 'FimCena' });
    }

    // O método init pode receber dados da cena anterior (JogoCena)
    // Exemplo: se quiséssemos mostrar uma pontuação final
    // init(data) {
    //     console.log('FimCena recebeu dados:', data);
    //     // this.pontosFinais = data.pontuacao;
    // }

    preload() {
        // Se esta cena tivesse um fundo ou fonte muito específica, carregaríamos aqui.
        // Ex: this.load.image('fundo_romantico', 'assets/imagens/fundo_romantico.png');
        // Ex: this.load.bitmapFont('minhaFonteFofa', 'assets/fontes/minhaFonteFofa.png', 'assets/fontes/minhaFonteFofa.xml');
        console.log('FimCena: preload');
    }

    create() {
        console.log('FimCena: create');

        const larguraJogo = this.sys.game.config.width;
        const alturaJogo = this.sys.game.config.height;

        // Opcional: Adicionar uma sobreposição escura para destacar o texto
        // Um retângulo preto semi-transparente cobrindo a tela
        const overlay = this.add.rectangle(0, 0, larguraJogo, alturaJogo, 0x000000, 0.6);
        overlay.setOrigin(0, 0); // Para cobrir a partir do canto superior esquerdo
        overlay.setAlpha(0); // Começa transparente
        this.tweens.add({ // Efeito de fade-in para o overlay
            targets: overlay,
            alpha: 0.6,
            duration: 1000, // 1 segundo para aparecer
            ease: 'Power1'
        });


        // 1. CRIAR A MENSAGEM "EU TE AMO"
        const mensagemAmor = this.add.text(
            larguraJogo / 2,
            alturaJogo / 2,
            'Eu te amo ❤️', // Adicionei um emoji de coração!
            {
                // Tente usar uma fonte que pareça mais manuscrita ou "fofa"
                // Se "Pacifico" não estiver instalada, usará as alternativas.
                fontFamily: '"Pacifico", "Comic Sans MS", cursive, Arial, sans-serif',
                fontSize: '72px', // Tamanho grande para destaque
                fill: '#ff69b4',  // Rosa choque (hotpink) - uma cor bem carinhosa!
                stroke: '#ffffff', // Contorno branco para ajudar na leitura
                strokeThickness: 8, // Espessura do contorno
                align: 'center',   // Centraliza o texto se tiver múltiplas linhas
                // Efeitos de sombra para dar profundidade
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#333333',
                    blur: 4,
                    stroke: true,
                    fill: true
                }
            }
        );
        mensagemAmor.setOrigin(0.5, 0.5); // Centraliza o ponto de origem do texto


        // 2. APLICAR EFEITO VISUAL CARINHOSO (FADE-IN E ZOOM)
        mensagemAmor.setAlpha(0);   // Começa totalmente transparente
        mensagemAmor.setScale(0.1); // Começa bem pequeno

        // Animação (Tween) para fazer o texto aparecer e crescer
        this.tweens.add({
            targets: mensagemAmor,   // O objeto a ser animado
            alpha: 1,                // Anima a transparência para 1 (totalmente visível)
            scale: 1,                // Anima a escala para 1 (tamanho original)
            ease: 'Elastic.easeOut', // Uma função de "easing" que dá um efeito elástico suave no final
                                     // Outras opções: 'Power2', 'Bounce.easeOut', 'Back.easeOut'
            duration: 2500,          // Duração da animação em milissegundos (2.5 segundos)
            delay: 700               // Atraso antes da animação começar (0.7 segundos após o overlay)
        });

        // 3. ADICIONAR OPÇÃO PARA JOGAR NOVAMENTE (OPCIONAL)
        // Um texto sutil que aparece depois
        const textoJogarNovamente = this.add.text(
            larguraJogo / 2,
            alturaJogo / 2 + 120, // Posição abaixo da mensagem principal
            'Clique para reviver nosso momento ❤️',
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                fill: '#ffffff', // Branco
                align: 'center'
            }
        );
        textoJogarNovamente.setOrigin(0.5, 0.5);
        textoJogarNovamente.setAlpha(0); // Começa transparente

        // Animação para o texto "Jogar Novamente" aparecer
        this.tweens.add({
            targets: textoJogarNovamente,
            alpha: 1,
            duration: 1000,
            delay: 3200 // Aparece depois da mensagem principal (2500 + 700 do delay anterior)
        });

        // 4. PERMITIR QUE O JOGADOR CLIQUE PARA REINICIAR
        this.input.once('pointerdown', () => {
            console.log('FimCena: Clicado para reiniciar.');

            // Para um reinício completo, é melhor voltar para a PreloadCena,
            // assim garante que tudo seja recarregado e reinicializado do zero.
            // Se você tiver estados ou variáveis na JogoCena que precisam ser resetados,
            // voltar para PreloadCena ou ter uma função de reset na JogoCena é mais seguro.
            this.scene.start('JogoCena');
            // Alternativamente: this.scene.start('PreloadCena');
        });
    }
}