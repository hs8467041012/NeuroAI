import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Brain, Activity, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import './dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h1 className="welcome-title">Welcome to the Dashboard</h1>
      
      <section className="disease-prediction">
        <h2>What type of disease would you like to predict?</h2>
        <div className="disease-grid">
          {[
            { name: "Alzheimer's Disease", description: "A progressive brain disorder that slowly destroys memory and thinking skills.", link: "/predict" },
            { name: "Parkinson's Disease", description: "A neurodegenerative disorder that affects movement, balance, and coordination.", link: "#" },
            { name: "Huntington's Disease", description: "An inherited disorder causing progressive brain damage.", link: "#" },
            { name: "Amyotrophic Lateral Sclerosis (ALS)", description: "A rare neurological disease that mainly involves the nerve cells responsible for controlling voluntary muscle movement.", link: "#" }
          ].map((disease, index) => (
            <Card key={index} className="disease-card">
              <CardHeader>
                <CardTitle>{disease.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{disease.description}</p>
                <div className="button-container">
                  <Link to={disease.link}>
                    <Button>Predict {disease.name}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="health-trends">
        <h2>Latest Health Trends</h2>
        <Card>
          <CardContent>
            <div className="trend-chart">
              <div className="bar" style={{height: '60%'}} title="Alzheimer's">
                <span>Alzheimer's</span>
              </div>
              <div className="bar" style={{height: '75%'}} title="Parkinson's">
                <span>Parkinson's</span>
              </div>
              <div className="bar" style={{height: '45%'}} title="Huntington's">
                <span>Huntington's</span>
              </div>
              <div className="bar" style={{height: '30%'}} title="ALS">
                <span>ALS</span>
              </div>
            </div>
            <div className="trend-data">
              <h3>Disease Prevalence Trends (2010-2023)</h3>
              <ul>
                <li>Alzheimer's: 35% increase (4.7 million to 6.3 million cases)</li>
                <li>Parkinson's: 40% increase (680,000 to 950,000 cases)</li>
                <li>Huntington's: 5% increase (30,000 to 31,500 cases)</li>
                <li>ALS: 10% increase (20,000 to 22,000 cases)</li>
              </ul>
              <p>Note: Data is approximate and for illustrative purposes only.</p>
            </div>
          </CardContent>
        </Card>
        <div className="prevention-tips">
          <h3>Prevention Tips</h3>
          <ul>
            <li>Maintain a healthy diet rich in antioxidants and omega-3 fatty acids</li>
            <li>Exercise regularly to improve cardiovascular health and cognitive function</li>
            <li>Stay mentally active through learning new skills or solving puzzles</li>
            <li>Manage stress through relaxation techniques like meditation or yoga</li>
            <li>Get adequate sleep to support brain health and overall well-being</li>
          </ul>
        </div>
      </section>

      <section className="medical-records">
        <h2>Medical Record History</h2>
        <Card>
          <CardContent>
            <ul className="record-list">
              <li>Annual check-up - 3 months ago</li>
              <li>Neurological assessment - 6 months ago</li>
              <li>MRI scan - 1 year ago</li>
              <li>Blood work - 3 months ago</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="appointment-calendar">
        <h2>Appointment Calendar</h2>
        <Card>
          <CardContent>
            <div className="calendar-placeholder">
              <p>Upcoming appointment: Dr. Smith - Neurologist, Next Tuesday at 2:00 PM</p>
              <Button>Book New Appointment</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <Card>
          <CardContent>
            <ul className="activity-list">
              <li>Last symptom check: 3 days ago</li>
              <li>Updated medical records: 1 week ago</li>
              <li>Scheduled appointment with Dr. Johnson: 2 weeks ago</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

