import inquirer from 'inquirer';

const { prompt } = inquirer;

/**
 * Safety Verification
 * @param  {String} [phrase]
 * @return {Boolean}
 *
 * @example
 * if (await bail()) { return 'Not executing'; }
 */
export async function bail(phrase) {
	const { verification } = await prompt([
		{
			name: 'verification',
			message: phrase
				? `please type in "${phrase}"`
				: `Are you sure?`,
			type: phrase ? 'input' : 'confirm',
		}
	]);

	return phrase
		? verification === phrase
		: verification
	;
}
