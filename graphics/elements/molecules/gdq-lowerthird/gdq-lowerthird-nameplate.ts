import {Power2, TimelineLite, TweenLite} from 'gsap';
import AtomNameplate from '../../atoms/atom-nameplate/atom-nameplate';

const ENTRANCE_ANIM_DURATION = 0.5;
const ENTRANCE_ANIM_EASE = Power2.easeInOut;
const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-lowerthird-nameplate')
export default class GdqLowerthirdNameplate extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true})
	header: boolean = false;

	@property({type: String, observer: GdqLowerthirdNameplate.prototype._nameChanged})
	name: string;

	@property({type: String})
	title: string;

	@property({type: Boolean, reflectToAttribute: true, computed: '_computeHasTitle(title)'})
	hasTitle: boolean;

	enter() {
		const tl = new TimelineLite();

		tl.to(this.$.occluder, ENTRANCE_ANIM_DURATION, {
			x: '250%',
			ease: ENTRANCE_ANIM_EASE
		}, 0);

		tl.to(this.$.clipped, ENTRANCE_ANIM_DURATION, {
			clipPath: 'inset(0 0% 0 0)',
			ease: ENTRANCE_ANIM_EASE
		}, 0);

		tl.to(this.$.title, 0.4, {
			y: '0%',
			ease: Power2.easeOut,
			onStart: () => {
				(this.$.title as HTMLDivElement).style.opacity = '1';
				(this.$['title-text'] as any).maxWidth = this.$.title.clientWidth - 60;
			}
		}, '-=0.1');

		return tl;
	}

	reset() {
		TweenLite.set(this.$.occluder, {x: '-100%'});
		TweenLite.set(this.$.clipped, {clipPath: 'inset(0 100% 0 0)'});
		TweenLite.set(this.$.title, {y: '-100%', opacity: 0});
	}

	_nameChanged(newVal: string) {
		return (this.$.nameplate as AtomNameplate).updateName({alias: newVal, rotate: false});
	}

	_computeHasTitle(title: string) {
		return Boolean(title && title.trim().length > 0);
	}
}
