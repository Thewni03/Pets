import React, { useEffect, useState, useContext } from 'react'
import Nav from './Nav';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';


function Imgupload() {
    const { backendUrl, token } = useContext(AppContext);
    const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState([]); // Initialize as empty array instead of null
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitImg = async (e) => {
        e.preventDefault();
        setError(null);

        if (!image) {
            setError("Please select an image to upload");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("image", image);
            const result = await axios.post(
                `${backendUrl}/api/img/upload-img`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        token: token,
                    }
                }
            );
            getImage();
        } catch (error) {
            console.error("Error uploading image:", error);
            setError(error.response?.data?.message || "Failed to upload image");
        } finally {
            setLoading(false);
        }
    };

    const onImgChange = (e) => {
        setImage(e.target.files[0]);
    };

    const getImage = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await axios.get(`${backendUrl}/api/img/get-img`, {
                headers: { token: token }
            });
            console.log("API response:", result.data);
            setAllImage(result.data?.data || []);
        } catch (e) {
            console.error("Error getting images:", e);
            setError(e.response?.data?.message || "Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    const removeImage = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await axios.delete(`${backendUrl}/api/img/delete-img/${id}`, {
                headers: { token: token }
            });
            getImage();
        } catch (error) {
            console.error("Error removing image:", error);
            setError(error.response?.data?.message || "Failed to remove image");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getImage();
        }
    }, [token]);

    return (
        <div>
            <Nav />
            <div className="max-w-6xl mx-auto p-5">
                <h1 className="text-center text-gray-800 text-4xl font-bold my-8">Photo Gallery</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
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
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md text-lg transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload Image'}
                    </button>
                </form>

                {loading && allImage.length === 0 ? (
                    <div className="text-center py-10">Loading images...</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5">
                        {allImage.length > 0 ? (
                            allImage.map((data) => (
                                <div key={data._id} className="relative flex flex-col items-center gap-3">
                                    <img
                                        src={`${backendUrl}/uploads/${data.image}`}
                                        alt="gallery"
                                        className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = '/placeholder-image.jpg'
                                        }}
                                    />
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-50"
                                        onClick={() => removeImage(data._id)}
                                        disabled={loading}
                                    >
                                        {loading ? 'Removing...' : 'Remove'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No images found. Upload some images to get started.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Imgupload;