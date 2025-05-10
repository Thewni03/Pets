import React, { useEffect, useState } from 'react';
import Nav from '../../components/Components/Nav';
import axios from 'axios';

function UploadFiles() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allPdf, setAllPdf] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    try {
      const result = await axios.get("http://localhost:4000/api/files/");
      setAllPdf(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!title || title.length < 3) {
      validationErrors.title = "Title must be at least 3 characters long.";
    }

    if (!file) {
      validationErrors.file = "Please select a PDF file to upload.";
    } else if (file.type !== "application/pdf") {
      validationErrors.file = "Only PDF files are allowed.";
    } else if (file.size > 5 * 1024 * 1024) {
      validationErrors.file = "File size must be less than 5MB.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const submitPdf = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:4000/api/files/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (result.data.status === 200) {
        alert("Upload successful!");
        setTitle("");
        setFile(null);
        getpdf();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Files</h1>
          
          <form onSubmit={submitPdf} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PDF Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select PDF File:</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.file ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Upload PDF
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded PDFs</h2>
          <ul className="space-y-3">
            {allPdf.length > 0 ? (
              allPdf.map((pdf, index) => (
                <li 
                  key={index} 
                  className="bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors duration-200"
                >
                  <a
                    href={`http://localhost:4000/uploads/${pdf.pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {pdf.title}
                  </a>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No PDFs uploaded yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UploadFiles;