import inquirer from 'inquirer';
const { prompt } = inquirer;

const config = {};

const configMap = {
	token: 'SNYK_USER_TOKEN',
	orgId: 'SNYK_ORG_ID',
};

async function getEnvVariable(name) {
	const key = configMap[name];
	const existing = process.env[key];

	if (existing) {
		return existing;
	}

	const { value } = await prompt([
		{
			name: 'value',
			message: `${name} (${key})`,
			type: 'password',
			mask: '*',
		}
	]);

	process.env[name] = value;

	return value;
}

const descriptor = Object.keys(configMap).reduce(
	(descriptor, key) => Object.assign(
		descriptor,
		{
			[key]: {
				get: async() => await getEnvVariable(key)
			}
		}
	),
	{}
)

Object.defineProperties(
	config,
	descriptor
);

export { config };
