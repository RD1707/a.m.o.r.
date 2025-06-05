// js/Cenas/PreloadCena.js

class PreloadCena extends Phaser.Scene {
    constructor() {
        // 'PreloadCena' é a chave/identificador único desta cena
        super({ key: 'PreloadCena' });
    }

    // 1. preload() - O Phaser chama esta função automaticamente
    // É aqui que colocamos todo o código para carregar os assets
    preload() {
        console.log('PreloadCena: preload'); // Útil para debugging

        // Para dar um feedback visual enquanto carrega:
        const larguraJogo = this.sys.game.config.width;
        const alturaJogo = this.sys.game.config.height;

        // Adiciona um texto de "Carregando..."
        const textoCarregando = this.add.text(
            larguraJogo / 2,
            alturaJogo / 2 - 30, // Um pouco acima do centro
            'Carregando o amor...',
            {
                fontFamily: 'Arial', // Uma fonte simples e universal
                fontSize: '30px',
                fill: '#ffffff', // Cor do texto (branco)
                fontStyle: 'bold'
            }
        );
        textoCarregando.setOrigin(0.5, 0.5); // Centraliza o texto no ponto (x,y) definido

        // Barra de progresso (opcional, mas dá um toque legal)
        const barraProgresso = this.add.graphics();
        const caixaProgresso = this.add.graphics();
        caixaProgresso.fillStyle(0x555555, 0.8); // Cor e opacidade da caixa de fundo da barra
        caixaProgresso.fillRect(larguraJogo / 2 - 160, alturaJogo / 2, 320, 30); // Posição e tamanho

        // Evento 'progress' do carregador de assets
        this.load.on('progress', function (valor) {
            // 'valor' é um número entre 0 e 1, representando o progresso
            barraProgresso.clear(); // Limpa a barra anterior
            barraProgresso.fillStyle(0xff爱情, 1); // Cor da barra de progresso (um rosa)
            barraProgresso.fillRect(larguraJogo / 2 - 155, alturaJogo / 2 + 5, 310 * valor, 20);
        });

        // Evento 'complete' do carregador de assets
        this.load.on('complete', function () {
            console.log('PreloadCena: Carregamento completo!');
            barraProgresso.destroy();
            caixaProgresso.destroy();
            textoCarregando.destroy(); // Remove o texto de carregando após completar
        });

        // Caminho base para os assets, para não repetir 'assets/imagens/'
        const basePath = 'assets/imagens/';

        // Carregando as imagens:
        // A chave (primeiro argumento, ex: 'fundo') é como vamos nos referir a essa imagem no código.
        // O segundo argumento é o caminho para o arquivo de imagem.
        this.load.image('fundo', `${basePath}fundo.png`);
        this.load.image('plataforma', `${basePath}plataforma.png`);
        this.load.image('coracao', `${basePath}coracao.png`);
        this.load.image('objetivo', `${basePath}objetivo.png`); // Sua imagem

        // Para a personagem (sua namorada), vamos usar um spritesheet.
        // Um spritesheet é uma imagem única que contém vários "frames" (quadros)
        // da personagem, permitindo animações (parada, andando, pulando).
        // Mesmo que no começo seja só uma imagem dela parada, usar spritesheet já prepara para o futuro.
        this.load.spritesheet('personagem', `${basePath}personagem.png`, {
            frameWidth: 32,  // Largura de cada frame em pixels
            frameHeight: 48  // Altura de cada frame em pixels
        });
        // IMPORTANTE: A imagem 'personagem.png' deve ter dimensões que sejam múltiplos
        // de frameWidth e frameHeight. Por exemplo, se for só uma pose,
        // a imagem pode ter 32x48 pixels. Se tiver 2 poses lado a lado, 64x48 pixels.

        /* --- Exemplo de como carregar áudio (opcional por agora) ---
        const audioBasePath = 'assets/audio/';
        this.load.audio('pulo', `${audioBasePath}pulo.wav`);
        this.load.audio('coleta_coracao', `${audioBasePath}coleta_coracao.wav`);
        */
    }

    // 2. create() - O Phaser chama esta função após o preload() terminar
    // É aqui que geralmente configuramos objetos da cena, mas para a PreloadCena,
    // seu principal objetivo é iniciar a próxima cena.
    create() {
        console.log('PreloadCena: create');

        // Após todos os assets serem carregados, iniciamos a cena principal do jogo.
        // 'JogoCena' é a chave da cena que queremos iniciar (vamos criá-la em breve).
        this.scene.start('JogoCena');
    }

    // update() - O Phaser chama esta função repetidamente (loop do jogo)
    // Geralmente não precisamos de um update na PreloadCena.
    // update(time, delta) {
    // }
}