const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const envToInt = (val, def = 100) => {
    const res = parseInt(val, 10);
    if (isNaN(res)) return def;
    else if (res < 0) return def;
    else return res;
}

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const extractUrl = async (file, folderName) => {
    let imageUrl = '';
    const { filename: image } = file;
    const resizedpath = path.resolve(file.destination, image + "_resized_" + Date.now());
    const maxSize = envToInt(process.env.IMAGE_MAX_SIZE, 500);

    await sharp(file.path)
        .resize(maxSize, maxSize, { fit: sharp.fit.inside, withoutEnlargement: true })
        // .jpeg({ quality: 90 })
        .toFile(resizedpath)
    fs.unlinkSync(file.path);
    const { url } = await cloudinary.uploader.upload(resizedpath, { folder: folderName });
    imageUrl = url;
    return imageUrl;
}
module.exports = { extractUrl }