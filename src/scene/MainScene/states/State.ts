import type { StateMachine } from './StateMachine';
import type Phaser from 'phaser';

export abstract class State {
    protected scene: Phaser.Scene;
    protected stateMachine: StateMachine;

    setStateMachine(stateMachine: StateMachine) {
        this.stateMachine = stateMachine;
    }

    setScene(scene: Phaser.Scene) {
        this.scene = scene;
    }

    abstract enter(scene: Phaser.Scene, params?: object): void;
    abstract exit(): void;
    abstract update(dt: number): void;
    abstract render(): void;
}
