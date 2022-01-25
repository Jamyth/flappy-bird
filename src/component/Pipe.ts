import Phaser from 'phaser';
import { Component } from './basic/Component';

interface PipeOptions {
    imageKey: string;
    speed: number;
    isUpsideDown: boolean;
    y: number;
}

export class Pipe extends Component<Phaser.GameObjects.Image> {
    static readonly PIPE_HEIGHT = 288;
    static readonly PIPE_WIDTH = 70;

    private imageKey: string;
    private speed: number;
    private x: number;
    private y: number;
    private isUpsideDown: boolean;

    constructor({ imageKey, speed, isUpsideDown, y }: PipeOptions) {
        super();
        this.imageKey = imageKey;
        this.speed = speed;
        this.x = 0;
        this.y = y;
        this.isUpsideDown = isUpsideDown;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    create(scene: Phaser.Scene): this {
        this.x = scene.scale.width + 10;
        const y = this.y ?? Phaser.Math.Between(scene.scale.height / 4, scene.scale.height - 50);
        this._gameObject = scene.physics.add.image(this.x, y, this.imageKey).setOrigin(0, 0);
        this._gameObject.displayHeight = Pipe.PIPE_HEIGHT;
        this._gameObject.displayWidth = Pipe.PIPE_WIDTH;

        if (this.isUpsideDown) {
            this._gameObject.flipY = true;
        }

        return this;
    }

    update(dt: number): void {
        this.x += this.speed * dt;
        this.gameObject.setX(this.x);
    }
}
