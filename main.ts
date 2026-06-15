function cairNoBuraco () {
    if (invulneravel == false) {
        invulneravel = true
        info.changeLifeBy(-1)
        music.playMelody("C4 B3 A3", 220)
        if (info.life() <= 0) {
            game.gameOver(false)
        } else {
            renascerJogador()
            jogador.setFlag(SpriteFlag.GhostThroughSprites, true)
            jogador.startEffect(effects.spray, 500)
            pause(700)
            jogador.setFlag(SpriteFlag.GhostThroughSprites, false)
            invulneravel = false
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projetil = sprites.createProjectileFromSprite(imagemProjetil, jogador, 120 * direcao, 0)
    music.playMelody("G5 C6", 300)
})
function passarDeNivel () {
    if (nivel < 3) {
        nivel += 1
        music.playMelody("C5 E5 G5 C6", 180)
        carregarNivel()
    } else {
        game.gameOver(true)
    }
}
function criarBandeira () {
    bandeira = sprites.create(imagemBandeira, SpriteKind.Food)
    bandeira.setPosition(936, 96)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jogador.isHittingTile(CollisionDirection.Bottom)) {
        jogador.vy = -175
        music.playMelody("C5 E5 G5", 220)
    }
})
function renascerJogador () {
    jogador.setImage(imagemJogadorDireita)
    direcao = 1
    jogador.setPosition(24, 80)
    jogador.vx = 0
    jogador.vy = 0
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direcao = -1
    jogador.setImage(imagemJogadorEsquerda)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direcao = 1
    jogador.setImage(imagemJogadorDireita)
})
function criarInimigo (x: number, y: number) {
    inimigo = sprites.create(imagemInimigo, SpriteKind.Enemy)
    inimigo.setPosition(x, y)
    inimigo.vx = velocidadeInimigo * -1
    inimigo.ay = 400
    inimigo.setBounceOnWall(true)
}
function machucarJogador () {
    if (invulneravel == false) {
        invulneravel = true
        info.changeLifeBy(-1)
        music.playMelody("C4 B3 A3", 220)
        if (info.life() <= 0) {
            game.gameOver(false)
        } else {
            jogador.setFlag(SpriteFlag.GhostThroughSprites, true)
            jogador.startEffect(effects.spray, 500)
            pause(700)
            jogador.setFlag(SpriteFlag.GhostThroughSprites, false)
            invulneravel = false
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 200)
    passarDeNivel()
})
function configurarTiles () {
    scene.setTile(2, imagemChao, true)
    scene.setTile(3, imagemPlataforma, true)
    scene.setTile(4, imagemDecoracao, false)
}
function carregarNivel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    if (nivel == 1) {
        velocidadeInimigo = 30
        scene.setTileMap(img`
            ............................................................
            ........444..................4444...............4444........
            ............................................................
            ..............3333............3333..........33333...........
            ............................................................
            ......................33333..........33333..................
            ............................................................
            222222222222...2222222222222....222222222222...2222222222222
            `)
        configurarTiles()
        criarInimigo(328, 104)
        criarInimigo(584, 104)
        criarInimigo(856, 104)
    } else if (nivel == 2) {
        velocidadeInimigo = 45
        scene.setTileMap(img`
            ............................................................
            ....4444................444....................4444.........
            ............................................................
            ..........33333........33333...........33333........3333....
            .................................3333.......................
            .................33333........33333...........3333..........
            ............................................................
            2222222222....222222222.....22222222....222222222....2222222
            `)
        configurarTiles()
        criarInimigo(296, 104)
        criarInimigo(504, 104)
        criarInimigo(712, 104)
        criarInimigo(904, 104)
    } else {
        velocidadeInimigo = 60
        scene.setTileMap(img`
            ............................................................
            ......444.............4444.................444..............
            ............................................................
            .......3333........33333..........33333..........33333......
            .............333...........3333..........3333...............
            ...33333................3333...........................3333.
            ............................................................
            22222222.....22222222.....2222222.....2222222......222222222
            `)
        configurarTiles()
        criarInimigo(88, 104)
        criarInimigo(264, 104)
        criarInimigo(488, 104)
        criarInimigo(680, 104)
        criarInimigo(888, 104)
    }
    criarBandeira()
    renascerJogador()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 100)
    otherSprite.destroy(effects.disintegrate, 200)
    info.changeScoreBy(10)
    music.playMelody("C5 G5 C6", 240)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (invulneravel == false) {
        otherSprite.destroy(effects.fire, 100)
        machucarJogador()
    }
})
let inimigo: Sprite = null
let bandeira: Sprite = null
let projetil: Sprite = null
let invulneravel = false
let jogador: Sprite = null
let imagemDecoracao: Image = null
let imagemPlataforma: Image = null
let imagemChao: Image = null
let imagemBandeira: Image = null
let imagemInimigo: Image = null
let imagemProjetil: Image = null
let imagemJogadorEsquerda: Image = null
let imagemJogadorDireita: Image = null
let velocidadeInimigo = 0
let direcao = 0
let nivel = 0
nivel = 1
direcao = 1
velocidadeInimigo = 30
imagemJogadorDireita = img`
    . . . 2 2 2 2 2 2 . . . . . . . . 
    . . 2 2 2 2 2 2 2 2 2 . . . . . . 
    . . 4 4 4 4 4 f 4 . . . . . . . . 
    . 4 4 4 4 4 4 f 4 4 4 . . . . . . 
    . 4 4 4 4 4 4 4 f 4 4 4 . . . . . 
    . 4 4 4 4 4 4 f f f f . . . . . . 
    . . . 4 4 4 4 4 4 . . . . . . . . 
    . . 2 2 8 2 2 2 . . . . . . . . . 
    . 2 2 2 8 2 2 8 2 2 2 . . . . . . 
    2 2 2 2 8 8 8 8 2 2 2 2 . . . . . 
    4 4 2 8 5 8 8 5 8 2 4 4 . . . . . 
    4 4 4 8 8 8 8 8 8 4 4 4 . . . . . 
    . 4 8 8 8 8 8 8 8 8 4 . . . . . . 
    . . 8 8 8 . . 8 8 8 . . . . . . . 
    . e e e . . . . e e e . . . . . . 
    e e e e . . . . e e e e . . . . . 
    `
