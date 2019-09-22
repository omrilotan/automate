import fetch from 'node-fetch';

export async function snykProjetcsList({orgId, token}) {
	const result = await fetch(
		`https://snyk.io/api/v1/org/${orgId}/projects`,
		{
			headers: {
				Authorization: `token ${token}`,
			},
		}
	);

	const { projects } = await result.json();

	return projects;
};
