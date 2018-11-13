import {Run} from '../../../../src/types';
import GdqRuninfoCategory from './gdq-runinfo-category';
import GdqRuninfoMisc from './gdq-runinfo-misc';

const {customElement, property} = Polymer.decorators;
const currentRun = nodecg.Replicant<Run>('currentRun');

@customElement('gdq-runinfo')
export default class GdqRuninfo extends Polymer.Element {
	@property({type: Number})
	maxNameSize: number = 45;

	@property({type: Boolean, reflectToAttribute: true})
	forceSingleLineName: boolean = false;

	@property({type: String})
	estimate: string;

	@property({type: String})
	releaseYear: string;

	@property({type: String})
	console: string;

	@property({type: String})
	category: string;

	@property({type: String})
	name: string = '?';

	private initialized: boolean = false;

	ready() {
		super.ready();
		Polymer.RenderStatus.afterNextRender(this, () => {
			currentRun.on('change', this.currentRunChanged.bind(this));
		});
	}

	currentRunChanged(newVal: Run) {
		this.name = newVal.name;
		this.category = newVal.category;
		this.console = newVal.console;
		this.releaseYear = String(newVal.releaseYear) || '20XX';
		this.estimate = newVal.estimate;

		// Avoids some issues that can arise on the first time that fitText is run.
		// Currently unsure why these issues happen.
		if (this.initialized) {
			this.fitText();
		} else {
			Polymer.RenderStatus.afterNextRender(this, this.fitText);
			this.initialized = true;
		}
	}

	fitText() {
		Polymer.flush();
		(window as any).textFit(this.$.name, {maxFontSize: this.maxNameSize});
		(this.$.category as GdqRuninfoCategory).maxTextWidth = this.clientWidth - 76;
		(this.$.misc as GdqRuninfoMisc).maxTextWidth = (this.clientWidth - 124) / 3;
	}

	_processName(name?: string) {
		if (!name) {
			return '&nbsp;';
		}

		if (this.forceSingleLineName) {
			return `<div class="name-line">${name.replace('\\n', ' ')}</div>`;
		}

		return name.split('\\n')
			.map(lineText => `<div class="name-line">${lineText}</div>`)
			.join('\n');
	}
}