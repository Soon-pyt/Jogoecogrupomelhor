namespace SpriteKind {
    export const Bandeira = SpriteKind.create()
    export const ItemVida = SpriteKind.create()
    export const ItemEstrela = SpriteKind.create()
    export const InimigoFerido = SpriteKind.create()
    export const InimigoAereo = SpriteKind.create()
}
let nivel = 1
let direcao = 1
let velocidadeInimigo = 30
let invulneravel = false
let podeAtirar = true
let perdeuNoBuraco = false
let projetil: Sprite = null
let inimigo: Sprite = null
let bandeira: Sprite = null
let itemVida: Sprite = null
let itemEstrela: Sprite = null
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
let imagemInimigoNivel1 = img`
    . . . . d d d d . . . . . . . .
    . . d d d d d d d d . . . . . .
    . d d d d d d d d d d . . . . .
    d d d f d d d d f d d d . . . .
    d d d d d d d d d d d d . . . .
    d d f d d d d d d d f d . . . .
    d d d f f f f f f f d d . . . .
    . d d d d d d d d d d . . . . .
    . . d d d d d d d d . . . . . .
    . . . d d . . d d . . . . . . .
    . . d d . . . . d d . . . . . .
    . d d . . . . . . d d . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemInimigoNivel2 = img`
    . . . . 7 7 7 7 . . . . . . . .
    . . 7 7 7 7 7 7 7 7 . . . . . .
    . 7 7 7 7 7 7 7 7 7 7 . . . . .
    7 7 7 f 7 7 7 7 f 7 7 7 . . . .
    7 7 7 7 7 7 7 7 7 7 7 7 . . . .
    7 7 f 7 7 7 7 7 7 7 f 7 . . . .
    7 7 7 f f f f f f f 7 7 . . . .
    . 7 7 7 7 7 7 7 7 7 7 . . . . .
    . . 7 7 7 7 7 7 7 7 . . . . . .
    . . . 7 7 . . 7 7 . . . . . . .
    . . 7 7 . . . . 7 7 . . . . . .
    . 7 7 . . . . . . 7 7 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemInimigoNivel3 = img`
    . . 2 . . . . . . 2 . . . . . .
    . . 2 2 . . . . 2 2 . . . . . .
    . . . 2 2 2 2 2 2 . . . . . . .
    . . 2 2 2 2 2 2 2 2 . . . . . .
    . 2 2 f 2 2 2 2 f 2 2 . . . . .
    2 2 2 2 2 2 2 2 2 2 2 2 . . . .
    2 2 f 2 2 2 2 2 2 2 f 2 . . . .
    2 2 2 f f f f f f f 2 2 . . . .
    . 2 2 2 2 2 2 2 2 2 2 . . . . .
    . . 2 2 2 2 2 2 2 2 . . . . . .
    . . . 2 2 . . 2 2 . . . . . . .
    . . 2 2 . . . . 2 2 . . . . . .
    . 2 2 . . . . . . 2 2 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemInimigoFerido = img`
    . . 2 . . . . . . 2 . . . . . .
    . . 2 2 . . . . 2 2 . . . . . .
    . . . 2 2 2 2 2 2 . . . . . . .
    . . 2 2 2 2 2 2 2 2 . . . . . .
    . 2 2 f 2 2 2 2 f 2 2 . . . . .
    2 2 2 2 5 5 5 5 2 2 2 2 . . . .
    2 2 f 2 2 5 5 2 2 2 f 2 . . . .
    2 2 2 f f f f f f f 2 2 . . . .
    . 2 2 2 2 2 2 2 2 2 2 . . . . .
    . . 2 2 5 2 2 5 2 2 . . . . . .
    . . . 2 2 . . 2 2 . . . . . . .
    . . 2 2 . . . . 2 2 . . . . . .
    . 2 2 . . . . . . 2 2 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemInimigoAereo = img`
    . . . . . . . . . . . . . . . .
    . . . . . f f . . f f . . . . .
    . . . . f 8 8 f f 8 8 f . . . .
    . . . f 8 8 8 8 8 8 8 8 f . . .
    . . f 8 8 f 8 8 8 8 f 8 8 f . .
    . f 8 8 8 8 8 8 8 8 8 8 8 f .
    f 8 8 8 f f f f f f 8 8 8 8 f
    f 8 f 8 8 8 f f 8 8 8 f 8 8 f
    . f . f 8 8 8 8 8 8 f . f . .
    . . . . f 8 8 8 8 f . . . . .
    . . . . . f f f f . . . . . . .
    . . . . . . f f . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemBandeira = img`
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
let imagemItemVida = img`
    . . . . . . . . . . . . . . . .
    . . . 2 2 . . . . 2 2 . . . .
    . . 2 2 2 2 . . 2 2 2 2 . . .
    . 2 2 2 2 2 2 2 2 2 2 2 . . .
    . 2 2 2 2 2 2 2 2 2 2 2 . . .
    . 2 2 2 2 2 2 2 2 2 2 2 . . .
    . . 2 2 2 2 2 2 2 2 2 . . . .
    . . . 2 2 2 2 2 2 2 . . . . .
    . . . . 2 2 2 2 2 . . . . . .
    . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemItemEstrela = img`
    . . . . . . 5 5 . . . . . . . .
    . . . . . 5 5 5 5 . . . . . . .
    . . . . . 5 4 4 5 . . . . . . .
    . . . . 5 4 4 4 4 5 . . . . . .
    . 5 5 5 4 4 4 4 5 5 5 . . . .
    . . 5 4 4 4 4 4 4 5 . . . . .
    . . . 5 4 4 4 4 5 . . . . . .
    . . . 5 4 4 4 4 5 . . . . . .
    . . 5 4 4 5 5 4 4 5 . . . . .
    . 5 4 4 5 . . 5 4 4 5 . . . .
    . 5 5 5 . . . . 5 5 5 . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemChao = img`
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
let imagemPlataforma = img`
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
let imagemDecoracao = img`
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
let jogador = sprites.create(imagemJogadorDireita, SpriteKind.Player)
function configurarTiles() {
    scene.setTile(2, imagemChao, true)
    scene.setTile(3, imagemPlataforma, true)
    scene.setTile(4, imagemDecoracao, false)
}
function renascerJogador() {
    jogador.setImage(imagemJogadorDireita)
    direcao = 1
    jogador.setPosition(24, 80)
    jogador.vx = 0
    jogador.vy = 0
    jogador.setFlag(SpriteFlag.Invisible, false)
}
function criarInimigo(x: number, y: number) {
    if (nivel == 1) {
        inimigo = sprites.create(imagemInimigoNivel1, SpriteKind.Enemy)
    } else if (nivel == 2) {
        inimigo = sprites.create(imagemInimigoNivel2, SpriteKind.Enemy)
    } else {
        inimigo = sprites.create(imagemInimigoNivel3, SpriteKind.Enemy)
    }
    inimigo.setPosition(x, y)
    inimigo.vx = velocidadeInimigo * -1
    inimigo.ay = 400
    inimigo.setBounceOnWall(true)
}
function criarInimigoAereo(x: number, y: number, velocidade: number) {
    inimigo = sprites.create(imagemInimigoAereo, SpriteKind.InimigoAereo)
    inimigo.setPosition(x, y)
    inimigo.vx = velocidade
    inimigo.ay = 0
}
function criarBandeira(x: number, y: number) {
    bandeira = sprites.create(imagemBandeira, SpriteKind.Bandeira)
    bandeira.setPosition(x, y)
}
function criarItemVida(x: number, y: number) {
    itemVida = sprites.create(imagemItemVida, SpriteKind.ItemVida)
    itemVida.setPosition(x, y)
}
function criarItemEstrela(x: number, y: number) {
    itemEstrela = sprites.create(imagemItemEstrela, SpriteKind.ItemEstrela)
    itemEstrela.setPosition(x, y)
}
function carregarNivel() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.InimigoFerido)
    sprites.destroyAllSpritesOfKind(SpriteKind.InimigoAereo)
    sprites.destroyAllSpritesOfKind(SpriteKind.Bandeira)
    sprites.destroyAllSpritesOfKind(SpriteKind.ItemVida)
    sprites.destroyAllSpritesOfKind(SpriteKind.ItemEstrela)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    if (nivel == 1) {
        velocidadeInimigo = 30
        scene.setTileMap(img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . 4 4 4 4 . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . 3 3 3 3 . . . . . . . . . . . . 3 3 3 3 . . . . . . . . . . 3 3 3 3 3 . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . 3 3 3 3 . . . . . . . . 3 3 3 3 3 . . . . . . . . . 3 3 3 3 3 . . . . . . . . . . . 3 3 3 3 . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 2 2
            `)
        configurarTiles()
        criarInimigo(168, 104)
        criarInimigo(392, 104)
        criarInimigo(680, 104)
        criarItemVida(216, 72)
        criarItemEstrela(664, 72)
        criarBandeira(984, 104)
    } else if (nivel == 2) {
        velocidadeInimigo = 45
        scene.setTileMap(img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . 4 4 4 4 . . . . . . . . . . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . 3 3 3 3 3 . . . . . . . . . 3 3 3 3 3 . . . . . . . . . . 3 3 3 3 3 . . . . . . . . . 3 3 3 3 . . . . . . .
            . . . . . . . . . . . . . . . . 3 3 3 3 . . . . . . . . . . . . . . 3 3 3 3 . . . . . . . . . . 3 3 3 3 . . . . . . . . . . . .
            . . . . . . . . 3 3 3 3 . . . . . . . 3 3 3 3 3 . . . . . . . . . 3 3 3 3 3 . . . . . . . . . . 3 3 3 3 . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            2 2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            `)
        configurarTiles()
        criarInimigo(184, 104)
        criarInimigo(392, 104)
        criarInimigo(632, 104)
        criarInimigo(888, 104)
        criarInimigoAereo(256, 64, 35)
        criarInimigoAereo(560, 48, -35)
        criarItemVida(200, 40)
        criarItemEstrela(584, 72)
        criarBandeira(984, 104)
    } else {
        velocidadeInimigo = 60
        scene.setTileMap(img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . 4 4 4 4 . . . . . . . . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . 3 3 3 3 . . . . . . . . . . 3 3 3 3 . . . . . . . . . . . 3 3 3 3 . . . . . . . . . . . 3 3 3 3 . . . . . . . . . .
            . . . . . . . . . . . . 3 3 3 3 . . . . . . . . 3 3 3 3 . . . . . . . . 3 3 3 3 . . . . . . . . 3 3 3 3 . . . . . . 3 3 3 3 . .
            . . . 3 3 3 3 3 . . . . . . . . 3 3 3 3 3 . . . . . . . . . 3 3 3 3 3 . . . . . . . . 3 3 3 3 3 . . . . . . . . 3 3 3 3 . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2
            `)
        configurarTiles()
        criarInimigo(88, 104)
        criarInimigo(296, 104)
        criarInimigo(520, 104)
        criarInimigo(744, 104)
        criarInimigo(968, 104)
        criarInimigoAereo(224, 56, 45)
        criarInimigoAereo(560, 48, -45)
        criarInimigoAereo(816, 56, 45)
        criarItemVida(232, 40)
        criarItemEstrela(728, 72)
        criarBandeira(984, 104)
    }
    renascerJogador()
}
function piscarJogador() {
    jogador.setFlag(SpriteFlag.GhostThroughSprites, true)
    for (let index = 0; index < 6; index++) {
        jogador.setFlag(SpriteFlag.Invisible, true)
        pause(100)
        jogador.setFlag(SpriteFlag.Invisible, false)
        pause(100)
    }
    jogador.setFlag(SpriteFlag.Invisible, false)
    jogador.setFlag(SpriteFlag.GhostThroughSprites, false)
}
function machucarJogador() {
    if (invulneravel == false) {
        invulneravel = true
        info.changeLifeBy(-1)
        music.playTone(Note.C4, music.beat(BeatFraction.Eighth))
        if (info.life() <= 0) {
            game.gameOver(false)
        } else {
            jogador.startEffect(effects.spray, 500)
            piscarJogador()
            invulneravel = false
        }
    }
}
function cairNoBuraco() {
    if (perdeuNoBuraco == false) {
        perdeuNoBuraco = true
        invulneravel = true
        renascerJogador()
        info.changeLifeBy(-1)
        music.playTone(Note.C4, music.beat(BeatFraction.Eighth))
        if (info.life() <= 0) {
            game.gameOver(false)
        } else {
            jogador.startEffect(effects.spray, 500)
            piscarJogador()
            invulneravel = false
            perdeuNoBuraco = false
        }
    }
}
function ativarTurbo() {
    invulneravel = true
    controller.moveSprite(jogador, 160, 0)
    jogador.setFlag(SpriteFlag.GhostThroughSprites, true)
    jogador.startEffect(effects.halo, 5000)
    pause(5000)
    controller.moveSprite(jogador, 110, 0)
    jogador.setFlag(SpriteFlag.GhostThroughSprites, false)
    jogador.setFlag(SpriteFlag.Invisible, false)
    invulneravel = false
}
function passarDeNivel() {
    if (nivel < 3) {
        nivel += 1
        music.playMelody("C5 E5 G5 C6", 180)
        carregarNivel()
    } else {
        game.gameOver(true)
    }
}
scene.setBackgroundColor(9)
info.setLife(3)
info.setScore(0)
controller.moveSprite(jogador, 110, 0)
jogador.ay = 400
scene.cameraFollowSprite(jogador)
carregarNivel()
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
        jogador.vy = -175
        music.playTone(Note.C5, music.beat(BeatFraction.Quarter))
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (podeAtirar == true) {
        podeAtirar = false
        projetil = sprites.createProjectileFromSprite(imagemProjetil, jogador, 120 * direcao, 0)
        music.playTone(Note.B5, music.beat(BeatFraction.Eighth))
        pause(300)
        podeAtirar = true
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (invulneravel == false) {
        otherSprite.destroy(effects.fire, 100)
        machucarJogador()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.InimigoFerido, function (sprite, otherSprite) {
    if (invulneravel == false) {
        otherSprite.destroy(effects.fire, 100)
        machucarJogador()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.InimigoAereo, function (sprite, otherSprite) {
    if (invulneravel == false) {
        otherSprite.destroy(effects.fire, 100)
        machucarJogador()
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (nivel == 3) {
        sprite.destroy(effects.fire, 100)
        otherSprite.setImage(imagemInimigoFerido)
        otherSprite.setKind(SpriteKind.InimigoFerido)
        otherSprite.vx = velocidadeInimigo
        music.playTone(Note.A4, music.beat(BeatFraction.Eighth))
    } else {
        sprite.destroy(effects.fire, 100)
        otherSprite.destroy(effects.disintegrate, 200)
        info.changeScoreBy(10)
        music.playMelody("C5 G5 C6", 240)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.InimigoAereo, function (sprite, otherSprite) {
    if (nivel == 3) {
        sprite.destroy(effects.fire, 100)
        otherSprite.setImage(imagemInimigoFerido)
        otherSprite.setKind(SpriteKind.InimigoFerido)
        otherSprite.vx = velocidadeInimigo * -1
        music.playTone(Note.A4, music.beat(BeatFraction.Eighth))
    } else {
        sprite.destroy(effects.fire, 100)
        otherSprite.destroy(effects.disintegrate, 200)
        info.changeScoreBy(10)
        music.playMelody("C5 G5 C6", 240)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.InimigoFerido, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 100)
    otherSprite.destroy(effects.disintegrate, 200)
    info.changeScoreBy(10)
    music.playMelody("C5 G5 C6", 240)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ItemVida, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 200)
    info.changeLifeBy(1)
    music.playTone(Note.E5, music.beat(BeatFraction.Quarter))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ItemEstrela, function (sprite, otherSprite) {
    otherSprite.destroy(effects.halo, 200)
    music.playTone(Note.A5, music.beat(BeatFraction.Quarter))
    ativarTurbo()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bandeira, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 200)
    passarDeNivel()
})
game.onUpdate(function () {
    if (jogador.y > 120) {
        cairNoBuraco()
    }
})
