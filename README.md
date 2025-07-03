# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Social Insights Dashboard

A comprehensive React-based dashboard for analyzing social media performance across multiple platforms including Facebook, Instagram, LinkedIn, and YouTube.

## Features

### 📊 Analytics Dashboard
- **Summary Cards**: Key metrics including total posts, average engagement, total likes, and total shares
- **Engagement Rate Over Time**: Line chart showing engagement trends
- **Post Type Breakdown**: Pie chart displaying content type distribution
- **Top Posts**: Bar chart of highest performing posts by engagement

### 📱 Multi-Platform Support
- Filter data by platform (All, Facebook, Instagram, LinkedIn, YouTube)
- Platform-specific analytics and insights
- Unified dashboard view across all platforms

### 📄 PDF Export Functionality
The dashboard includes two types of PDF export options:

#### 1. Visual Dashboard Export
- **Component**: `PDFDownload`
- **Features**:
  - Captures the entire dashboard as a visual snapshot
  - Includes charts, graphs, and current data
  - Professional styling with title page and summary
  - Automatic filename generation with platform and date
  - High-quality image capture with proper scaling

#### 2. Detailed Analytics Report
- **Component**: `DetailedPDFReport`
- **Features**:
  - Comprehensive text-based report with tables
  - Executive summary with key metrics
  - Top 10 posts ranking table
  - Performance analysis and engagement distribution
  - Strategic recommendations
  - Professional formatting with multiple pages

## Installation

```bash
npm install
```

## Dependencies

### Core Dependencies
- `react`: ^19.1.0
- `react-dom`: ^19.1.0
- `recharts`: ^3.0.0 (for charts and graphs)
- `react-icons`: ^5.5.0 (for UI icons)

### PDF Export Dependencies
- `html2canvas`: For capturing dashboard screenshots
- `jspdf`: For PDF generation and formatting

## Usage

### Starting the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### PDF Export Usage

1. **Visual Dashboard Export**:
   - Click the blue "Download PDF" button in the top-right corner
   - The system will capture the current dashboard view
   - A PDF will be generated with the dashboard snapshot and summary
   - File will be saved as: `social-dashboard-{platform}-{date}.pdf`

2. **Detailed Report Export**:
   - Click the green "Detailed Report" button next to the download button
   - A comprehensive PDF report will be generated with:
     - Executive summary
     - Top 10 posts table
     - Performance analysis
     - Strategic recommendations
   - File will be saved as: `detailed-report-{platform}-{date}.pdf`

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx              # Main dashboard component
│   ├── PDFDownload.jsx            # Visual PDF export component
│   ├── DetailedPDFReport.jsx      # Detailed report component
│   ├── SummaryCards.jsx           # Key metrics cards
│   ├── ChartEngagementOverTime.jsx # Engagement trend chart
│   ├── ChartPostTypeBreakdown.jsx # Content type pie chart
│   ├── ChartTopPosts.jsx          # Top posts bar chart
│   ├── Sidebar.jsx                # Platform filter sidebar
│   └── PanelWrapper.jsx           # Chart container wrapper
├── data/
│   └── mockData.js                # Sample social media data
├── styles/
│   └── index.css                  # Global styles
└── utils/
    └── filters.js                 # Data filtering utilities
```

## Customization

### Adding New Platforms
1. Update the `platforms` array in `Dashboard.jsx`
2. Add corresponding data in `mockData.js`
3. Update filtering logic if needed

### Modifying PDF Reports
1. **Visual Export**: Edit `PDFDownload.jsx` to customize styling and content
2. **Detailed Report**: Modify `DetailedPDFReport.jsx` to add new sections or metrics

### Styling
The project uses Tailwind CSS for styling. Customize the design by modifying:
- Component className attributes
- `tailwind.config.js` for theme customization
- `src/styles/index.css` for global styles

## Browser Compatibility

The PDF export functionality works best in modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### PDF Generation Issues
- Ensure all charts are fully loaded before generating PDFs
- Check browser console for any JavaScript errors
- Verify that the dashboard content is visible and not hidden

### Performance
- Large datasets may take longer to process for PDF generation
- Consider implementing pagination for very large datasets
- The visual export captures the entire dashboard, so ensure it fits within reasonable dimensions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the PDF export functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
