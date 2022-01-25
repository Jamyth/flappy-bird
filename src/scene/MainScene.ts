import Phaser from 'phaser';
import { Scene } from 'component/basic/Scene';
import { ParallaxImage } from 'component/ParallaxImage';
import { Bird } from 'component/Bird';
import { Pipe } from 'component/Pipe';
import { PipePair } from 'component/PipePair';
import { AssetKey } from 'util/AssetKey';

export class MainScene extends Scene {
    private background: ParallaxImage;
    private ground: ParallaxImage;
    private bird: Bird;
    private spaceKey: Phaser.Input.Keyboard.Key;
    private spawnTimer: number;
    private pipes: PipePair[];
    private lastY: number;
    private isScrolling: boolean;

    constructor() {
        super('MainScene');
    }

    preload(scene: Phaser.Scene): void {
        this.load.image(AssetKey.BACKGROUND, 'background.png');
        this.load.image(AssetKey.GROUND, 'ground.png');
        this.load.image(AssetKey.BIRD, 'bird.png');
        this.load.image(AssetKey.PIPE, 'pipe.png');
    }

    init(scene: Phaser.Scene, data: object): void {
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spawnTimer = 2;
        this.pipes = [];
        this.lastY = -Pipe.PIPE_HEIGHT + Phaser.Math.Between(0, 80) + 20;
        this.isScrolling = true;
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

        this.bird = new Bird({
            imageKey: AssetKey.BIRD,
            gravity: 20,
        }).create(this);
        this.bird.gameObject.setScale(0.1).setDepth(10);

        this.physics.add.existing(this.ground.gameObject, true);
        this.physics.add.existing(this.bird.gameObject);

        this.spaceKey.on('down', () => {
            this.bird.setDy(-5);
        });
    }

    update(time: number, delta: number): void {
        if (this.isScrolling) {
            const _delta = delta / 1000;
            this.spawnTimer += _delta;
            this.background.update(_delta);
            this.ground.update(_delta);
            this.bird.update(_delta);
            this.updatePipes(_delta);

            if (this.spawnTimer >= 2.5) {
                this.spawnTimer = 0;
                const min = -Pipe.PIPE_HEIGHT + 10;
                const max = this.scale.height - 80 - Pipe.PIPE_HEIGHT;
                this.lastY = Phaser.Math.Clamp(this.lastY + Phaser.Math.Between(-40, 40), min, max);
                this.createPipe();
            }

            this.detectCollision();
        }
    }

    private createPipe() {
        const pair = new PipePair({ y: this.lastY }).create(this);
        this.pipes.push(pair);
    }

    private updatePipes(dt: number) {
        const pipes = this.pipes.map((pair) => {
            if (pair.isDestroyed) {
                return;
            }
            pair.update(dt);
            return pair;
        });
        this.pipes = pipes.filter((_): _ is PipePair => _ !== undefined);
    }

    private detectCollision() {
        const onCollide = () => {
            this.isScrolling = false;
        };

        this.pipes.forEach((pair) => {
            const pipes = pair.getPipes();
            pipes.forEach((pipe) => {
                this.physics.collide(this.bird.gameObject, pipe.gameObject, onCollide);
            });
        });
        this.physics.collide(this.bird.gameObject, this.ground.gameObject, onCollide);
    }
}
