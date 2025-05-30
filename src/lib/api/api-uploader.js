export async function upLoadImage(file) {
    const url = 'https://api.cloudinary.com/v1_1/diajsawlz/image/upload'
    const data = new FormData();
    data.append('file', file)
    data.append('upload_preset', 'x2j9kuov')

    try{
        const res = await fetch(url, {
            method : 'POST',
            body : data,
        })

        if(!res.ok) {
            throw new Error("Image Upload Failed!")
        }

        const result = await res.json();
        return result;

    } catch(error) {
        console.log(error)
        return null;
    }
}