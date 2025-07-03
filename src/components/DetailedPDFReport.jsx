import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import { FiFileText } from 'react-icons/fi';

const DetailedPDFReport = ({ data, activePlatform }) => {
  const downloadRef = useRef(null);

  const generateDetailedPDF = async () => {
    try {
      // Show loading state
      if (downloadRef.current) {
        downloadRef.current.disabled = true;
        downloadRef.current.innerHTML = 'Generating Report...';
      }

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Title page
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, 210, 50, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Social Media Analytics Report', 105, 25, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Platform: ${activePlatform}`, 105, 35, { align: 'center' });
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 42, { align: 'center' });

      // Reset text color
      pdf.setTextColor(0, 0, 0);
      
      // Executive Summary
      pdf.addPage();
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Executive Summary', 20, 30);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      // Calculate metrics
      const totalPosts = data.length;
      const totalLikes = data.reduce((sum, post) => sum + post.likes, 0);
      const totalComments = data.reduce((sum, post) => sum + post.comments, 0);
      const totalShares = data.reduce((sum, post) => sum + post.shares, 0);
      const avgEngagement = data.length > 0 ? 
        (data.reduce((sum, post) => sum + post.engagement_rate, 0) / data.length).toFixed(2) : 0;
      
      const metrics = [
        { label: 'Total Posts', value: totalPosts },
        { label: 'Total Likes', value: totalLikes.toLocaleString() },
        { label: 'Total Comments', value: totalComments.toLocaleString() },
        { label: 'Total Shares', value: totalShares.toLocaleString() },
        { label: 'Average Engagement Rate', value: `${avgEngagement}%` }
      ];
      
      let yPos = 45;
      metrics.forEach(metric => {
        pdf.text(`${metric.label}: ${metric.value}`, 20, yPos);
        yPos += 8;
      });

      // Top Posts Table
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Top 10 Posts by Engagement', 20, 30);
      
      // Sort posts by engagement rate
      const sortedPosts = [...data].sort((a, b) => b.engagement_rate - a.engagement_rate).slice(0, 10);
      
      // Table headers
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Rank', 20, 50);
      pdf.text('Title', 35, 50);
      pdf.text('Date', 120, 50);
      pdf.text('Engagement', 150, 50);
      pdf.text('Likes', 180, 50);
      
      // Table content
      pdf.setFont('helvetica', 'normal');
      let tableY = 60;
      sortedPosts.forEach((post, index) => {
        if (tableY > 270) {
          pdf.addPage();
          tableY = 20;
        }
        
        const title = post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title;
        
        pdf.text(`${index + 1}`, 20, tableY);
        pdf.text(title, 35, tableY);
        pdf.text(post.post_date, 120, tableY);
        pdf.text(`${post.engagement_rate}%`, 150, tableY);
        pdf.text(post.likes.toLocaleString(), 180, tableY);
        
        tableY += 8;
      });

      // Platform Performance Analysis
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Performance Analysis', 20, 30);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      // Engagement distribution
      const highEngagement = data.filter(post => post.engagement_rate > 5).length;
      const mediumEngagement = data.filter(post => post.engagement_rate > 2 && post.engagement_rate <= 5).length;
      const lowEngagement = data.filter(post => post.engagement_rate <= 2).length;
      
      yPos = 45;
      pdf.text('Engagement Distribution:', 20, yPos);
      yPos += 8;
      pdf.text(`High Engagement (>5%): ${highEngagement} posts`, 30, yPos);
      yPos += 6;
      pdf.text(`Medium Engagement (2-5%): ${mediumEngagement} posts`, 30, yPos);
      yPos += 6;
      pdf.text(`Low Engagement (<2%): ${lowEngagement} posts`, 30, yPos);
      
      // Post type analysis
      yPos += 15;
      const postTypes = {};
      data.forEach(post => {
        postTypes[post.post_type] = (postTypes[post.post_type] || 0) + 1;
      });
      
      pdf.text('Post Type Distribution:', 20, yPos);
      yPos += 8;
      Object.entries(postTypes).forEach(([type, count]) => {
        pdf.text(`${type}: ${count} posts`, 30, yPos);
        yPos += 6;
      });

      // Recommendations
      pdf.addPage();
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recommendations', 20, 30);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      const recommendations = [
        'Focus on content types that generate higher engagement rates',
        'Post consistently to maintain audience engagement',
        'Analyze top-performing posts to identify successful content patterns',
        'Consider optimal posting times based on engagement data',
        'Monitor and respond to comments to boost engagement'
      ];
      
      yPos = 45;
      recommendations.forEach((rec, index) => {
        pdf.text(`${index + 1}. ${rec}`, 20, yPos);
        yPos += 10;
      });

      // Save the PDF
      const timestamp = new Date().toISOString().split('T')[0];
      const platformName = activePlatform.toLowerCase().replace(/\s+/g, '-');
      const fileName = `detailed-report-${platformName}-${timestamp}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating detailed PDF:', error);
      alert('Error generating detailed report. Please try again.');
    } finally {
      // Reset button state
      if (downloadRef.current) {
        downloadRef.current.disabled = false;
        downloadRef.current.innerHTML = '<FiFileText className="w-4 h-4 mr-2" />Detailed Report';
      }
    }
  };

  return (
    <button
      ref={downloadRef}
      onClick={generateDetailedPDF}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ml-2"
      title="Generate detailed PDF report with analytics"
    >
      <FiFileText className="w-4 h-4 mr-2" />
      Detailed Report
    </button>
  );
};

export default DetailedPDFReport; 