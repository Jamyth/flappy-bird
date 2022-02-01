import type Phaser from 'phaser';
import { Scene } from 'component/basic/Scene';
import { ParallaxImage } from 'component/ParallaxImage';
import { AssetKey } from 'util/AssetKey';
import { StateMachine } from './states/StateMachine';
import { TitleState } from './states/TitleState';
import { CountdownState } from './states/CountdownState';
import { PlayState } from './states/PlayState';
import { GameOverState } from './states/GameOverState';
import { Text } from 'component/Text';

export class MainScene extends Scene {
    private background: ParallaxImage;
    private ground: ParallaxImage;
    private fpsText: Text;
    private stateMachine: StateMachine;

    constructor() {
        super('MainScene');
    }

    preload(scene: Phaser.Scene): void {
        this.load.image(AssetKey.BACKGROUND, 'background.png');
        this.load.image(AssetKey.GROUND, 'ground.png');
        this.load.image(AssetKey.BIRD, 'bird.png');
        this.load.image(AssetKey.PIPE, 'pipe.png');
        this.load.audio(AssetKey.MUSIC, 'music.wav');
        this.load.audio(AssetKey.JUMP, 'jump.wav');
        this.load.audio(AssetKey.SCORE, 'score.wav');
        this.load.audio(AssetKey.DEATH, 'death.wav');
        this.load.audio(AssetKey.COUNT, 'count.wav');
        this.load.audio(AssetKey.START, 'start.wav');
    }

    create(scene: Phaser.Scene, data: object): void {
        this.background = new ParallaxImage({
            imageKey: AssetKey.BACKGROUND,
            loopingPoint: 413,
            speed: -30,
        }).create(this);
        this.background.gameObject.setOrigin(0, 0).setDepth(0);

        this.ground = new ParallaxImage({
            imageKey: AssetKey.GROUND,
            loopingPoint: 400,
            speed: -60,
            y: this.scale.height,
        }).create(this);
        this.ground.gameObject.setOrigin(0, 1).setDepth(5);

        this.physics.add.existing(this.ground.gameObject);

        this.fpsText = new Text(Math.floor(this.game.loop.actualFps), this.scale.width - 40, 10).create(this);
        this.fpsText.gameObject.setColor('#00ff00');

        this.stateMachine = new StateMachine(this, {
            title: new TitleState(),
            countdown: new CountdownState(),
            play: new PlayState(this.ground),
            gameOver: new GameOverState(),
        });

        this.stateMachine.change('title');

        this.sound.play(AssetKey.MUSIC, { loop: true, volume: 0.03 });
    }

    update(time: number, delta: number): void {
        const _delta = delta / 1000;
        this.background.update(_delta);
        this.ground.update(_delta);
        this.fpsText.setText(Math.floor(this.game.loop.actualFps));

        this.stateMachine.update(_delta);

        this.stateMachine.render();

        this.background.render();
        this.ground.render();
        this.fpsText.render();
    }
}
