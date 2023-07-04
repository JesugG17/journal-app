
export const fileUpload = async( file ) => {

    if (!file) throw new Error('the file is required');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dvwx1abhq/upload'

    const formData = new FormData();
    formData.append('upload_preset', 'journal-app');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        
        if (!resp.ok) throw new Error('A error has ocurred while the file was uploading');

        const { secure_url } = await resp.json();

        return secure_url;

    } catch (error) {
        throw new Error(error.message);
    }

}