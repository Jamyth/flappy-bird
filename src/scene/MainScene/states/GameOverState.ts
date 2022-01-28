import { State } from './State';
import { Text } from 'component/Text';

export class GameOverState extends State {
    private title: Text;
    private scoreText: Text;
    private enterText: Text;
    private enterKey: Phaser.Input.Keyboard.Key;

    enter(scene: Phaser.Scene, params: { score: number }): void {
        this.title = new Text('Game Over', 0, scene.scale.height * 0.3, true).create(scene);
        this.title.gameObject.setFontSize(35);

        this.scoreText = new Text(`Your Score: ${params.score}`, 0, scene.scale.height / 2 - 10, true).create(scene);

        this.enterText = new Text('Press Enter to Start', 0, scene.scale.height / 2 + 20, true).create(scene);
        this.enterText.gameObject.setFontSize(13);

        this.enterKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.enterKey.on('down', () => {
            this.stateMachine.change('countdown');
        });
    }

    exit(): void {
        this.title.gameObject.destroy();
        this.enterText.gameObject.destroy();
        this.scoreText.gameObject.destroy();
        this.enterKey.destroy();
    }

    update(dt: number): void {}

    render(): void {}
}
