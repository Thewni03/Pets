import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DisplayPdf({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
      {pdfFile ? (
        <>
          <div className="border border-gray-200 rounded-md overflow-hidden mb-4">
            <Document 
              file={pdfFile} 
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="p-8 text-gray-500">Loading PDF...</div>}
              error={<div className="p-8 text-red-500">Failed to load PDF</div>}
            >
              <Page 
                pageNumber={pageNumber} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
                width={Math.min(window.innerWidth - 40, 800)}
                className="shadow-inner"
              />
            </Document>
          </div>
          
          <div className="flex items-center justify-between w-full max-w-md mb-4">
            <p className="text-gray-600">
              Page {pageNumber} of {numPages || '--'}
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
                className={`px-4 py-2 rounded-md ${
                  pageNumber <= 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}
              >
                Previous
              </button>
              <button
                onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
                disabled={pageNumber >= (numPages || 0)}
                className={`px-4 py-2 rounded-md ${
                  pageNumber >= (numPages || 0)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-gray-500 bg-white rounded-md shadow-sm">
          PDF file not available
        </div>
      )}
    </div>
  );
}

export default DisplayPdf;