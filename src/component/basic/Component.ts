export abstract class Component<T = never> {
    protected _gameObject: T;

    get gameObject() {
        return this._gameObject;
    }

    abstract create(scene: Phaser.Scene): this;
    abstract update(dt: number): void;
}
