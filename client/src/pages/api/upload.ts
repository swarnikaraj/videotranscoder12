import { NextApiRequest, NextApiResponse } from "next";

import https from "https";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import aws from "aws-sdk";
dotenv.config();
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
import S3 from 'aws-sdk/clients/s3';

function getPresignUrlPromiseFunction(s3: aws.S3, s3Params: { Bucket: string | undefined; Key: any; ContentType: string; Expires: number; }): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      await s3.getSignedUrl('putObject', s3Params, function (err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    } catch (error) {
      return reject(error);
    }
  });
}


export default async function generateSignedBucketUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    aws.config.update({
      region: "us-east-1",
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey
    });
    let fileName = req.body.data.slug
    console.log(req.body, "mai req.body hu")
    const s3 = new S3();
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: 'video/mp4',
      Expires: 3600,
    };
    const presignedUrl = await getPresignUrlPromiseFunction(s3, s3Params);

    res.status(200).json({ presignedUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate presigned URL' });
  }

}



