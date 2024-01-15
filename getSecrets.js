/**
 * This JavaScript code is released into the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
 * For more information, see https://creativecommons.org/publicdomain/zero/1.0/
 */

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

async function getSecrets(secretName, region) {
    const client = new SecretsManagerClient({ region });

    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: "AWSCURRENT",
            })
        );

        const secret = JSON.parse(response.SecretString);
        return {
            apiSecret: secret.apiSecret,
            apiKey: secret.apiKey,
            workspaceID: secret.workspaceID,
        };
    } catch (error) {
        console.error('Error fetching secrets from AWS Secrets Manager:', error);
        throw error;
    }
}

module.exports = getSecrets;

