import inquirer from 'inquirer';
import pMap from 'p-map';
import { deleteSnykProject } from '../../lib/deleteSnykProject';
import { snykProjetcsList } from '../../lib/snykProjetcsList';

const { prompt } = inquirer;

export async function deleteSnykProjectByName(config) {
	const orgId = await config.orgId;
	const token = await config.token;
	const { repo } = await prompt([
		{
			name: 'repo',
			message: 'Please enter repository name',
			type: 'input',
		}
	]);

	const projects = await snykProjetcsList({orgId, token});
	const matches = projects.filter(
		({name}) => name.toLowerCase().includes(repo.toLowerCase())
	);

	switch (matches.length) {
		case 0:
			return `I couldn't find a project whose name contains "${repo}"`;
		case 1:
			{
				const [{name, id}] = matches;

				const { sure } = await prompt([
					{
						name: 'sure',
						message: `Are you sure you want to delete ${name}?`,
						type: 'confirm',
					}
				]);
				if (sure) {
					await deleteSnykProject({orgId, token, projectId: id});
					return `Deleted project ${name}`;
				} else {
					return 'Aborted';
				}
			}
		default:
			{
				const { selected } = await prompt([
					{
						name: 'selected',
						message: `Which project is it? There are ${matches.length}, you can pick more than one.`,
						type: 'checkbox',
						choices: matches.map(
							({name, id: value}) => ({ name, value })
						)
					}
				]);

				await pMap(
					selected,
					async projectId => await deleteSnykProject({orgId, token, projectId}),
					{
						concurrency: 5
					}
				);

				return `Deleted ${selected.length} projects`;
			}
	}
}
