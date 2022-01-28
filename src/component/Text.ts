import { Component } from './basic/Component';
import type Phaser from 'phaser';

export class Text extends Component<Phaser.GameObjects.Text> {
    private value: string;

    constructor(value: string | number, private x: number, private y: number, private isCenter: boolean = false) {
        super();
        this.value = `${value}`;
    }

    setText(value: string | number) {
        this.value = `${value}`;
    }

    create(scene: Phaser.Scene): this {
        const x = this.isCenter ? 0 : this.x;
        const textStyle: Phaser.Types.GameObjects.Text.TextStyle = this.isCenter
            ? {
                  fixedWidth: scene.scale.width,
                  align: 'center',
                  color: 'white',
              }
            : {};

        this._gameObject = scene.add.text(x, this.y, this.value, textStyle);
        return this;
    }

    update(dt: number): void {}

    render(): void {
        this.gameObject.setText(this.value);
    }
}
