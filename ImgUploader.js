import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav';
import axios from 'axios';
import './ImgUploader.css';

function Imguploader() {
    const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState(null);
    const [error, setError] = useState(null);

    const submitImg = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const formData = new FormData();
            formData.append("image", image);
            const result = await axios.post(
                "http://localhost:5001/uploadImg",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            getImage();
        } catch (error) {
            console.error("Error uploading image:", error);
            setError("Failed to upload image. Please make sure the server is running.");
        }
    };

    const onImgChange = (e) => {
        setImage(e.target.files[0]);
    };

    const getImage = async () => {
        try {
            setError(null);
            const result = await axios.get("http://localhost:5001/getImage");
            setAllImage(result.data.data);
        } catch (e) {
            console.error("Error getting images:", e);
            setError("Failed to load images. Please make sure the server is running.");
        }
    };

    const removeImage = async (id) => {
        try {
            setError(null);
            await axios.delete(`http://localhost:5001/deleteImage/${id}`);
            getImage();
        } catch (error) {
            console.error("Error removing image:", error);
            setError("Failed to remove image. Please try again.");
        }
    };

    useEffect(() => {
        getImage();
    }, []);

    return (
        <div>
            <Nav />
            <div className="img-uploader-container">
                <h1 className="img-uploader-title">Photo Gallery</h1>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <form onSubmit={submitImg} className="upload-form">
                    <div className="file-input-container">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImgChange}
                            className="file-input"
                        />
                    </div>
                    <button type="submit" className="upload-button">
                        Upload Image
                    </button>
                </form>

                <div className="gallery-container">
                    {allImage === null
                        ? ""
                        : allImage.map((data) => (
                            <div key={data._id} className="gallery-item">
                                <img
                                    src={`http://localhost:5001/files/${data.image}`}
                                    alt="gallery"
                                    className="gallery-image"
                                />
                                <button
                                    className="remove-button"
                                    onClick={() => removeImage(data._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Imguploader