import React from 'react';

const useGenerateImgLink = () => {
    const formData = new FormData();
    const imgbbKey = '8d5dfdf2da4e4f18afbf76c977833211';

    async function generateImgLink(data) {
        formData.append("image", data.photo[0]);
        return await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => data?.data?.url)
    }
    return { generateImgLink };
};

export default useGenerateImgLink;