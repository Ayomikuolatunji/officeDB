const aws = require('aws-sdk');
require("dotenv").config()


 aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEYID,
    region: process.env.REGION 
});

const s3 = new aws.S3();

const upload= async (options) => {
    await s3
      .putObject({
        Bucket:"officedbfiles",
        ACL: "public-read",
        Key: options.key,
        Body: Buffer.from(options.data, "base64"),
        ContentType: "image/jpeg",
      })
      .promise();
    return {
      url: `https://college-sigunp-image.s3.amazonaws.com/${options.key}`,
      name: options.key,
    };
  };

  module.exports=upload