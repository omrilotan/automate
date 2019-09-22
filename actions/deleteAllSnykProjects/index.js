import pMap from 'p-map';
import { bail } from '../../lib/bail';
import { deleteSnykProject } from '../../lib/deleteSnykProject';
import { snykProjetcsList } from '../../lib/snykProjetcsList';

export async function deleteAllSnykProjects(config) {
	const orgId = await config.orgId;
	const token = await config.token;
	const confirmed = await bail('DELETE');

	if (!confirmed) { return 'Not executing'; }

	const projects = await snykProjetcsList({orgId, token});
	const ids = projects.map(({id}) => id);
	const { length } = ids;

	await pMap(
		ids,
		async projectId => await deleteSnykProject({orgId, token, projectId}),
		{
			concurrency: 5
		}
	)

	return `Deleted ${length} projects`;
}
