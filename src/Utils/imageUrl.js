import axios from 'axios';

// Image upload
export const imageUpload = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const { data } = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return data.data.display_url;
    } catch (error) {
        console.error('Image upload failed:', error);
        throw new Error('Image upload failed');
    }
};

