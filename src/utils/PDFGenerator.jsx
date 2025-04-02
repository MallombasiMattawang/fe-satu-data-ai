import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFGenerator = () => {
  const [pdf, setPdf] = useState(null);

  const generatePDF = () => {
    const pdf = new jsPDF();
    const page = document.getElementById('pdf-page');

    html2canvas(page).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      setPdf(pdf);
    });
  };

  const downloadPDF = () => {
    pdf.save('generated-pdf.pdf');
  };

  const data = [
    { title: 'Title 1', content: 'This is the content for title 1.' },
    { title: 'Title 2', content: 'This is the content for title 2.' },
    { title: 'Title 3', content: 'This is the content for title 3.' }
  ];

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
      {pdf && <button onClick={downloadPDF}>Download PDF</button>}

      <div id="pdf-page" style={{ padding: '20px', backgroundColor: '#fff' }}>
        <h1>Static Data for PDF</h1>
        {data.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFGenerator;
