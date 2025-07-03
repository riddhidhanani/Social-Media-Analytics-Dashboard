import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FiDownload } from 'react-icons/fi';
import { Button } from 'react-bootstrap';

const PDFDownload = ({ dashboardRef, data, activePlatform }) => {
  const downloadRef = useRef(null);

  const generatePDF = async () => {
    if (!dashboardRef.current) return;

    try {
      // Show loading state
      if (downloadRef.current) {
        downloadRef.current.disabled = true;
        downloadRef.current.innerHTML = 'Generating PDF...';
      }

      // Capture the dashboard content
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f9fafb',
        width: dashboardRef.current.scrollWidth,
        height: dashboardRef.current.scrollHeight,
        logging: false,
        removeContainer: true,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Add title page with better styling
      pdf.setFillColor(59, 130, 246); // Blue background
      pdf.rect(0, 0, 210, 40, 'F');
      
      pdf.setTextColor(255, 255, 255); // White text
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Social Insights Dashboard Report', 105, 25, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 35, { align: 'center' });
      
      // Reset text color for content
      pdf.setTextColor(0, 0, 0);
      
      // Add report details
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Report Summary', 20, 60);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      const yStart = 75;
      let yOffset = 0;
      
      pdf.text(`Platform: ${activePlatform}`, 20, yStart + yOffset);
      yOffset += 8;
      
      pdf.text(`Total Posts: ${data.length}`, 20, yStart + yOffset);
      yOffset += 8;
      
      // Calculate engagement metrics
      const totalEngagement = data.reduce((sum, post) => sum + post.engagement_rate, 0);
      const avgEngagement = data.length > 0 ? (totalEngagement / data.length).toFixed(2) : 0;
      pdf.text(`Average Engagement Rate: ${avgEngagement}%`, 20, yStart + yOffset);
      yOffset += 8;
      
      // Calculate total likes, comments, shares
      const totalLikes = data.reduce((sum, post) => sum + post.likes, 0);
      const totalComments = data.reduce((sum, post) => sum + post.comments, 0);
      const totalShares = data.reduce((sum, post) => sum + post.shares, 0);
      
      pdf.text(`Total Likes: ${totalLikes.toLocaleString()}`, 20, yStart + yOffset);
      yOffset += 8;
      pdf.text(`Total Comments: ${totalComments.toLocaleString()}`, 20, yStart + yOffset);
      yOffset += 8;
      pdf.text(`Total Shares: ${totalShares.toLocaleString()}`, 20, yStart + yOffset);
      yOffset += 8;
      
      // Top performing post
      const topPost = data.reduce((max, post) => 
        post.engagement_rate > max.engagement_rate ? post : max, data[0] || {}
      );
      
      if (topPost.title) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Top Performing Post:', 20, yStart + yOffset + 10);
        yOffset += 15;
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const title = topPost.title.length > 50 ? topPost.title.substring(0, 50) + '...' : topPost.title;
        pdf.text(`Title: ${title}`, 20, yStart + yOffset);
        yOffset += 6;
        pdf.text(`Engagement Rate: ${topPost.engagement_rate}%`, 20, yStart + yOffset);
        yOffset += 6;
        pdf.text(`Date: ${topPost.post_date}`, 20, yStart + yOffset);
      }

      // Add dashboard image on new page
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF with descriptive filename
      const timestamp = new Date().toISOString().split('T')[0];
      const platformName = activePlatform.toLowerCase().replace(/\s+/g, '-');
      const fileName = `social-dashboard-${platformName}-${timestamp}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      // Reset button state
      if (downloadRef.current) {
        downloadRef.current.disabled = false;
        downloadRef.current.innerHTML = '<FiDownload className="w-4 h-4 mr-2" />Download PDF';
      }
    }
  };

  return (
    <Button variant='primary'
      ref={downloadRef}
      onClick={generatePDF}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      title="Download dashboard as PDF report"
    >
      <FiDownload className="w-4 h-4 mr-2" />
      Download PDF
    </Button>
  );
};

export default PDFDownload; 