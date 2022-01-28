import { State } from './State';

export type StateMap = { [key: string]: State };

export class StateMachine<T extends StateMap = StateMap> {
    static readonly emptyState: State = new (class extends State {
        enter(params?: object): void {}
        exit(): void {}
        update(dt: number): void {}
        render(): void {}
    })();

    private readonly stateMap: T;
    private currentState: State;
    private currentKey: string;

    constructor(private scene: Phaser.Scene, stateMap: T) {
        this.stateMap = stateMap;
        this.currentState = StateMachine.emptyState;
        this.currentKey = 'empty';
        Object.values(stateMap).forEach((state) => {
            state.setStateMachine(this);
            state.setScene(scene);
        });
    }

    change(key: string, params?: object) {
        this.assert(key);
        console.info(`[StateMachine]: change state: ${this.currentKey} -> ${key}`);
        this.currentKey = key;
        this.currentState.exit();
        this.currentState = this.stateMap[key];
        this.currentState.enter(this.scene, params);
    }

    update(dt: number) {
        this.currentState.update(dt);
    }

    render() {
        this.currentState.render();
    }

    private assert(stateKey: string) {
        if (!this.stateMap[stateKey]) {
            throw new Error(`[StateMachine]: state with key "${stateKey}" is not defined.`);
        }
    }
}
