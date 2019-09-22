import fetch from 'node-fetch';

export async function deleteSnykProject({ orgId, projectId, token }) {
	const result = await fetch(
		`https://snyk.io/api/v1/org/${orgId}/project/${projectId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `token ${token}`,
			},
		}
	);

	return await result.json();
}
