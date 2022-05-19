import aws from 'aws-sdk';
import dotenv from "dotenv"

dotenv.config()


aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEYID,
    region: 'us-east-1' // region of your bucket
});

const s3 = new aws.S3();

const upload= async (options:{Bucket:string, key:string, Body:string, ContentType:string,data:string}) => {
      await s3
      .putObject({
        Bucket:"officedbfiles",
        Key: options.key,
        Body: Buffer.from(options.data, "base64"),
        ContentType: "image/jpeg",
      })
      .promise()
      .catch(err=>{
        console.log(err.message)
      });
    return {
      url: `https://officedbfiles.s3.amazonaws.com/${options.key}`,
      name: options.key,
    };
};
export default upload
