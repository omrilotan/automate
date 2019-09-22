import inquirer from 'inquirer';
import { config } from './config';

const { prompt } = inquirer;

(async() => {
	const { action } = await prompt([
		{
			name: 'action',
			message: 'What function would you like to run?',
			type: 'list',
			choices: [
				{
					name: 'Delete a Snyk project by name',
					value: 'deleteSnykProjectByName',
				},
				{
					name: 'Delete all organisation projects at Snyk',
					value: 'deleteAllSnykProjects',
				},
			],
		}
	]);

	const feature = await import(`./actions/${action}`);

	console.log(
		await feature[action](config)
	);
})();
