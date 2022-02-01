import { Component } from './basic/Component';
import type { Pipe } from './Pipe';
import type Phaser from 'phaser';

interface BirdOptions {
    imageKey: string;
    gravity: number;
}

export class Bird extends Component<Phaser.GameObjects.Image> {
    private imageKey: string;
    private dy: number;
    private dAngle: number;
    private gravity: number;
    private x: number;
    private y: number;

    constructor({ imageKey, gravity }: BirdOptions) {
        super();
        this.imageKey = imageKey;
        this.gravity = gravity;
        this.dy = 0;
        this.dAngle = 0;
    }

    setDy(dy: number) {
        this.dy = dy;
    }

    setDAngle(dAngle: number) {
        this.dAngle = dAngle;
    }

    create(scene: Phaser.Scene): this {
        this.x = scene.scale.width / 2;
        this.y = scene.scale.height / 2;
        this._gameObject = scene.physics.add.image(this.x, this.y, this.imageKey);

        return this;
    }

    /**
     * AABB Collision Detection
     */
    onCollideWith(pipe: Pipe) {
        const offsetTopLeft = 2;
        const offsetBottomRight = 4;

        const scaledWidth = this.gameObject.width * this.gameObject.scale;
        const scaledHeight = this.gameObject.height * this.gameObject.scale;
        const x = this.gameObject.x - scaledWidth / 2;
        const y = this.gameObject.y - scaledHeight / 2;
        if (
            x + offsetTopLeft + (scaledWidth - offsetBottomRight) >= pipe.getX() &&
            x + offsetTopLeft <= pipe.getX() + pipe.gameObject.width &&
            y + offsetTopLeft + (scaledHeight - offsetBottomRight) >= pipe.getY() &&
            y + offsetTopLeft <= pipe.getY() + pipe.gameObject.height
        ) {
            return true;
        }
        return false;
    }

    update(dt: number): void {
        this.dy = this.dy + this.gravity * dt;
        this.y = this.gameObject.y + this.dy;
        this.dAngle = this.dAngle + 90 * dt;
    }

    render(): void {
        this.gameObject.setY(this.y);
        this.gameObject.setAngle(this.dAngle);
    }
}