imagemJogadorEsquerda = img`
    . . . . . . . 2 2 2 2 2 2 . . . . 
    . . . . . 2 2 2 2 2 2 2 2 2 . . . 
    . . . . . . . 4 f 4 4 4 4 4 . . . 
    . . . . . 4 4 4 f 4 4 4 4 4 . . . 
    . . . . 4 4 4 f 4 4 4 4 4 4 . . . 
    . . . . f f f f 4 4 4 4 4 4 . . . 
    . . . . . . 4 4 4 4 4 4 . . . . . 
    . . . . . . . . 2 2 2 8 2 2 . . . 
    . . . . . 2 2 2 8 2 2 8 2 2 2 . . 
    . . . . 2 2 2 2 8 8 8 8 2 2 2 2 . 
    . . . . 4 4 2 8 5 8 8 5 8 2 4 4 . 
    . . . . 4 4 4 8 8 8 8 8 8 4 4 4 . 
    . . . . . 4 8 8 8 8 8 8 8 8 4 . . 
    . . . . . . 8 8 8 . . 8 8 8 . . . 
    . . . . . . e e e . . . . e e e . 
    . . . . . e e e e . . . . e e e e 
    `
imagemProjetil = img`
    . . 5 5 5 . . . 
    . 5 5 4 4 5 . . 
    5 5 4 4 2 4 5 . 
    5 4 4 2 2 4 5 5 
    5 5 4 4 2 4 5 . 
    . 5 5 4 4 5 . . 
    . . 5 5 5 . . . 
    . . . 5 . . . . 
    `
