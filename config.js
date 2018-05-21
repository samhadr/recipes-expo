export default {
  s3: {
    REGION: "us-west-1",
    BUCKET: "recipes upload"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://8d5woxfqk1.execute-api.us-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_NmrFcr4N2",
    APP_CLIENT_ID: "1dgmhuuoc8461br7qj3hs6m4ul",
    IDENTITY_POOL_ID: "us-west-2:d892347d-7fba-4714-9fc3-2d8ca58b383c"
  }
};