import React from 'react';

const Uploader = ({ imageUrl, setImageUrl }) => {
  return (
    <div>
        <p>Image Uploader Mock</p>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="border p-2" />
        {imageUrl && <img src={imageUrl} alt="preview" className="h-16 w-16 mt-2" />}
    </div>
  );
};

export default Uploader;
