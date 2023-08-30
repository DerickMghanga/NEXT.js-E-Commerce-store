import multiparty from 'multiparty';
import fs from 'fs';  //file system library used to grab the Content uploaded ie image/photo
import mime from 'mime-types';  //Read file types being uploaded

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';  //AWS upload to S3-Bucket
const bucketName = 'next.js-e-commerce';  //from AWS S3 Bucket created


export default async function handleUpload(req, res) {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
    console.log('length:', files.file.length);

    const client = new S3Client({ //access our AWS S3 bucket
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        },
    });

    const links = [];   //incase we upload more than one image of a product
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop(); //get the extention from the originalFile name using split() & pop() ie 'hello.jpg'
        const newFilename = Date.now() + '.' + ext;  // create unique name for each file after upload using the time stamp
        // console.log({ ext, file });

        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),   //read the file path
            ACL: 'public-read',   //file to be public available or read
            ContentType: mime.lookup(file.path),   //get and assign the file type before upload
        }));

        //Grab the link of the file save in the bucket
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);  //Add each file link to the links array
    }
    
    return res.json({ links }); //return the links as response to uploadImages fxn >>> ProductForm.js
}

//tell Next.js not to parse the request to json, I'm parsing it on my owm
export const config = {
    api: {bodyParser: false},

};