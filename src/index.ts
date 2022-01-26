import Phaser from 'phaser';
import { MainScene } from 'scene/MainScene';

const WIDTH = 1280;
const HEIGHT = 720;

const VIRTUAL_WIDTH = 512;
const VIRTUAL_HEIGHT = 288;

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    title: 'Flappy Bird',
    scene: [MainScene],
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: VIRTUAL_WIDTH,
        height: VIRTUAL_HEIGHT,
    },
    parent: document.getElementById('container') ?? undefined,
};

new Phaser.Game(gameConfig);
