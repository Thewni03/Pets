import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
// import QRCode from 'qrcode';

const generatePDF = async (appointment) => {
    const doc = new jsPDF();

    // Title
    doc.setFont('Outfit', 'bold');
    doc.setFontSize(22);
    doc.text('PetUniverse - Appointment Details', 105, 20, { align: 'center' });

    // Appointment Info Table
    autoTable(doc, {
        startY: 30,
        head: [['Label', 'Details']],
        body: [
            ['ID', appointment?.id],
            ['Owner Name', appointment?.ownerName],
            ['Pet Name', appointment?.petName],
            ['Doctor', appointment?.doctor],
            ['Date', appointment?.date],
            ['Time', appointment?.time],
            ['Fees', `${appointment?.fees}`],
        ],
        theme: 'grid',
        styles: { font: 'Outfit' }, 
        headStyles: { fillColor: [135, 206, 250] }, // Sky Blue Header
        columnStyles: { 0: { fontStyle: 'bold' } },
    });

    // Generate QR Code
    // const qrCodeData = `https://yourwebsite.com/appointment/${appointment?.id}`;
    // const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    // Add QR Code
    // doc.text('Scan for Appointment Details:', 105, doc.lastAutoTable.finalY + 15, { align: 'center' });
    // doc.addImage(qrCodeImage, 'PNG', 90, doc.lastAutoTable.finalY + 20, 30, 30);

    // Save PDF
    doc.save(`Appointment_${appointment?.id}.pdf`);
};

export default generatePDF;
