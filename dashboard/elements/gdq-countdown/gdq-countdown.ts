import {ITimeInput} from '../time-input/time-input';
import {Countdown} from '../../../src/types/schemas/countdown';
import {CountdownRunning} from '../../../src/types/schemas/countdownRunning';

window.addEventListener('load', () => {
	const {customElement} = Polymer.decorators;
	const countdownRunning = nodecg.Replicant<CountdownRunning>('countdownRunning');
	const countdown = nodecg.Replicant<Countdown>('countdown');

	@customElement('gdq-countdown')
	class GdqCountdown extends Polymer.Element {
		ready() {
			super.ready();

			countdown.on('change', newVal => {
				if (newVal) {
					const timeInput = this.$.timeInput as ITimeInput;
					timeInput.setMS(newVal.minutes, newVal.seconds);
				}
			});

			countdownRunning.on('change', newVal => {
				if (newVal) {
					this.$.countdownContainer.setAttribute('disabled', 'true');
					this.$.start.setAttribute('disabled-running', 'true');
					this.$.stop.removeAttribute('disabled');
				} else {
					this.$.countdownContainer.removeAttribute('disabled');
					this.$.start.removeAttribute('disabled-running');
					this.$.stop.setAttribute('disabled', 'true');
				}

				this.checkStartButton();
			});
		}

		start() {
			nodecg.sendMessage('startCountdown', (this.$.timeInput as ITimeInput).value);
		}

		stop() {
			nodecg.sendMessage('stopCountdown');
		}

		_handleTimeInvalidChanged(e: Event) {
			if ((e as any).detail && (e as any).detail.value) {
				this.$.start.setAttribute('disabled-invalid', 'true');
			} else {
				this.$.start.removeAttribute('disabled-invalid');
			}

			this.checkStartButton();
		}

		/**
		 * Enables or disables the timer start button based on some criteria.
		 */
		checkStartButton() {
			if (this.$.start.hasAttribute('disabled-invalid') || this.$.start.hasAttribute('disabled-running')) {
				this.$.start.setAttribute('disabled', 'true');
			} else {
				this.$.start.removeAttribute('disabled');
			}
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqCountdown = GdqCountdown;
});