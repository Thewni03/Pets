import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DisplayPdf({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page on new file load
  }

  console.log("PDF File URL:", pdfFile); // ✅ Debugging log

  return (
    <div>
      {pdfFile ? (
        <>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
          
          <p>
            Page {pageNumber} of {numPages}
          </p>

          <div>
            <button 
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pageNumber <= 1}
            >
              Previous
            </button>
            <button 
              onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
              disabled={pageNumber >= numPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>PDF file not available</p>
      )}
    </div>
  );
}

export default DisplayPdf;
