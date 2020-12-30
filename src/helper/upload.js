

export const fileUpload = async (cover) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/jeluchez-devdor/upload';

    const formData = new FormData();
    formData.append('upload_preset','beek-test');
    formData.append('file', cover);

    try {
        const res = await fetch(cloudUrl,{
            method:'POST',
            body: formData
        });

        if (res.ok) {
            const cloudRes = await res.json();
            return cloudRes.secure_url
        }
        else{
            throw await res.json();
        }
    } catch (error) {
        throw error;
    }
}