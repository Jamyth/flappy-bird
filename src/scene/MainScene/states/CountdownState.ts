import { Text } from 'component/Text';
import { State } from './State';

export class CountdownState extends State {
    private timer: number;
    private countdown: number;
    private interval: number;
    private countdownText: Text;

    enter(scene: Phaser.Scene, params?: object): void {
        this.timer = 0;
        this.countdown = 3;
        this.interval = 0.75;
        this.countdownText = new Text(this.countdown, 0, scene.scale.height / 2 - 20, true).create(scene);
        this.countdownText.gameObject.setFontSize(40);
    }

    exit(): void {
        this.countdownText.gameObject.destroy();
    }

    update(dt: number): void {
        this.timer += dt;

        if (this.timer >= this.interval) {
            this.timer = this.timer % this.interval;
            this.countdown -= 1;
            this.countdownText.setText(this.countdown);
        }

        if (this.countdown === 0) {
            this.stateMachine.change('play');
        }
    }

    render(): void {
        this.countdownText.render();
    }
}
