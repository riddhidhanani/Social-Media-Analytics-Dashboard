import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGlobe,
} from 'react-icons/fa';

const platformStyles = {
  Facebook: { bg: '#1877f2', icon: <FaFacebook /> },
  Instagram: { bg: '#e1306c', icon: <FaInstagram /> },
  LinkedIn: { bg: '#0a66c2', icon: <FaLinkedin /> },
  YouTube: { bg: '#ff0000', icon: <FaYoutube /> },
  All: { bg: '#6c757d', icon: <FaGlobe /> },
};

function SummaryCards({ data }) {
  const platformStats = data.reduce((acc, cur) => {
    const { platform, engagement_rate } = cur;
    if (!acc[platform]) acc[platform] = { count: 0, totalEngagement: 0 };
    acc[platform].count++;
    acc[platform].totalEngagement += parseFloat(engagement_rate);
    return acc;
  }, {});

  return (
    <Container fluid className="px-4">
      <Row className="g-4 mb-4">
        {Object.entries(platformStats).map(([platform, stats]) => {
          const { bg, icon } = platformStyles[platform] || platformStyles.All;

          return (
            /** ⬇️ Always 2-per-row: xs={6} **/
            <Col key={platform} xs={6}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Header
                  className="text-white text-center fw-bold d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: bg,
                    fontSize: '1.05rem',
                  }}
                >
                  {icon}
                  {platform}
                </Card.Header>

                <Card.Body className="text-center">
                  <Card.Text className="mb-2">
                    <strong>Total Posts:</strong> {stats.count}
                  </Card.Text>
                  <Card.Text>
                    <strong>Avg Engagement:</strong>{' '}
                    {(stats.totalEngagement / stats.count).toFixed(2)}%
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default SummaryCards;
