let direcao = 1
let projetil: Sprite = null
let imagemJogadorDireita = img`
    . . . 2 2 2 2 2 2 . . . . . . .
    . . 2 2 2 2 2 2 2 2 2 . . . . .
    . . 4 4 4 4 4 f 4 . . . . . . .
    . 4 4 4 4 4 4 f 4 4 4 . . . . .
    . 4 4 4 4 4 4 4 f 4 4 4 . . . .
    . 4 4 4 4 4 4 f f f f . . . . .
    . . . 4 4 4 4 4 4 . . . . . . .
    . . 2 2 8 2 2 2 . . . . . . . .
    . 2 2 2 8 2 2 8 2 2 2 . . . . .
    2 2 2 2 8 8 8 8 2 2 2 2 . . . .
    4 4 2 8 5 8 8 5 8 2 4 4 . . . .
    4 4 4 8 8 8 8 8 8 4 4 4 . . . .
    . 4 8 8 8 8 8 8 8 8 4 . . . . .
    . . 8 8 8 . . 8 8 8 . . . . . .
    . e e e . . . . e e e . . . . . .
    e e e e . . . . e e e e . . . . .
    `
let imagemJogadorEsquerda = img`
    . . . . . . . 2 2 2 2 2 2 . . .
    . . . . . 2 2 2 2 2 2 2 2 2 . .
    . . . . . . . 4 f 4 4 4 4 4 . .
    . . . . . 4 4 4 f 4 4 4 4 4 .
    . . . . 4 4 4 f 4 4 4 4 4 4 .
    . . . . f f f f 4 4 4 4 4 4 .
    . . . . . . 4 4 4 4 4 4 . . .
    . . . . . . . . 2 2 2 8 2 2 . .
    . . . . . 2 2 2 8 2 2 8 2 2 2 .
    . . . . 2 2 2 2 8 8 8 8 2 2 2 2
    . . . . 4 4 2 8 5 8 8 5 8 2 4 4
    . . . . 4 4 4 8 8 8 8 8 8 4 4 4
    . . . . . 4 8 8 8 8 8 8 8 8 4 .
    . . . . . . 8 8 8 . . 8 8 8 . .
    . . . . . . e e e . . . . e e e .
    . . . . . e e e e . . . . e e e e
    `
let imagemProjetil = img`
    . . 5 5 5 . . .
    . 5 5 4 4 5 . .
    5 5 4 4 2 4 5 .
    5 4 4 2 2 4 5 5
    5 5 4 4 2 4 5 .
    . 5 5 4 4 5 . .
    . . 5 5 5 . . .
    . . . 5 . . . .
    `
let jogador = sprites.create(imagemJogadorDireita, SpriteKind.Player)
scene.setBackgroundColor(9)
scene.setTileMap(img`
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . 2 2 2 2 . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . 2 2 2 2 2 . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    `)
scene.setTile(2, img`
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
    `, true)
controller.moveSprite(jogador, 100, 0)
jogador.ay = 350
jogador.setPosition(24, 80)
scene.cameraFollowSprite(jogador)
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direcao = -1
    jogador.setImage(imagemJogadorEsquerda)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direcao = 1
    jogador.setImage(imagemJogadorDireita)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jogador.isHittingTile(CollisionDirection.Bottom)) {
        jogador.vy = -150
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projetil = sprites.createProjectileFromSprite(imagemProjetil, jogador, 120 * direcao, 0)
})
