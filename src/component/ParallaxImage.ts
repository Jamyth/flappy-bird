import { Component } from './basic/Component';
import type Phaser from 'phaser';

interface ParallaxImageOptions {
    imageKey: string;
    speed: number;
    loopingPoint: number;
    y?: number;
}

export class ParallaxImage extends Component<Phaser.GameObjects.Image> {
    private imageKey: string;
    private speed: number;
    private loopingPoint: number;
    private scrollX: number;
    private y: number;

    constructor({ imageKey, speed, loopingPoint, y }: ParallaxImageOptions) {
        super();
        this.imageKey = imageKey;
        this.speed = speed;
        this.loopingPoint = loopingPoint;
        this.scrollX = 0;
        this.y = y ?? 0;
    }

    create(scene: Phaser.Scene): this {
        this._gameObject = scene.add.image(this.scrollX, this.y, this.imageKey);
        return this;
    }

    update(dt: number): void {
        this.scrollX = (this.scrollX + this.speed * dt) % this.loopingPoint;
        this.gameObject.setX(this.scrollX);
    }
}
