import jsPDF from 'jspdf';
import logoImg from '../assets/logo.jpg';
import newWatermark from '../assets/image-removebg-preview (58).png';

export const generatePDF = async (quoteData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Load images
    const loadImage = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
        });
    };

    try {
        const logo = await loadImage(logoImg);
        const watermark = await loadImage(newWatermark);

        // Add watermark (behind everything) - more visible
        const watermarkSize = 140;
        const watermarkX = (pageWidth - watermarkSize) / 2;
        const watermarkY = (pageHeight - watermarkSize) / 2;
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.3 }));
        doc.addImage(watermark, 'PNG', watermarkX, watermarkY, watermarkSize, watermarkSize);
        doc.restoreGraphicsState();

        // Header section with logo and motto
        const logoWidth = 40;
        const logoHeight = 30;
        doc.addImage(logo, 'JPEG', 20, 15, logoWidth, logoHeight);
        
        // Company name and motto
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('ROAMING NOMADS TOURS & TRAVEL', 70, 25);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text('Your Adventure Awaits', 70, 35);
        
        // Divider line
        doc.setLineWidth(0.5);
        doc.line(20, 50, pageWidth - 20, 50);

        // Title
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('TRAVEL QUOTATION', 20, 65);
        
        // Quote details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        let y = 80;
        doc.text(`Quote ID: ${quoteData.id}`, 20, y);
        y += 10;
        doc.text(`Client Name: ${quoteData.clientName}`, 20, y);
        y += 10;
        doc.text(`Phone Number: ${quoteData.phoneNumber}`, 20, y);
        y += 10;
        doc.text(`Destination: ${quoteData.destination}`, 20, y);
        y += 10;
        doc.text(`Travel Dates: ${quoteData.dateFrom} to ${quoteData.dateTo}`, 20, y);
        y += 10;
        doc.text(`Adults: ${quoteData.adults}`, 20, y);
        y += 10;
        doc.text(`Kids: ${quoteData.kids}`, 20, y);
        y += 20;
        
        // Pricing section
        doc.setFont('helvetica', 'bold');
        doc.text('PRICING DETAILS:', 20, y);
        y += 10;
        
        doc.setFont('helvetica', 'normal');
        
        // Only show prices for checked services - no currency symbols in details
        if (quoteData.includeActivities && quoteData.prices.activities > 0) {
            doc.text(`Activities: ${quoteData.prices.activities.toFixed(2)}`, 25, y);
            y += 8;
        }
        if (quoteData.includeAccommodation && quoteData.prices.accommodation > 0) {
            doc.text(`Accommodation: ${quoteData.prices.accommodation.toFixed(2)}`, 25, y);
            y += 8;
        }
        if (quoteData.includeMeals && quoteData.prices.meals > 0) {
            doc.text(`Meals: ${quoteData.prices.meals.toFixed(2)}`, 25, y);
            y += 8;
        }
        if (quoteData.includeTransportation && quoteData.prices.transportation > 0) {
            doc.text(`Transportation: ${quoteData.prices.transportation.toFixed(2)}`, 25, y);
            y += 8;
        }
        if (quoteData.professionalGuide && quoteData.prices.professionalGuide > 0) {
            doc.text(`Professional Guide: ${quoteData.prices.professionalGuide.toFixed(2)}`, 25, y);
            y += 8;
        }
        if (quoteData.parkFees && quoteData.prices.parkFees > 0) {
            doc.text(`Park Fees: ${quoteData.prices.parkFees.toFixed(2)}`, 25, y);
            y += 8;
        }

        y += 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        const total = quoteData.total;
        
        // Display total in selected currency
        if (quoteData.currency === 'KSH') {
            const kshTotal = total * (quoteData.exchangeRate || 130);
            doc.text(`TOTAL: KSH ${kshTotal.toFixed(2)}`, 20, y);
            y += 8;
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`(USD $${total.toFixed(2)} @ 1 USD = ${quoteData.exchangeRate || 130} KSH)`, 20, y);
        } else {
            doc.text(`TOTAL: $${total.toFixed(2)}`, 20, y);
            y += 8;
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            const kshTotal = total * (quoteData.exchangeRate || 130);
            doc.text(`(KSH ${kshTotal.toFixed(2)} @ 1 USD = ${quoteData.exchangeRate || 130} KSH)`, 20, y);
        }

        // Payment Information Section - Better spacing
        y += 25;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PAYMENT INFORMATION', 20, y);
        
        // Payment box with border
        const paymentBoxY = y + 8;
        doc.setLineWidth(0.3);
        doc.rect(20, paymentBoxY, pageWidth - 40, 32);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('M-PESA Paybill:', 25, paymentBoxY + 8);
        doc.setFont('helvetica', 'bold');
        doc.text('542542', 80, paymentBoxY + 8);
        
        doc.setFont('helvetica', 'normal');
        doc.text('Account Number:', 25, paymentBoxY + 16);
        doc.setFont('helvetica', 'bold');
        doc.text('019940', 80, paymentBoxY + 16);
        
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.text('Send payment confirmation to: tours@roamingnomads.co.ke or WhatsApp +254 740 596 771', 25, paymentBoxY + 26);

        // Divider line before footer - positioned higher to make room
        const footerStartY = paymentBoxY + 35;
        doc.setLineWidth(0.5);
        doc.line(20, footerStartY, pageWidth - 20, footerStartY);

        // Footer with contact information - compact layout
        const footerContentY = footerStartY + 5;

        // Left side - Contact Information (compact)
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('CONTACT INFORMATION', 20, footerContentY);
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text('Email: tours@roamingnomads.co.ke', 20, footerContentY + 8);
        doc.text('Phone: +254 740 596 771', 20, footerContentY + 15);
        doc.text('Phone: +254 794 183 530', 20, footerContentY + 22);
        doc.text('WhatsApp: +254 794 183 530', 20, footerContentY + 29);

        // Right side - Office Address (compact)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text('OFFICES', pageWidth - 75, footerContentY);
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text('Salama House, 3rd Floor, Suite 305', pageWidth - 75, footerContentY + 8);
        doc.text('Wabera Street, Nairobi, Kenya', pageWidth - 75, footerContentY + 15);
        doc.text('Nairobi, Kenya', pageWidth - 75, footerContentY + 22);

        // Terms and conditions line at the bottom
        doc.setFontSize(6);
        doc.setFont('helvetica', 'italic');
        const termsY = pageHeight - 8;
        const termsText = 'All bookings are subject to Roaming Nomads Tours & Travel terms and conditions';
        const textWidth = doc.getTextWidth(termsText);
        const centerX = (pageWidth - textWidth) / 2;
        doc.text(termsText, centerX, termsY);

        doc.save(`Travel_Quote_${quoteData.id}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        // Fallback to simple PDF if images fail to load
        generateSimplePDF(doc, quoteData);
    }
};

// Fallback function for simple PDF without images
const generateSimplePDF = (doc, quoteData) => {
    doc.setFontSize(20);
    doc.text('Travel Quotation', 20, 20);
    doc.setFontSize(12);
    let y = 40;
    doc.text(`Quote ID: ${quoteData.id}`, 20, y);
    y += 10;
    doc.text(`Client Name: ${quoteData.clientName}`, 20, y);
    y += 10;
    doc.text(`Phone Number: ${quoteData.phoneNumber}`, 20, y);
    y += 10;
    doc.text(`Destination: ${quoteData.destination}`, 20, y);
    y += 10;
    doc.text(`Travel Dates: ${quoteData.dateFrom} to ${quoteData.dateTo}`, 20, y);
    y += 10;
    doc.text(`Adults: ${quoteData.adults}`, 20, y);
    y += 10;
    doc.text(`Kids: ${quoteData.kids}`, 20, y);
    y += 20;
    
    doc.text('Pricing Details:', 20, y);
    y += 10;

    Object.entries(quoteData.prices).forEach(([service, price]) => {
        doc.text(`${service}: $${price.toFixed(2)}`, 20, y);
        y += 10;
    });

    const total = quoteData.total;
    doc.text(`Total: $${total.toFixed(2)}`, 20, y);
    
    doc.save(`Travel_Quote_${quoteData.id}.pdf`);
};