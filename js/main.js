// js/main.js

// 1. Definição da Configuração do Jogo
// Aqui, dizemos ao Phaser como queremos que nosso jogo se comporte e se pareça.
const config = {
    type: Phaser.AUTO, // Phaser escolhe automaticamente o melhor renderizador (WebGL ou Canvas)
    width: 800,        // Largura da tela do jogo em pixels
    height: 600,       // Altura da tela do jogo em pixels
    parent: 'jogo-container', // ID da div no index.html onde o jogo será inserido

    // Configurações importantes para um jogo Pixel Art
    pixelArt: true, // Garante que os pixels fiquem nítidos, sem borrões
    
    // Configuração da física do jogo
    physics: {
        default: 'arcade', // Escolhemos o sistema de física "Arcade"
                           // É mais simples e ótimo para jogos de plataforma 2D
        arcade: {
            gravity: { y: 700 }, // Define a força da gravidade no eixo Y (para baixo)
                                 // Quanto maior o valor, mais forte a gravidade
            debug: false         // Coloque como 'true' se quiser ver as caixas de colisão
                                 // e vetores de velocidade. Útil para testar!
        }
    },

    // 2. Lista de Cenas do Jogo
    // O Phaser organiza o jogo em Cenas. Cada cena pode ser uma tela diferente
    // (menu, fase, game over, etc.).
    // A ordem aqui não define a ordem de execução, mas sim quais cenas estão disponíveis.
    scene: [
        PreloadCena, // Nossa cena para carregar os assets (imagens, sons)
        JogoCena,    // A cena principal onde o jogo acontece
        FimCena      // A cena que mostrará a mensagem final
    ]
};

// 3. Criação da Instância do Jogo
// Com as configurações definidas, criamos uma nova instância do jogo Phaser.
const game = new Phaser.Game(config);