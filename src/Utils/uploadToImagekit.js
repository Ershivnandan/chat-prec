import imagekitSetup from "../Config/imagekit.js";

const uploadToIMagekit = async(file)=>{
    try {
        if(!file){
            throw new Error("No file provided")
        }

        const uploadedFile = await imagekitSetup.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "/evaluation-chatapp"
        });

        return uploadedFile.url;
    } catch (error) {
        console.log(error.message)
    }
}

export default uploadToIMagekit;