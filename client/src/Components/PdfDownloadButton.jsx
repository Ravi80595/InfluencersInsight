// PdfDownloadButton.js

import React from 'react';
import html2pdf from 'html2pdf.js';
import { FaDownload } from "react-icons/fa6";


const PdfDownloadButton = ({ contentId, fileName }) => {
  const handleDownload = () => {
    const content = document.getElementById(contentId);

    html2pdf(content, {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };

  return (
    <button onClick={handleDownload}>
       <FaDownload />
    </button>
  );
};

export default PdfDownloadButton;
