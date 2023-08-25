export default async function handleUpload(req, res) {

}

//tell Next.js not to parse the request to json, I'm parsing it on my owm
export const config = {
    api: {bodyParser: false},

};