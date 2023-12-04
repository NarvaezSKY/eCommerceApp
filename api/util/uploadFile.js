import {ref,getDownloadURL,uploadBytesResumable} from 'firebase/storage'
import {storage} from '../config/firebase.js'
import sharp from 'sharp'

export const uploadFile= async(file)=>{
    console.log('llego a la funcion de uploadFile (firebase)')
        let fileBuffer = await sharp(file.buffer)
    .resize({ 
        width: 200, 
        height: 200, 
        fit: 'cover' 
    })
    .toBuffer();

    const fileRef = ref(storage, `/files/${file.originalname}_${Date.now()}`)

console.log(`file ref= ${fileRef}`)
const fileMetadata={
    contentType: file.mimetype
}
console.log(`file metadata= ${fileMetadata}`)
const fileUploadPromise = uploadBytesResumable(
    fileRef,
    fileBuffer,
    fileMetadata
)

await fileUploadPromise
console.log(`file upload promise= ${fileUploadPromise}`)

const fileDownloadURL=await getDownloadURL(fileRef)
console.log('Obtenido el URL de descarga');

return {ref:fileRef, downloadURL: fileDownloadURL}
}
        
