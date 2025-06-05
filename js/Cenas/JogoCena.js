// js/Cenas/JogoCena.js

class JogoCena extends Phaser.Scene {
    constructor() {
        super({ key: 'JogoCena' });

        // Variáveis da cena para guardar referências importantes
        this.jogador = null;
        this.objetivoFinal = null;
        this.plataformas = null;
        this.coracoes = null;
        this.cursores = null;
        // Futuramente, podemos adicionar uma pontuação ou contador de corações aqui
        // this.pontuacao = 0;
        // this.textoPontuacao = null;
    }

    preload() {
        // Geralmente, os assets são carregados na PreloadCena.
        // Mas se esta cena tivesse assets específicos, eles seriam carregados aqui.
        console.log('JogoCena: preload (geralmente vazio se tudo está na PreloadCena)');
    }

    create() {
        console.log('JogoCena: create');

        // 1. CRIAR O MUNDO E BACKGROUND
        // Define os limites do mundo do jogo (maior que a tela para permitir rolagem)
        this.physics.world.setBounds(0, 0, 1600, 600); // Largura de 1600px, altura de 600px

        // Adiciona a imagem de fundo.
        // A imagem 'fundo' foi carregada na PreloadCena.
        // setOrigin(0,0) para alinhar no canto superior esquerdo.
        // setScrollFactor(0) faria o fundo ficar parado se a câmera se movesse muito,
        // mas para um fundo que acompanha a fase, usamos 1 (ou omitimos para parallax depois)
        this.add.image(0, 0, 'fundo').setOrigin(0, 0).setScrollFactor(1);
        // Se o fundo for menor que o mundo, você pode precisar repeti-lo ou esticá-lo.
        // Exemplo para um fundo que acompanha a câmera, mas metade da velocidade (parallax):
        // this.add.image(400, 300, 'fundo').setScrollFactor(0.5);


        // 2. CRIAR AS PLATAFORMAS
        // Criamos um grupo de plataformas estáticas (não se movem, não são afetadas pela gravidade)
        this.plataformas = this.physics.add.staticGroup();

        // Cria o chão. Usamos scaleX para esticar uma única imagem de plataforma.
        // A imagem 'plataforma' (96x32) será esticada para cobrir o chão.
        // (96 * 17 = 1632), um pouco maior que o mundo para garantir.
        // refreshBody() é importante após escalar um corpo físico estático.
        this.plataformas.create(0, 584, 'plataforma').setOrigin(0,0).setScale(17, 1).refreshBody();

        // Adiciona algumas plataformas no cenário:
        // Lembre-se que as coordenadas (x,y) são o centro da imagem por padrão.
        this.plataformas.create(600, 450, 'plataforma');
        this.plataformas.create(50, 350, 'plataforma');
        this.plataformas.create(750, 320, 'plataforma');
        this.plataformas.create(1000, 400, 'plataforma');
        this.plataformas.create(1250, 280, 'plataforma');


        // 3. CRIAR O JOGADOR (SUA NAMORADA)
        // Adiciona o sprite do jogador na posição inicial (x=100, y=450)
        this.jogador = this.physics.add.sprite(100, 450, 'personagem');
        this.jogador.setBounce(0.2); // Um leve "salto" ao colidir
        this.jogador.setCollideWorldBounds(true); // Não deixa o jogador sair dos limites do mundo

        // Configura a câmera para seguir o jogador
        this.cameras.main.setBounds(0, 0, 1600, 600); // Limites da câmera
        this.cameras.main.startFollow(this.jogador, true, 0.08, 0.08); // Segue o jogador


        // 4. CRIAR ANIMAÇÕES DO JOGADOR
        // Baseado no spritesheet 'personagem' (32x48px)
        // Assumindo que o spritesheet tem:
        // frame 0: olhando para a esquerda (ou um frame base que será invertido)
        // frame 1: parado/olhando para frente
        // frame 2: olhando para a direita (ou o mesmo frame base)
        // Se seu 'personagem.png' é uma única imagem 32x48, todas as animações usarão o frame 0.
        // O flipX (inversão horizontal) cuidará da direção.

        // Animação para 'esquerda'
        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 0 }), // Usar frame 0
            frameRate: 10,
            repeat: -1 // Repetir a animação
        });

        // Animação para 'parado'
        this.anims.create({
            key: 'parado',
            frames: [{ key: 'personagem', frame: 1 }], // Usar frame 1 (ou 0 se só tiver um)
            frameRate: 20
        });

        // Animação para 'direita'
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 0 }), // Usar frame 0
            // Se tivesse um frame específico para direita, seria ex: start: 2, end: 2
            frameRate: 10,
            repeat: -1
        });


        // 5. CRIAR OS CORAÇÕES (COLETÁVEIS)
        this.coracoes = this.physics.add.group({
            allowGravity: false, // Corações não são afetados pela gravidade
            immovable: true      // Corações não se movem ao serem tocados
        });

        // Adiciona alguns corações em posições específicas
        this.coracoes.create(50, 300, 'coracao');
        this.coracoes.create(600, 400, 'coracao');
        this.coracoes.create(750, 270, 'coracao');
        this.coracoes.create(1000, 350, 'coracao');
        this.coracoes.create(1250, 230, 'coracao');

        // Animação simples para os corações (opcional, ex: pulsar)
        this.coracoes.children.iterate(function (coracao) {
            // Exemplo: fazer o coração subir e descer um pouco
            // this.tweens.add({
            // targets: coracao,
            // y: coracao.y - 5,
            // duration: 500,
            // ease: 'Sine.easeInOut',
            // yoyo: true,
            // repeat: -1
            // });
        }, this);


        // 6. CRIAR O OBJETIVO FINAL (VOCÊ)
        // Adiciona o sprite do objetivo no final do nível
        this.objetivoFinal = this.physics.add.sprite(1500, 530, 'objetivo'); // Ajuste Y para ficar sobre a plataforma
        this.objetivoFinal.setImmovable(true); // Não se move
        this.objetivoFinal.body.allowGravity = false; // Não é afetado pela gravidade


        // 7. CONFIGURAR COLISÕES
        // Colisão entre o jogador e as plataformas
        this.physics.add.collider(this.jogador, this.plataformas);

        // Colisão entre o objetivo e as plataformas (para que ele "sente" sobre uma, se necessário)
        this.physics.add.collider(this.objetivoFinal, this.plataformas);

        // Verifica se o jogador sobrepõe algum coração. Se sim, chama a função 'coletarCoracao'
        this.physics.add.overlap(this.jogador, this.coracoes, this.coletarCoracao, null, this);

        // Verifica se o jogador sobrepõe o objetivo final. Se sim, chama 'alcancarObjetivo'
        this.physics.add.overlap(this.jogador, this.objetivoFinal, this.alcancarObjetivo, null, this);


        // 8. CONFIGURAR CONTROLES (TECLADO)
        // Cria um objeto para acessar as teclas direcionais e de espaço
        this.cursores = this.input.keyboard.createCursorKeys();


        // 9. PONTUAÇÃO (OPCIONAL POR AGORA, MAS ESTRUTURA ESTÁ AQUI)
        // this.textoPontuacao = this.add.text(16, 16, 'Corações: 0', {
        // fontSize: '24px',
        // fill: '#fff',
        // fontFamily: 'Arial'
        // });
        // this.textoPontuacao.setScrollFactor(0); // Para a pontuação ficar fixa na tela
    }

    update() {
        // A função update é chamada a cada frame do jogo

        // Lógica de movimento do jogador
        if (this.cursores.left.isDown) {
            this.jogador.setVelocityX(-200); // Move para a esquerda
            this.jogador.anims.play('esquerda', true);
            this.jogador.flipX = true; // Inverte o sprite para olhar para a esquerda
                                      // (se a animação 'esquerda' já não for um frame virado)
        } else if (this.cursores.right.isDown) {
            this.jogador.setVelocityX(200); // Move para a direita
            this.jogador.anims.play('direita', true);
            this.jogador.flipX = false; // Sprite normal, olhando para a direita
        } else {
            this.jogador.setVelocityX(0); // Fica parado se nenhuma tecla de direção horizontal for pressionada
            this.jogador.anims.play('parado');
        }

        // Lógica do pulo
        // O jogador só pode pular se estiver tocando o chão (ou uma plataforma)
        if (this.cursores.up.isDown && this.jogador.body.touching.down) {
            this.jogador.setVelocityY(-450); // Aplica uma velocidade para cima (pulo)
            // Poderíamos adicionar um som de pulo aqui: this.sound.play('pulo');
        }
    }

    // Função chamada quando o jogador coleta um coração
    coletarCoracao(jogador, coracao) {
        coracao.disableBody(true, true); // Desabilita o corpo físico do coração e o torna invisível

        // this.pontuacao += 1;
        // this.textoPontuacao.setText('Corações: ' + this.pontuacao);

        // Poderíamos adicionar um som de coleta aqui: this.sound.play('coleta_coracao');

        // Verificar se todos os corações foram coletados (opcional)
        // if (this.coracoes.countActive(true) === 0) {
        //    console.log('Todos os corações foram coletados!');
        //    // Talvez habilitar o objetivo final apenas após coletar todos?
        // }
    }

    // Função chamada quando o jogador alcança o objetivo
    alcancarObjetivo(jogador, objetivo) {
        console.log('JogoCena: Objetivo alcançado!');
        this.physics.pause(); // Pausa a física do jogo
        // jogador.setTint(0xff0000); // Pinta o jogador de vermelho (só para teste)
        // jogador.anims.play('parado');

        // Inicia a cena final, passando dados se necessário (ex: pontuação)
        this.scene.start('FimCena' /*, { pontuacao: this.pontuacao } */);
    }
}