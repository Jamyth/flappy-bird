import { Pipe } from './Pipe';
import { Component } from './basic/Component';
import { AssetKey } from 'util/AssetKey';

interface PipePairOptions {
    y: number;
}

export class PipePair extends Component {
    static GAP_HEIGHT = 90;

    private topPipe: Pipe;
    private bottomPipe: Pipe;
    private isRemoved: boolean;
    private isScored: boolean;

    constructor({ y }: PipePairOptions) {
        super();
        this.topPipe = new Pipe({
            imageKey: AssetKey.PIPE,
            speed: -60,
            isUpsideDown: true,
            y,
        });
        this.bottomPipe = new Pipe({
            imageKey: AssetKey.PIPE,
            speed: -60,
            isUpsideDown: false,
            y: y + Pipe.PIPE_HEIGHT + PipePair.GAP_HEIGHT,
        });
        this.isRemoved = false;
    }

    getPipes() {
        return [this.topPipe, this.bottomPipe];
    }

    get isDestroyed() {
        return this.isRemoved;
    }

    getIsScored() {
        return this.isScored;
    }

    setIsScored(isScored: boolean) {
        this.isScored = isScored;
    }

    destroy() {
        this.topPipe.gameObject.destroy();
        this.bottomPipe.gameObject.destroy();
        this.isRemoved = true;
    }

    create(scene: Phaser.Scene): this {
        this.topPipe.create(scene);
        this.bottomPipe.create(scene);

        return this;
    }

    update(dt: number): void {
        if (this.topPipe.gameObject.x + this.topPipe.gameObject.width <= 0) {
            this.destroy();
        } else {
            this.topPipe.update(dt);
            this.bottomPipe.update(dt);
        }
    }

    render(): void {
        if (!this.isDestroyed) {
            this.topPipe.render();
            this.bottomPipe.render();
        }
    }
}
