import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const profileUpload = (req, res, next) => {
    console.log("Middleware started");
    const uploadPath = './public/uploads'
    if (req.files && req.files.profileimage) {
        const profileImage = req.files.profileimage;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extname = path.extname(profileImage.name);
        const filename = `profile_${uniqueSuffix}${extname}`;
        profileImage.mv(path.join(uploadPath, filename), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            req.profileimage = `/uploads/${filename}`;
            console.log("Middleware completed");
            next();
        });
    } else {
        console.log("No file uploaded");
        next();
    }
};

export default profileUpload;
