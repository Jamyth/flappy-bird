import { Bird } from 'component/Bird';
import type { ParallaxImage } from 'component/ParallaxImage';
import { Pipe } from 'component/Pipe';
import { PipePair } from 'component/PipePair';
import { Text } from 'component/Text';
import { AssetKey } from 'util/AssetKey';
import { State } from './State';

export class PlayState extends State {
    private bird: Bird;
    private spaceKey: Phaser.Input.Keyboard.Key;
    private pipes: PipePair[];
    private lastY: number;
    private spawnTimer: number;
    private ground: ParallaxImage;
    private score: number;
    private scoreText: Text;

    constructor(ground: ParallaxImage) {
        super();
        this.ground = ground;
    }

    enter(scene: Phaser.Scene, params?: object): void {
        this.bird = new Bird({
            imageKey: AssetKey.BIRD,
            gravity: 20,
        }).create(scene);
        this.bird.gameObject.setScale(0.1).setDepth(10);

        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceKey.on('down', () => {
            this.bird.setDy(-5);
            this.bird.setDAngle(-45);
            this.scene.sound.play(AssetKey.JUMP, { volume: 0.04 });
        });

        this.score = 0;
        this.scoreText = new Text(`Score: ${this.score}`, 20, 20, false).create(scene);
        this.scoreText.gameObject.setDepth(10);

        this.spawnTimer = 2;

        this.pipes = [];
        this.lastY = -Pipe.PIPE_HEIGHT + Phaser.Math.Between(0, 80) + 20;
    }

    exit(): void {
        this.bird.gameObject.destroy();
        this.pipes.forEach((_) => _.destroy());
        this.scoreText.gameObject.destroy();
    }

    update(dt: number): void {
        this.spawnTimer += dt;
        this.bird.update(dt);
        this.updatePipes(dt);

        if (this.spawnTimer >= 2.5) {
            this.spawnTimer = 0;
            const min = -Pipe.PIPE_HEIGHT + 10;
            const max = this.scene.scale.height - 80 - Pipe.PIPE_HEIGHT;
            this.lastY = Phaser.Math.Clamp(this.lastY + Phaser.Math.Between(-40, 40), min, max);
            this.createPipe(this.scene);
        }

        this.detectCollision();
    }

    render(): void {
        this.bird.render();
        this.scoreText.render();
        this.pipes.forEach((_) => _.render());
    }

    private createPipe(scene: Phaser.Scene) {
        const pair = new PipePair({ y: this.lastY }).create(scene);
        this.pipes.push(pair);
    }

    private updatePipes(dt: number) {
        const pipes = this.pipes.map((pair) => {
            if (pair.isDestroyed) {
                return;
            }
            pair.update(dt);

            if (pair.getPipes()[0].getX() + Pipe.PIPE_WIDTH <= this.bird.gameObject.x && !pair.getIsScored()) {
                this.score += 1;
                this.scoreText.setText(`Score: ${this.score}`);
                this.scene.sound.play(AssetKey.SCORE, { volume: 0.15 });
                pair.setIsScored(true);
            }

            return pair;
        });
        this.pipes = pipes.filter((_): _ is PipePair => _ !== undefined);
    }

    private detectCollision() {
        const onCollide = () => {
            this.scene.sound.play(AssetKey.DEATH);
            this.stateMachine.change('gameOver', { score: this.score });
        };

        this.pipes.forEach((pair) => {
            const pipes = pair.getPipes();
            pipes.forEach((pipe) => {
                if (this.bird.onCollideWith(pipe)) {
                    onCollide();
                }
            });
        });
        this.scene.physics.collide(this.bird.gameObject, this.ground.gameObject, onCollide);
    }
}
