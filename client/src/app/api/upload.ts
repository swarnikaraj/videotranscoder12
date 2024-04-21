import { NextApiRequest, NextApiResponse } from "next";
import AWS from 'aws-sdk';

export default async function generateSignedBucketUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   region: process.env.AWS_REGION,
  // });

  // const params = {
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: `uploads/${Date.now()}_${Math.floor(Math.random() * 1000)}.mp4`,
  //   ContentType: 'video/mp4',
  //   ACL: 'public-read',
  //   Expires: 300,
  // };

  try {
    // const presignedUrl = await s3.getSignedUrlPromise('putObject', params);
    let presignedUrl = "Hello world"
    res.status(200).json({ presignedUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate presigned URL' });
  }

}