imagemInimigo = img`
    . . . . c c c c . . . . . . . . 
    . . c c c c c c c c . . . . . . 
    . c c c c c c c c c c . . . . . 
    c c c f c c c c f c c c . . . . 
    c c c c c c c c c c c c . . . . 
    c c f c c c c c c c f c . . . . 
    c c c f f f f f f f c c . . . . 
    . c c c c c c c c c c . . . . . 
    . . c c c c c c c c . . . . . . 
    . . . c c . . c c . . . . . . . 
    . . c c . . . . c c . . . . . . 
    . c c . . . . . . c c . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
imagemBandeira = img`
    . . . . . . f f . . . . . . . . 
    . . . . . . f 7 7 7 7 . . . . . 
    . . . . . . f 7 7 7 7 7 . . . . 
    . . . . . . f 7 7 7 7 . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . . f . . . . . . . . . 
    . . . . . f f f . . . . . . . . 
    . . . . f f f f f . . . . . . . 
    . . . . f f f f f . . . . . . . 
    `
imagemChao = img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    6 7 7 6 7 7 6 7 7 6 7 7 6 7 7 6 
    e e e e e e e e e e e e e e e e 
    e 4 e e 4 e e 4 e e 4 e e 4 e e 
    e e e 4 e e 4 e e 4 e e 4 e e 4 
    4 e e e e 4 e e e e 4 e e e e 4 
    e e 4 e e e e 4 e e e e 4 e e e 
    e 4 e e 4 e e 4 e e 4 e e 4 e e 
    e e e 4 e e 4 e e 4 e e 4 e e 4 
    4 e e e e 4 e e e e 4 e e e e 4 
    e e 4 e e e e 4 e e e e 4 e e e 
    e 4 e e 4 e e 4 e e 4 e e 4 e e 
    e e e 4 e e 4 e e 4 e e 4 e e 4 
    4 e e e e 4 e e e e 4 e e e e 4 
    e e 4 e e e e 4 e e e e 4 e e e 
    e e e e e e e e e e e e e e e e 
    `
imagemPlataforma = img`
    e e e e e e e e e e e e e e e e 
    e 4 4 e e 4 4 e e 4 4 e e 4 4 e 
    e e e e e e e e e e e e e e e e 
    4 e e 4 4 e e 4 4 e e 4 4 e e 4 
    e e e e e e e e e e e e e e e e 
    e 4 4 e e 4 4 e e 4 4 e e 4 4 e 
    e e e e e e e e e e e e e e e e 
    4 e e 4 4 e e 4 4 e e 4 4 e e 4 
    e e e e e e e e e e e e e e e e 
    e 4 4 e e 4 4 e e 4 4 e e 4 4 e 
    e e e e e e e e e e e e e e e e 
    4 e e 4 4 e e 4 4 e e 4 4 e e 4 
    e e e e e e e e e e e e e e e e 
    e 4 4 e e 4 4 e e 4 4 e e 4 4 e 
    e e e e e e e e e e e e e e e e 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    `
imagemDecoracao = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 1 1 1 . . . . . . . . . 
    . . 1 1 1 1 1 1 1 . . . . . . . 
    . 1 1 1 1 1 1 1 1 1 . . . . . . 
    1 1 1 1 1 1 1 1 1 1 1 . . . . . 
    . 1 1 1 1 1 1 1 1 1 . . . . . . 
    . . 1 1 1 1 1 1 1 . . . . . . . 
    . . . . 1 1 1 . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
jogador = sprites.create(imagemJogadorDireita, SpriteKind.Player)
scene.setBackgroundColor(9)
info.setLife(3)
info.setScore(0)
controller.moveSprite(jogador, 110, 0)
jogador.ay = 400
scene.cameraFollowSprite(jogador)
carregarNivel()
game.onUpdate(function () {
    if (jogador.y > 120) {
        cairNoBuraco()
    }
})
