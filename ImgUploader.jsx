import React, { useEffect, useState, useContext } from 'react'
import Nav from './Nav';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

function Imguploader() {
    const { backendUrl, token } = useContext(AppContext);
    const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState([]);
    const [error, setError] = useState(null);

    const submitImg = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const formData = new FormData();
            formData.append("image", image);

            const result = await axios.post(
                `${backendUrl}/api/pet/uploadImg`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        token: token
                    },
                }
            );

            console.log("Upload response:", result);

            getImage();

        } catch (error) {
            console.error("Full upload error:", {
                message: error.message,
            });
            setError(`Upload failed: ${error.message}`);
        }
    };

    const onImgChange = (e) => {
        setImage(e.target.files[0]);
    };

    const getImage = async () => {
        try {
            setError(null);

            const result = await axios.get(`${backendUrl}/api/pet/getImage`, {
                headers: { token }
            });

            if (result.data && result.data.data) {
                setAllImage(result.data.data);
                console.log("Images set:", result.data.data);
            } else {
                console.warn("Unexpected response format:", result.data);
                setAllImage([]);
                setError("No images found or invalid response format");
            }
        } catch (e) {
            console.error("Full fetch error:", {
                message: e.message,
            });
            setAllImage([]);
            setError(`Failed to load images: ${e.message}`);
        }
    };

    const removeImage = async (id) => {
        try {
            setError(null);
            await axios.delete(`${backendUrl}/api/pet/deleteImage/${id}`, {
                headers: { token }
            });
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
            <div className="max-w-6xl mx-auto p-5">
                <h1 className="text-center text-gray-800 text-4xl font-bold my-8">Photo Gallery</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={submitImg} className="bg-white p-8 rounded-lg shadow-lg mb-8 text-center">
                    <div className="mb-5">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImgChange}
                            className="p-3 border-2 border-dashed border-gray-300 rounded-md w-full max-w-md cursor-pointer hover:border-blue-500 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md text-lg transition-colors"
                    >
                        Upload Image
                    </button>
                </form>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5">
                    {allImage.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">
                            {error ? error : "No images found. Upload some images to get started!"}
                        </div>
                    ) : (
                        allImage.map((data) => (
                            <div key={data._id} className="relative flex flex-col items-center gap-3">
                                <img
                                    src={`${backendUrl}/uploads/petUploads/${encodeURIComponent(data.image)}`}
                                    alt="gallery"
                                />
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                                    onClick={() => removeImage(data._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Imguploader;