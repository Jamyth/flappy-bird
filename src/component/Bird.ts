import { Component } from './basic/Component';
import type Phaser from 'phaser';

interface BirdOptions {
    imageKey: string;
    gravity: number;
}

export class Bird extends Component<Phaser.GameObjects.Image> {
    private imageKey: string;
    private dy: number;
    private gravity: number;
    private x: number;
    private y: number;

    constructor({ imageKey, gravity }: BirdOptions) {
        super();
        this.imageKey = imageKey;
        this.gravity = gravity;
        this.dy = 0;
    }

    setDy(dy: number) {
        this.dy = dy;
    }

    create(scene: Phaser.Scene): this {
        this.x = scene.scale.width / 2;
        this.y = scene.scale.height / 2;
        this._gameObject = scene.add.image(this.x, this.y, this.imageKey);
        return this;
    }

    update(dt: number): void {
        this.dy = this.dy + this.gravity * dt;
        this.gameObject.setY(this.gameObject.y + this.dy);
    }
}
