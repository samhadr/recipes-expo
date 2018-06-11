export default {
  s3: {
    REGION: "us-west-1",
    BUCKET: "recipes-upload",
    MAX_FILE_SIZE: 5000000
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://avgz0lya8g.execute-api.us-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_NmrFcr4N2",
    APP_CLIENT_ID: "1dgmhuuoc8461br7qj3hs6m4ul",
    IDENTITY_POOL_ID: "us-west-2:845a24ac-6f02-4323-ac75-2f8b60e11e86"
  }
};