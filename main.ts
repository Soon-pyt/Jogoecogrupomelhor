namespace SpriteKind {
    export const Bandeira = SpriteKind.create()
    export const ItemVida = SpriteKind.create()
    export const ItemEstrela = SpriteKind.create()
    export const InimigoFerido = SpriteKind.create()
    export const InimigoAereo = SpriteKind.create()
    export const IndicadorEnergia = SpriteKind.create()
}
let nivel = 1
let direcao = 1
let velocidadeInimigo = 30
let invulneravel = false
let podeAtirar = true
let energiaTiro = 5
let velocidadeProjetil = 220
let projetil: Sprite = null
let inimigo: Sprite = null
let bandeira: Sprite = null
let itemVida: Sprite = null
let itemEstrela: Sprite = null
let indicadorEnergia: Sprite = null
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
let imagemBandeiraNivel1 = img`
    . . . . . . f f . . . . . . . .
    . . . . . . f 2 2 2 2 . . . . .
    . . . . . . f 2 2 2 2 2 . . . .
    . . . . . . f 2 2 2 2 . . . . .
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
let imagemBandeiraNivel2 = img`
    . . . . . . f f . . . . . . . .
    . . . . . . f 9 9 9 9 . . . . .
    . . . . . . f 9 9 9 9 9 . . . .
    . . . . . . f 9 9 9 9 . . . . .
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
let imagemBandeiraNivel3 = img`
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
let imagemVazia = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemEnergia0 = img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `
let imagemEnergia1 = img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . . . . . . 1
    1 5 5 . . . . . . . . . . . . 1
    1 5 5 . . . . . . . . . . . . 1
    1 5 5 . . . . . . . . . . . . 1
    1 5 5 . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `
let imagemEnergia2 = img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . . . . . . 1
    1 5 5 . 5 5 . . . . . . . . . 1
    1 5 5 . 5 5 . . . . . . . . . 1
    1 5 5 . 5 5 . . . . . . . . . 1
    1 5 5 . 5 5 . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `
let imagemEnergia3 = img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . . . . . . 1
    1 5 5 . 5 5 . 5 5 . . . . . . 1
    1 5 5 . 5 5 . 5 5 . . . . . . 1
    1 5 5 . 5 5 . 5 5 . . . . . . 1
    1 5 5 . 5 5 . 5 5 . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `
let imagemEnergia4 = img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . . . . . . 1
    1 5 5 . 5 5 . 5 5 . 5 5 . . . 1
    1 5 5 . 5 5 . 5 5 . 5 5 . . . 1
    1 5 5 . 5 5 . 5 5 . 5 5 . . . 1
    1 5 5 . 5 5 . 5 5 . 5 5 . . . 1
    1 . . . . . . . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `
let imagemEnergia5 = img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . . . . . . 1
    1 5 5 . 5 5 . 5 5 . 5 5 . 5 5 1
    1 5 5 . 5 5 . 5 5 . 5 5 . 5 5 1
    1 5 5 . 5 5 . 5 5 . 5 5 . 5 5 1
    1 5 5 . 5 5 . 5 5 . 5 5 . 5 5 1
    1 . . . . . . . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
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
let imagemChaoDeserto = img`
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    4 5 5 4 5 5 4 5 5 4 5 5 4 5 5 4
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    5 4 4 5 4 4 5 4 4 5 4 4 5 4 4 5
    4 4 5 4 4 5 4 4 5 4 4 5 4 4 5 4
    4 5 4 4 5 4 4 5 4 4 5 4 4 5 4 4
    5 4 4 5 4 4 5 4 4 5 4 4 5 4 4 5
    4 4 5 4 4 5 4 4 5 4 4 5 4 4 5 4
    4 5 4 4 5 4 4 5 4 4 5 4 4 5 4 4
    5 4 4 5 4 4 5 4 4 5 4 4 5 4 4 5
    4 4 5 4 4 5 4 4 5 4 4 5 4 4 5 4
    4 5 4 4 5 4 4 5 4 4 5 4 4 5 4 4
    5 4 4 5 4 4 5 4 4 5 4 4 5 4 4 5
    4 4 5 4 4 5 4 4 5 4 4 5 4 4 5 4
    4 5 4 4 5 4 4 5 4 4 5 4 4 5 4 4
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    `
let imagemPlataformaDeserto = img`
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 4 4 5 5 4 4 5 5 4 4 5 5 4 4 5
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    4 5 5 4 4 5 5 4 4 5 5 4 4 5 5 4
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 4 4 5 5 4 4 5 5 4 4 5 5 4 4 5
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    4 5 5 4 4 5 5 4 4 5 5 4 4 5 5 4
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 4 4 5 5 4 4 5 5 4 4 5 5 4 4 5
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    4 5 5 4 4 5 5 4 4 5 5 4 4 5 5 4
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 4 4 5 5 4 4 5 5 4 4 5 5 4 4 5
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    `
let imagemDecoracaoDeserto = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . 5 5 . . . . . . .
    . . . . . 5 5 5 5 5 5 . . . .
    . . . . 5 5 5 4 4 5 5 . . . .
    . . . 5 5 5 4 4 4 5 5 5 . . .
    . . . 5 5 4 4 4 4 4 5 5 . . .
    . . . . 5 5 4 4 4 5 5 . . . .
    . . . . . 5 5 5 5 5 5 . . . .
    . . . . . . . 5 5 . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `
let imagemChaoSubmundo = img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    4 2 2 4 2 2 4 2 2 4 2 2 4 2 2 4
    f f f f f f f f f f f f f f f f
    f f f 2 2 f f f f f 2 2 f f f f
    f f 2 4 4 2 f f f 2 4 4 2 f f f
    f f f 2 2 f f f f f 2 2 f f f f
    f f f f f f f f f f f f f f f f
    f f f 2 2 f f f f f 2 2 f f f f
    f f 2 4 4 2 f f f 2 4 4 2 f f f
    f f f 2 2 f f f f f 2 2 f f f f
    f f f f f f f f f f f f f f f f
    f f f 2 2 f f f f f 2 2 f f f f
    f f 2 4 4 2 f f f 2 4 4 2 f f f
    f f f 2 2 f f f f f 2 2 f f f f
    f f f f f f f f f f f f f f f f
    `
