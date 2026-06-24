namespace SpriteKind {
    export const Bandeira = SpriteKind.create()
    export const ItemVida = SpriteKind.create()
    export const ItemEstrela = SpriteKind.create()
    export const InimigoFerido = SpriteKind.create()
    export const InimigoAereo = SpriteKind.create()
    export const IndicadorEnergia = SpriteKind.create()
    export const InimigoAtirador = SpriteKind.create()
    export const ProjetilInimigo = SpriteKind.create()
}
function criarInimigoAtirador (x: number, y: number) {
    atirador = sprites.create(imagemInimigoAtirador, SpriteKind.InimigoAtirador)
    atirador.setPosition(x, y)
    atirador.vx = velocidadeInimigo * -1
    atirador.ay = 400
    atirador.setBounceOnWall(true)
}
function pontuarInimigoAtirador () {
    info.changeScoreBy(pontosBase() + 25)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.InimigoAereo, function (sprite, otherSprite) {
    if (invulneravel == false) {
        otherSprite.destroy(effects.fire, 100)
        aplicarDano("inimigo")
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() - tempoUltimoTiro >= 250) {
        podeAtirar = true
    } else {
        podeAtirar = false
    }
    if (podeAtirar == true) {
        if (energiaTiro > 0) {
            energiaTiro += -1
            atualizarEnergia()
            tempoUltimoTiro = game.runtime()
            projetil = sprites.createProjectileFromSprite(imagemProjetil, jogador, velocidadeProjetil * direcao, 0)
            music.playTone(988, music.beat(BeatFraction.Eighth))
        } else {
            music.playTone(98, 100)
        }
    }
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
function criarBandeira (x: number, y: number) {
    if (nivel == 1) {
        bandeira = sprites.create(imagemBandeiraNivel1, SpriteKind.Bandeira)
    } else if (nivel == 2) {
        bandeira = sprites.create(imagemBandeiraNivel2, SpriteKind.Bandeira)
    } else {
        bandeira = sprites.create(imagemBandeiraNivel3, SpriteKind.Bandeira)
    }
    bandeira.setPosition(x, y)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jogador.isHittingTile(CollisionDirection.Bottom)) {
        jogador.vy = -195
        music.playTone(523, music.beat(BeatFraction.Quarter))
    }
})
function protegerBuraco (inimigoAtual: Sprite) {
    if (inimigoAtual.vx < 0) {
        if (tiles.tileAtLocationIsWall(tiles.getTileLocation(Math.idiv(inimigoAtual.x - 12, 16), Math.idiv(inimigoAtual.y + 10, 16))) == false) {
            inimigoAtual.vx = inimigoAtual.vx * -1
        }
    } else if (inimigoAtual.vx > 0) {
        if (tiles.tileAtLocationIsWall(tiles.getTileLocation(Math.idiv(inimigoAtual.x + 12, 16), Math.idiv(inimigoAtual.y + 10, 16))) == false) {
            inimigoAtual.vx = inimigoAtual.vx * -1
        }
    }
}
function renascerJogador () {
    jogador.setImage(imagemJogadorDireita)
    direcao = 1
    jogador.setPosition(24, 80)
    jogador.vx = 0
    jogador.vy = 0
    jogador.setFlag(SpriteFlag.Invisible, false)
}
function pontuarInimigoTerrestre () {
    info.changeScoreBy(pontosBase())
}
function aplicarDano (origem: string) {
    if (invulneravel == false) {
        info.changeLifeBy(-1)
        if (origem == "buraco") {
            renascerJogador()
        }
        invulneravel = true
        piscandoDano = true
        spriteVisivel = true
        tempoFimInvulneravel = game.runtime() + 1200
        tempoProximoPiscar = game.runtime()
        music.playTone(262, music.beat(BeatFraction.Eighth))
        if (info.life() <= 0) {
            game.gameOver(false)
        } else {
            jogador.startEffect(effects.spray, 500)
        }
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite != otherSprite) {
        sprite.vx = sprite.vx * -1
        otherSprite.vx = otherSprite.vx * -1
    }
})
function pontuarInimigoAereo () {
    info.changeScoreBy(pontosBase() + 15)
}
sprites.onOverlap(SpriteKind.InimigoAtirador, SpriteKind.InimigoAtirador, function (sprite, otherSprite) {
    if (sprite != otherSprite) {
        sprite.vx = sprite.vx * -1
        otherSprite.vx = otherSprite.vx * -1
    }
})
function criarAmeacaDinamica () {
    xDinamico = jogador.x + 96
    if (xDinamico > 984) {
        xDinamico = jogador.x - 96
    }
    if (xDinamico < 32) {
        xDinamico = 32
    }
    if (Math.percentChance(50)) {
        if (tiles.tileAtLocationIsWall(tiles.getTileLocation(Math.idiv(xDinamico, 16), 7))) {
            criarInimigo(xDinamico, 104)
        } else {
            criarInimigoAereo(xDinamico, randint(48, 72))
        }
    } else {
        criarInimigoAereo(xDinamico, randint(48, 72))
    }
}
function atualizarEnergia () {
    indicadorEnergia.setImage(imagensEnergia[energiaTiro])
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ProjetilInimigo, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    aplicarDano("tiro")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bandeira, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 200)
    passarDeNivel()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.InimigoAtirador, function (sprite, otherSprite) {
    scene.cameraShake(2, 100)
    sprite.destroy(effects.fire, 100)
    otherSprite.destroy(effects.disintegrate, 200)
    pontuarInimigoAtirador()
    music.playMelody("C5 G5 C6", 240)
})
function criarIndicadorEnergia () {
    indicadorEnergia = sprites.create(imagemEnergia5, SpriteKind.IndicadorEnergia)
    indicadorEnergia.setFlag(SpriteFlag.RelativeToCamera, true)
    indicadorEnergia.setPosition(24, 112)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.ProjetilInimigo, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 100)
    otherSprite.destroy(effects.spray, 100)
})
function ativarTurbo () {
    invulneravel = true
    turboAtivo = true
    velocidadeProjetil = 280
    tempoFimTurbo = game.runtime() + 5000
    tempoFimInvulneravel = tempoFimTurbo
    controller.moveSprite(jogador, 160, 0)
    jogador.startEffect(effects.halo, 5000)
}
function pontosBase () {
    return nivel * 10
}
function criarItemVida (x: number, y: number) {
    itemVida = sprites.create(imagemItemVida, SpriteKind.ItemVida)
    itemVida.setPosition(x, y)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.InimigoFerido, function (sprite, otherSprite) {
    scene.cameraShake(2, 100)
    sprite.destroy(effects.fire, 100)
    otherSprite.destroy(effects.disintegrate, 200)
    pontuarInimigoTerrestre()
    music.playMelody("C5 G5 C6", 240)
})
function criarInimigo (x: number, y: number) {
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.InimigoAtirador, function (sprite, otherSprite) {
    if (jogador.vy > 0) {
        otherSprite.destroy(effects.disintegrate, 200)
        pontuarInimigoAtirador()
        jogador.vy = -150
        music.playTone(523, music.beat(BeatFraction.Eighth))
    } else {
        if (invulneravel == false) {
            otherSprite.destroy(effects.fire, 100)
            aplicarDano("inimigo")
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.InimigoAereo, function (sprite, otherSprite) {
    scene.cameraShake(2, 100)
    sprite.destroy(effects.fire, 100)
    otherSprite.destroy(effects.disintegrate, 200)
    pontuarInimigoAereo()
    music.playMelody("C5 G5 C6", 240)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ItemEstrela, function (sprite, otherSprite) {
    otherSprite.destroy(effects.halo, 200)
    music.playTone(880, music.beat(BeatFraction.Quarter))
    ativarTurbo()
})
function atualizarTempos () {
    if (turboAtivo == true) {
        if (game.runtime() > tempoFimTurbo) {
            turboAtivo = false
            controller.moveSprite(jogador, 110, 0)
            velocidadeProjetil = 220
            if (piscandoDano == false) {
                invulneravel = false
            }
        }
    }
    if (piscandoDano == true) {
        if (game.runtime() > tempoProximoPiscar) {
            if (spriteVisivel == true) {
                jogador.setFlag(SpriteFlag.Invisible, true)
                spriteVisivel = false
            } else {
                jogador.setFlag(SpriteFlag.Invisible, false)
                spriteVisivel = true
            }
            tempoProximoPiscar = game.runtime() + 100
        }
        if (game.runtime() > tempoFimInvulneravel) {
            piscandoDano = false
            jogador.setFlag(SpriteFlag.Invisible, false)
            if (turboAtivo == false) {
                invulneravel = false
            }
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ItemVida, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 200)
    info.changeLifeBy(1)
    music.playTone(659, music.beat(BeatFraction.Quarter))
})
function configurarTiles () {
    if (nivel == 1) {
        scene.setBackgroundColor(9)
    } else if (nivel == 2) {
        scene.setBackgroundColor(11)
    } else {
        scene.setBackgroundColor(13)
    }
}
function atirarInimigo (atiradorAtual: Sprite) {
    if (jogador.x < atiradorAtual.x) {
        direcaoTiroInimigo = -1
    } else {
        direcaoTiroInimigo = 1
    }
    projetilInimigo = sprites.createProjectileFromSprite(imagemProjetilInimigo, atiradorAtual, 55 * direcaoTiroInimigo, 0)
    projetilInimigo.setKind(SpriteKind.ProjetilInimigo)
}
function carregarNivel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.InimigoFerido)
    sprites.destroyAllSpritesOfKind(SpriteKind.InimigoAereo)
    sprites.destroyAllSpritesOfKind(SpriteKind.InimigoAtirador)
    sprites.destroyAllSpritesOfKind(SpriteKind.Bandeira)
    sprites.destroyAllSpritesOfKind(SpriteKind.ItemVida)
    sprites.destroyAllSpritesOfKind(SpriteKind.ItemEstrela)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.ProjetilInimigo)
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
        criarInimigo(264, 104)
        criarInimigo(392, 104)
        criarInimigo(536, 104)
        criarInimigo(680, 104)
        criarInimigo(824, 104)
        criarInimigoAtirador(456, 104)
        criarInimigoAtirador(888, 104)
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
        criarInimigoAereo(384, 72)
        criarInimigoAereo(560, 56)
        criarInimigoAereo(688, 72)
        criarInimigoAereo(800, 56)
        criarInimigoAereo(928, 72)
        criarInimigoAtirador(184, 104)
        criarInimigoAtirador(504, 104)
        criarInimigoAtirador(824, 104)
        criarItemVida(200, 40)
        criarItemEstrela(632, 72)
        criarBandeira(984, 104)
    } else {
        velocidadeInimigo = 110
        tiles.setCurrentTilemap(tiles.createTilemap(hex`40000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000404040400000000000000000000000000000000000000000404040400000000000000000000000000000000000004040404000000000000000000000000000000000000000003030303030300000000000000000000000000000000000000000000030303030303000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303030303000000000000000000000000000000000000000000000000030303030303000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000303030303030000000000000000000003030303030300000000000000000000000000000000030303030303000000000000000000000000000000000202020202020202020200000002020202020202020202000000020202020202020202020200000002020202020202020202020000000202020202020202020200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . 2 2 2 2 . . . . . . . . . . . . . . . . . . . . 2 2 2 2 . . . . . . . . . . . . . . . . . . 2 2 2 2 . . . . . . . .
            . . . . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . . . . . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . . . . . . . . . . . . . . . 2 2 2 2 2 2 . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . 2 2 2 2 2 2 . . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . . . . . . . 2 2 2 2 2 2 . . . . . . . . . . . . . . . .
            2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 2 2
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            `, [imagemVazia, imagemVazia, imagemChaoSubmundo, imagemPlataformaSubmundo, imagemDecoracaoSubmundo], TileScale.Sixteen))
        configurarTiles()
        criarInimigo(88, 104)
        criarInimigo(312, 104)
        criarInimigo(560, 104)
        criarInimigo(904, 104)
        criarInimigoAtirador(216, 104)
        criarInimigoAtirador(456, 104)
        criarInimigoAtirador(760, 104)
        criarInimigoAereo(248, 56)
        criarInimigoAereo(568, 40)
        criarInimigoAereo(840, 72)
        criarInimigoAereo(936, 40)
        criarItemVida(216, 72)
        criarItemEstrela(728, 72)
        criarBandeira(984, 104)
    }
    renascerJogador()
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.InimigoAtirador, function (sprite, otherSprite) {
    sprite.vx = sprite.vx * -1
    otherSprite.vx = otherSprite.vx * -1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(2, 100)
    if (nivel == 3) {
        sprite.destroy(effects.fire, 100)
        otherSprite.setImage(imagemInimigoFerido)
        otherSprite.setKind(SpriteKind.InimigoFerido)
        otherSprite.vx = velocidadeInimigo
        music.playTone(440, music.beat(BeatFraction.Eighth))
    } else {
        sprite.destroy(effects.fire, 100)
        otherSprite.destroy(effects.disintegrate, 200)
        pontuarInimigoTerrestre()
        music.playMelody("C5 G5 C6", 240)
    }
})
function criarInimigoAereo (x: number, y: number) {
    inimigo = sprites.create(imagemInimigoAereo, SpriteKind.InimigoAereo)
    inimigo.setPosition(x, y)
    inimigo.vx = 60
    inimigo.ay = 0
    inimigo.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.InimigoFerido, function (sprite, otherSprite) {
    if (jogador.vy > 0) {
        otherSprite.destroy(effects.disintegrate, 200)
        pontuarInimigoTerrestre()
        jogador.vy = -150
        music.playTone(523, music.beat(BeatFraction.Eighth))
    } else {
        if (invulneravel == false) {
            otherSprite.destroy(effects.fire, 100)
            aplicarDano("inimigo")
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (jogador.vy > 0) {
        otherSprite.destroy(effects.disintegrate, 200)
        pontuarInimigoTerrestre()
        jogador.vy = -150
        music.playTone(523, music.beat(BeatFraction.Eighth))
    } else {
        if (invulneravel == false) {
            otherSprite.destroy(effects.fire, 100)
            aplicarDano("inimigo")
        }
    }
})
function criarItemEstrela (x: number, y: number) {
    itemEstrela = sprites.create(imagemItemEstrela, SpriteKind.ItemEstrela)
    itemEstrela.setPosition(x, y)
}
let itemEstrela: Sprite = null
let projetilInimigo: Sprite = null
let inimigo: Sprite = null
let itemVida: Sprite = null
let tempoFimTurbo = 0
let turboAtivo = false
let indicadorEnergia: Sprite = null
let xDinamico = 0
let tempoProximoPiscar = 0
let tempoFimInvulneravel = 0
let piscandoDano = false
let bandeira: Sprite = null
let projetil: Sprite = null
let tempoUltimoTiro = 0
let invulneravel = false
let atirador: Sprite = null
let imagensEnergia: Image[] = []
let jogador: Sprite = null
let imagemEnergia5: Image = null
let imagemItemEstrela: Image = null
let imagemItemVida: Image = null
let imagemBandeiraNivel3: Image = null
let imagemBandeiraNivel2: Image = null
let imagemBandeiraNivel1: Image = null
let imagemProjetilInimigo: Image = null
let imagemInimigoAtirador: Image = null
let imagemInimigoAereo: Image = null
let imagemInimigoFerido: Image = null
let imagemInimigoNivel3: Image = null
let imagemInimigoNivel2: Image = null
let imagemInimigoNivel1: Image = null
let imagemProjetil: Image = null
let imagemJogadorDireita: Image = null
let direcaoTiroInimigo = 0
let spriteVisivel = false
let velocidadeProjetil = 0
let energiaTiro = 0
let podeAtirar = false
let velocidadeInimigo = 0
let direcao = 0
let nivel = 0
nivel = 1
direcao = 1
velocidadeInimigo = 30
podeAtirar = true
energiaTiro = 5
velocidadeProjetil = 220
spriteVisivel = true
direcaoTiroInimigo = 1
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
let imagemJogadorEsquerda = img`
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
imagemInimigoNivel1 = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . f f f . . . . . . . . 
    . . . f f c c c f f . . . . . . 
    . . f c c c c c c c f . . . . . 
    . f c c c c c c c c c f . . . . 
    . f c c c c c c c c c f . . . . 
    f c f d f c f d f c c c f . . . 
    f c f d f c f d f c c c f . . . 
    f c c c c c c c c c c c c f . . 
    f c c c c c c c c c c c c f . . 
    . f f c c c c c c c f f f . . . 
    . . . f f f f f f f . . . . . . 
    `
imagemInimigoNivel2 = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f f f f . . . . . 
    . . . . . . f d d d d f . . . . 
    . . f . . f d d d d d d f . . . 
    . f 1 f . f d d d d d d f . . . 
    . f 1 f . f d f d f d d f . . . 
    . f 1 f . f d d d d d f f f . . 
    . f 1 f . . f d f d d f b b f . 
    . f 1 f . f d f d f f b e e b f 
    f e e e f d f d d d d b e d b f 
    . f d f d f . f d f f b e d b f 
    . f d f f f f d f d f b e e b f 
    . . f f . f d f . f d f b b f . 
    . . . . . f b f . . f b f f . . 
    . . . . . . . . . . . . . . . . 
    `
imagemInimigoNivel3 = img`
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
imagemInimigoFerido = img`
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
imagemInimigoAereo = img`
    . . . f . . . . . . . . f . . . 
    . . f d f . . . . . . f d f . . 
    . . f d d f f f f f f d d f . . 
    . . . f d d d c c d d d f . . . 
    . . f f f d 2 c c 2 d f f . . . 
    . . f c f c 2 c c 2 c f c f . . 
    . f c c f c c c c c c f c c f . 
    . f c c c f c c c c f c c c f . 
    f c c c b f f c c f f b c c c f 
    f c c c b f c c c c f b c c c f 
    f c c b c c c c c c c c b c c f 
    f c b b c c c c c c c c b c c f 
    . f b c c f c c c c f c c b f . 
    . . f c f . f c c f . f c f . . 
    . . . f . . f b b f . . f . . . 
    . . . . . . . f f . . . . . . . 
    `
imagemInimigoAtirador = img`
    . f f f f . . . . f f f f f f . 
    f f c c a f . f f c c c c c c f 
    f a a c f . f c c c c c c c c f 
    f a a e f f c f f f f c c f c f 
    f c e f f c f f f f f f c f f . 
    f e f . f c f f f f f f c f . . 
    f e f f c f 2 2 f 2 2 f c f . . 
    f e f f c f 2 2 f 2 2 f c f . . 
    f e f f c f f f f f f f c c f . 
    f e c c c c c f f f f c c c c f 
    f d d c c f e e 5 e e f f d d f 
    f d d f f f e e 5 e e f f d d f 
    f e f . f c b b c b c c f f f . 
    f e f f c b b b c b b c c f . . 
    f e f c b b b c c c b b c c f . 
    . f . f f f f f f f f f f f . . 
    `
imagemProjetilInimigo = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . 2 4 4 2 . . . . . . . 
    . . . . 2 4 4 4 4 2 . . . . . . 
    . . . 2 4 4 5 5 4 4 2 . . . . . 
    . . . 2 4 5 5 5 5 4 2 . . . . . 
    . . . . 2 4 5 5 4 2 . . . . . . 
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
imagemBandeiraNivel1 = img`
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
imagemBandeiraNivel2 = img`
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
imagemBandeiraNivel3 = img`
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
imagemItemVida = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . f e e e e f . . . . . 
    . . . . . . f 1 1 f . . . . . . 
    . . . . . . f 1 1 f . . . . . . 
    . . . . . . f 1 1 f . . . . . . 
    . . . . . . f d d f . . . . . . 
    . . . . f f 1 d d d f f . . . . 
    . . . f d d 1 2 2 2 d d f . . . 
    . . f d 2 1 1 2 2 2 2 2 d f . . 
    . . f d 2 1 2 2 2 2 2 2 d f . . 
    . . f d 2 1 2 2 2 2 2 2 d f . . 
    . . f d 2 1 2 2 2 2 2 2 d f . . 
    . . . f d 2 2 2 2 2 2 d f . . . 
    . . . f d d d d d d d d f . . . 
    . . . . f f f f f f f f . . . . 
    `
imagemItemEstrela = img`
    . . . . . . . f f . . . . . . . 
    . . . . . . f 5 5 f . . . . . . 
    . . . . . f 5 5 5 4 f . . . . . 
    . . . . . f 5 5 5 4 f . . . . . 
    f f f f f 5 5 5 5 5 4 f f f f f 
    f 5 5 5 5 5 5 5 5 5 4 4 4 4 4 f 
    . f 5 5 5 5 5 5 5 5 5 5 4 4 f . 
    . . f 5 5 5 5 5 5 5 5 4 4 f . . 
    . . . f 5 5 5 5 5 5 5 4 f . . . 
    . . . f 5 5 5 5 5 5 5 5 f . . . 
    . . f 5 5 5 5 5 5 5 5 5 4 f . . 
    . . f 5 5 5 5 4 4 5 5 5 4 f . . 
    . . f 5 5 5 4 f f 4 4 4 5 f . . 
    . f 5 5 4 f f . . f f 4 4 4 f . 
    . f 4 4 f . . . . . . f 4 4 f . 
    . . f f . . . . . . . . f f . . 
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
imagemEnergia5 = img`
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
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    4 5 5 4 5 5 5 5 5 5 5 5 4 5 5 5 
    4 4 5 5 4 4 4 4 5 5 5 4 4 5 4 4 
    4 4 5 4 5 4 5 4 4 5 4 4 5 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    `
let imagemPlataformaDeserto = img`
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    4 4 4 4 4 5 4 4 4 4 4 4 4 4 4 5 
    5 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    5 5 5 5 5 5 5 5 5 5 5 5 4 4 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 4 4 4 4 4 4 4 4 5 5 5 5 5 5 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 5 4 4 4 4 4 4 5 4 4 4 4 4 4 4 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 4 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 4 4 5 5 5 5 5 5 5 5 5 
    5 4 4 4 4 4 4 4 4 4 4 4 4 5 4 4 
    4 4 4 4 4 4 4 4 4 4 4 5 4 4 4 4 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
    5 4 4 5 4 4 4 4 4 4 5 5 5 5 5 5 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    `
let imagemDecoracaoDeserto = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 5 5 . . . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . 5 5 5 4 4 5 5 . . . . . 
    . . . 5 5 5 4 4 4 5 5 5 . . . . 
    . . . 5 5 4 4 4 4 4 5 5 . . . . 
    . . . . 5 5 4 4 4 5 5 . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
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
    2 2 2 5 5 5 2 2 2 5 5 5 5 2 2 5 
    2 4 2 4 4 2 2 5 2 2 2 4 2 2 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    f f f 2 f f f f f f 2 f f f f f 
    f f f 5 f f f f f f f 2 f f f f 
    f f 2 5 f f f f f f 2 5 2 2 f f 
    f 2 5 f f f f f f f 2 f f 2 f f 
    f 5 f f f f f 2 5 2 2 f f 5 5 f 
    2 5 2 f f f f 5 5 f f f 2 2 5 2 
    2 5 f f f f f f 2 2 f f f f f f 
    f f f f f f f f f 2 f f f f f f 
    f f f f f f 2 f f f f f f 2 5 5 
    f f f f 5 5 2 f f f f f 2 5 5 2 
    f f f f 5 5 f f f f f f 2 5 2 f 
    f f f f 2 f f f f f f f f f 2 2 
    `
let imagemPlataformaSubmundo = img`
    f f f f f f 2 f f f f 5 5 2 f f 
    f f f f f f 2 5 5 f f 2 5 f f f 
    f 2 2 2 f f f 2 5 2 f f 2 2 f f 
    2 5 5 2 f f f f f f f f f 2 2 f 
    f 2 5 5 2 f f f f f f f f f 5 5 
    f f 2 5 5 2 f f f f f f f 2 5 5 
    f f f f 2 2 2 f f f f f 2 2 f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f 2 5 2 f f f f 
    f f f f f 2 f f f 2 2 f f f f f 
    f f f 5 5 2 f f f f 5 5 f f f f 
    f 2 5 5 2 2 f f f f 2 5 5 2 2 2 
    2 2 5 2 f f f f f f f 5 5 5 5 f 
    f f 2 2 f f 2 2 f f 2 2 2 2 f f 
    f f f f f f 2 5 f f 2 f f f f f 
    f f f f f f 2 f f f 2 f f f f f 
    `
let imagemDecoracaoSubmundo = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . 2 4 4 2 . . . . . . . 
    . . . . 2 4 4 4 4 2 . . . . . . 
    . . . 2 4 4 5 5 4 4 2 . . . . . 
    . . . 2 4 5 5 5 5 4 2 . . . . . 
    . . . . 2 4 5 5 4 2 . . . . . . 
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
jogador = sprites.create(imagemJogadorDireita, SpriteKind.Player)
scene.setBackgroundColor(9)
info.setLife(3)
info.setScore(0)
controller.moveSprite(jogador, 110, 0)
jogador.ay = 480
scene.cameraFollowSprite(jogador)
imagensEnergia = [
imagemEnergia0,
imagemEnergia1,
imagemEnergia2,
imagemEnergia3,
imagemEnergia4,
imagemEnergia5
]
criarIndicadorEnergia()
atualizarEnergia()
carregarNivel()
game.onUpdate(function () {
    atualizarTempos()
    for (let inimigoAtual of sprites.allOfKind(SpriteKind.Enemy)) {
        protegerBuraco(inimigoAtual)
    }
    for (let inimigoAtual2 of sprites.allOfKind(SpriteKind.InimigoFerido)) {
        protegerBuraco(inimigoAtual2)
    }
    for (let inimigoAtual3 of sprites.allOfKind(SpriteKind.InimigoAtirador)) {
        protegerBuraco(inimigoAtual3)
    }
    if (jogador.vx > 0) {
        jogador.setImage(imagemJogadorDireita)
        direcao = 1
    } else if (jogador.vx < 0) {
        jogador.setImage(imagemJogadorEsquerda)
        direcao = -1
    }
    if (jogador.y > 150) {
        aplicarDano("buraco")
    }
})
game.onUpdateInterval(12000, function () {
    criarAmeacaDinamica()
})
game.onUpdateInterval(2000, function () {
    if (energiaTiro < 5) {
        energiaTiro += 1
        atualizarEnergia()
    }
})
game.onUpdateInterval(1500, function () {
    for (let atiradorAtual of sprites.allOfKind(SpriteKind.InimigoAtirador)) {
        atirarInimigo(atiradorAtual)
    }
})
