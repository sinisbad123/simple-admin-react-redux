const identityPoolId = process.env.REACT_APP_AWS_IDENTITY_POOL_ID ?
    process.env.REACT_APP_AWS_IDENTITY_POOL_ID : '';

const region = process.env.REACT_APP_AWS_REGION ?
    process.env.REACT_APP_AWS_REGION : 'ap-northeast-1';

const userPoolId = process.env.REACT_APP_AWS_USER_POOL_ID ?
    process.env.REACT_APP_AWS_USER_POOL_ID : '';

const userPoolWebClientId = process.env.REACT_APP_AWS_USER_WEB_CLIENT_ID ?
    process.env.REACT_APP_AWS_USER_WEB_CLIENT_ID : '';

const config = {
    Auth: {
        identityPoolId: identityPoolId,
        region: region,
        userPoolId: userPoolId,
        userPoolWebClientId: userPoolWebClientId
    }
};

export default config;