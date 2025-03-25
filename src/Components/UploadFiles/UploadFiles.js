import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './UploadFiles.css';
import DisplayPdf from './DisplayPdf';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function UploadFiles() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allPdf, setAllPdf] = useState([]);
  const [pdfFile, setPDFFile] = useState(null);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    try {
      const result = await axios.get("http://localhost:5008/getFile");
      setAllPdf(result.data.data);
      console.log("Fetched PDFs:", result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const submitPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:5008/uploadfile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (result.data.status === 200) {
        alert("Upload successful!");
        setTitle("");
        setFile(null);
        getpdf(); // Refresh the list of PDFs
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Error uploading file.");
    }
  };

  const showPdf = (pdf) => {
    const fileUrl = `http://localhost:5008/files/${pdf}`;
    console.log("Opening PDF:", fileUrl);
    setPDFFile(fileUrl);
  };

  return (
    <div>
      <Nav />
      <div className="upload-container">
        <h1>Upload Files</h1>
        
        <form className="upload-form" onSubmit={submitPdf}>
          <div>
            <label>PDF Title:</label>
            <input 
              className="input-field"
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          <div>
            <label>Select PDF File:</label>
            <input 
              className="input-field"
              type="file" 
              accept="application/pdf" 
              onChange={(e) => setFile(e.target.files[0])} 
              required 
            />
          </div>

          <div>
            <button className="upload-button" type="submit">Upload PDF</button>
          </div>
        </form>

        <div className="uploaded-files">
          <h2>Uploaded PDFs</h2>
          <ul>
            {allPdf.length > 0 ? (
              allPdf.map((pdf, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a 
                    href={`http://localhost:5008/files/${pdf.pdf}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {pdf.title}
                  </a>
                  <button onClick={() => showPdf(pdf.pdf)}>View</button>
                </li>
              ))
            ) : (
              <p>No PDFs uploaded yet.</p>
            )}
          </ul>
        </div>

        {pdfFile && <DisplayPdf pdfFile={pdfFile} />}
      </div>
      
    </div>
  );
}

export default UploadFiles;
