import { State } from './State';
import { Text } from 'component/Text';

export class TitleState extends State {
    private title: Text;
    private enterText: Text;
    private enterKey: Phaser.Input.Keyboard.Key;

    enter(scene: Phaser.Scene, params?: object): void {
        this.title = new Text('Flappy Bird', 0, scene.scale.height * 0.3, true).create(scene);
        this.title.gameObject.setFontSize(35);

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
        this.enterKey.destroy();
    }

    update(dt: number): void {}

    render(): void {}
}