let imagemPlataformaSubmundo = img`
    f f f f f f f f f f f f f f f f
    f f 2 2 f f f f f f 2 2 f f f f
    f 2 4 4 2 f f f f 2 4 4 2 f f f
    f f 2 2 f f f f f f 2 2 f f f f
    f f f f f f f f f f f f f f f f
    f f 2 2 f f f f f f 2 2 f f f f
    f 2 4 4 2 f f f f 2 4 4 2 f f f
    f f 2 2 f f f f f f 2 2 f f f f
    f f f f f f f f f f f f f f f f
    f f 2 2 f f f f f f 2 2 f f f f
    f 2 4 4 2 f f f f 2 4 4 2 f f f
    f f 2 2 f f f f f f 2 2 f f f f
    f f f f f f f f f f f f f f f f
    f f 2 2 f f f f f f 2 2 f f f f
    f 2 4 4 2 f f f f 2 4 4 2 f f f
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    `
let imagemDecoracaoSubmundo = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . 2 4 4 2 . . . . . . .
    . . . . 2 4 4 4 4 2 . . . . . .
    . . . 2 4 4 5 5 4 4 2 . . . .
    . . . 2 4 5 5 5 5 4 2 . . . .
    . . . . 2 4 5 5 4 2 . . . . .
    . . . . . 2 4 4 2 . . . . . . .
    . . . . . . 2 2 . . . . . . . .
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
    if (nivel == 1) {
        scene.setBackgroundColor(9)
    } else if (nivel == 2) {
        scene.setBackgroundColor(8)
    } else {
        scene.setBackgroundColor(13)
    }
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
function criarInimigoAereo(x: number, y: number) {
    inimigo = sprites.create(imagemInimigoAereo, SpriteKind.InimigoAereo)
    inimigo.setPosition(x, y)
    inimigo.vx = 60
    inimigo.ay = 0
    inimigo.setBounceOnWall(true)
}
function criarBandeira(x: number, y: number) {
    if (nivel == 1) {
        bandeira = sprites.create(imagemBandeiraNivel1, SpriteKind.Bandeira)
    } else if (nivel == 2) {
        bandeira = sprites.create(imagemBandeiraNivel2, SpriteKind.Bandeira)
    } else {
        bandeira = sprites.create(imagemBandeiraNivel3, SpriteKind.Bandeira)
    }
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
function criarIndicadorEnergia() {
    indicadorEnergia = sprites.create(imagemEnergia5, SpriteKind.IndicadorEnergia)
    indicadorEnergia.setFlag(SpriteFlag.RelativeToCamera, true)
    indicadorEnergia.setPosition(144, 8)
}
function atualizarEnergia() {
    if (energiaTiro == 0) {
        indicadorEnergia.setImage(imagemEnergia0)
    } else if (energiaTiro == 1) {
        indicadorEnergia.setImage(imagemEnergia1)
    } else if (energiaTiro == 2) {
        indicadorEnergia.setImage(imagemEnergia2)
    } else if (energiaTiro == 3) {
        indicadorEnergia.setImage(imagemEnergia3)
    } else if (energiaTiro == 4) {
        indicadorEnergia.setImage(imagemEnergia4)
    } else {
        indicadorEnergia.setImage(imagemEnergia5)
    }
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
        tiles.setCurrentTilemap(tiles.createTilemap(hex`40000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000404040400000000000000000000000000000000000004040404000000000000000000000000000004040404000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003030303000000000000000000000000000303030300000000000000000000000000000303030300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003030303000000000000000000000003030303000000000000000000000000030303030000000000000000000000000003030303000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000202020202020202020202020202000002020202020202020202020202020000020202020202020202020202020200000002020202020202020202020202020200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . 2 2 2 2 . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . . 2 2 2 2 . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            `, [imagemVazia, imagemVazia, imagemChao, imagemPlataforma, imagemDecoracao], TileScale.Sixteen))
        configurarTiles()
        criarInimigo(168, 104)
        criarInimigo(392, 104)
        criarInimigo(680, 104)
        criarItemVida(376, 72)
        criarItemEstrela(760, 40)
        criarBandeira(984, 104)
    } else if (nivel == 2) {
        velocidadeInimigo = 45
        tiles.setCurrentTilemap(tiles.createTilemap(hex`40000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004040404000000000000000000000000000000000404040400000000000000000000000000000000040404040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303030000000000000000000000030303030000000000000000000000000003030303000000000000000000000303030300000000000000000000000000000000000000000003030303000000000000000000000000000303030300000000000000000000000303030300000000000000000000000000000000030303030000000000000000000000000000030303030000000000000000000000000303030300000000000000000000000000000003030303000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000202020202020202020202020000000202020202020202020202020000000202020202020202020202020200000002020202020202020202020202020202020200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . 2 2 2 2 . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . 2 2 2 2 . . . . .
            . . . . . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . .
            . . . . 2 2 2 2 . . . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . . . . 2 2 2 2 . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            `, [imagemVazia, imagemVazia, imagemChaoDeserto, imagemPlataformaDeserto, imagemDecoracaoDeserto], TileScale.Sixteen))
        configurarTiles()
        criarInimigoAereo(256, 56)
        criarInimigoAereo(560, 56)
        criarInimigoAereo(800, 56)
        criarItemVida(200, 40)
        criarItemEstrela(632, 72)
        criarBandeira(984, 104)
    } else {
        velocidadeInimigo = 110
        tiles.setCurrentTilemap(tiles.createTilemap(hex`40000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000404040400000000000000000000000000000404040400000000000000000000000000040404040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003030303030300000000000000000003030303030300000000000000000000030303030303000000000000000000000303030303030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003030303030300000000000000000000030303030303030000000000000000000003030303030300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000202020202020202020200000002020202020202020202000000020202020202020202020200000002020202020202020202020000000202020202020202020200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . 2 2 2 2 2 2 . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . 2 2 2 2 2 2 . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . 2 2 2 2 2 2 2 . . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            `, [imagemVazia, imagemVazia, imagemChaoSubmundo, imagemPlataformaSubmundo, imagemDecoracaoSubmundo], TileScale.Sixteen))
        configurarTiles()
        criarInimigo(88, 104)
        criarInimigo(296, 104)
        criarInimigo(520, 104)
        criarInimigo(744, 104)
        criarInimigo(968, 104)
        criarInimigoAereo(248, 56)
        criarInimigoAereo(568, 40)
        criarInimigoAereo(840, 72)
        criarItemVida(216, 72)
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
    info.changeLifeBy(-1)
    renascerJogador()
    invulneravel = true
    music.playTone(Note.C4, music.beat(BeatFraction.Eighth))
    if (info.life() <= 0) {
        game.gameOver(false)
    } else {
        jogador.startEffect(effects.spray, 500)
        piscarJogador()
        invulneravel = false
    }
}
function ativarTurbo() {
    invulneravel = true
    velocidadeProjetil = 280
    controller.moveSprite(jogador, 160, 0)
    jogador.setFlag(SpriteFlag.GhostThroughSprites, true)
    jogador.startEffect(effects.halo, 5000)
    pause(5000)
    controller.moveSprite(jogador, 110, 0)
    velocidadeProjetil = 220
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
jogador.ay = 480
scene.cameraFollowSprite(jogador)
criarIndicadorEnergia()
atualizarEnergia()
carregarNivel()
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jogador.isHittingTile(CollisionDirection.Bottom)) {
        jogador.vy = -195
        music.playTone(Note.C5, music.beat(BeatFraction.Quarter))
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (podeAtirar == true) {
        if (energiaTiro > 0) {
            energiaTiro += -1
            atualizarEnergia()
            podeAtirar = false
            projetil = sprites.createProjectileFromSprite(imagemProjetil, jogador, velocidadeProjetil * direcao, 0)
            music.playTone(Note.B5, music.beat(BeatFraction.Eighth))
            pause(250)
            podeAtirar = true
        } else {
            music.playTone(98, 100)
        }
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
    scene.cameraShake(2, 100)
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
    scene.cameraShake(2, 100)
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
    scene.cameraShake(2, 100)
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
    if (jogador.vx > 0) {
        jogador.setImage(imagemJogadorDireita)
        direcao = 1
    } else if (jogador.vx < 0) {
        jogador.setImage(imagemJogadorEsquerda)
        direcao = -1
    }
    if (jogador.y > 150) {
        cairNoBuraco()
    }
})
game.onUpdateInterval(2000, function () {
    if (energiaTiro < 5) {
        energiaTiro += 1
        atualizarEnergia()
    }
})
