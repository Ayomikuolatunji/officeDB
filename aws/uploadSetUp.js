const aws = require('aws-sdk');



 aws.config.update({
    secretAccessKey: "R838lSMO8uPqSXz7SDvraVql8rhFCdY2BZ+I544r",
    accessKeyId: "AKIAYEZ2SCIMCPEPOP7Z",
    region: 'eu-west-3' // region of your bucket
});

const s3 = new aws.S3();

const upload= async (options) => {
    await s3
      .putObject({
        Bucket:"college-sigunp-image",
        ACL: "public-read",
        Key: options.key,
        Body: Buffer.from(options.data, "base64"),
      })
      .promise();
    return {
      url: `https://college-sigunp-image.s3.amazonaws.com/${options.key}`,
      name: options.key,
    };
  };

  module.exports=upload