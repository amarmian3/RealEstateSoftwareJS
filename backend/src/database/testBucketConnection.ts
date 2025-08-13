// src/testS3Upload.ts
import 'dotenv/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createReadStream } from 'fs';
import path from 'path';

const bucket = 'rentrrbucket';
const region = process.env.AWS_S3_REGION!;
const file = path.resolve('src/database/databaseMockDataCSV/images/listing1.jpeg');
const key = `test-upload/${path.basename(file)}`;

(async () => {
  const s3 = new S3Client({ region, credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  }});

  await s3.send(new PutObjectCommand({
    Bucket: bucket, Key: key, Body: createReadStream(file), ContentType: 'image/jpeg'
  }));
  console.log('✅ Uploaded:', key);

  // view it (works even if bucket is private)
  const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: 300 });
  console.log('🔗 5-min download URL:', url);
})();
