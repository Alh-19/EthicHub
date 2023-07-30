import React from 'react';
import jsPDF from 'jspdf';

const PDFButton = ({ chartRef }) => {
  const handleGeneratePDF = () => {
    const canvas = chartRef.current;
    const dataURL = canvas.toDataURL('image/jpeg', 1.0); // Higher quality image

    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const pdfWidth = 280; // PDF width in mm
    const pdfHeight = 150; // PDF height in mm
    const imageWidth = pdfWidth * 0.8; // Scale down image to fit in the PDF
    const imageHeight = (pdfHeight * imageWidth) / pdfWidth;
    const marginLeft = (pdfWidth - imageWidth) / 2;
    const marginTop = (pdfHeight - imageHeight) / 2;

    pdf.addImage(dataURL, 'JPEG', marginLeft, marginTop, imageWidth, imageHeight);
    pdf.save('chart.pdf');
  };

  return (
    <button className='download-pdf' onClick={handleGeneratePDF}>
      ↓ 
    </button>
  );
};

export default PDFButton;

