import React, { useState } from 'react';
import axios from 'axios';
import './predict.css';

const Predict = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [alzheimerPrediction, setAlzheimerPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/api/predict-alzheimer', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAlzheimerPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making Alzheimer\'s prediction:', error);
      setAlzheimerPrediction('An error occurred while analyzing the MRI image.');
    }
    setIsLoading(false);
  };

  const alzheimerStages = [
    {
      title: "Non-Demented",
      symptoms: "No significant cognitive decline.",
      examples: "Normal cognitive function, no significant memory loss, or trouble with tasks.",
      solution: "Maintain a healthy lifestyle with regular exercise, a balanced diet, and cognitive activities. Regular check-ups can help monitor for any changes."
    },
    {
      title: "Very Mild Demented",
      symptoms: "Early signs of cognitive decline, often overlooked.",
      examples: "Minor memory lapses, such as forgetting recent conversations or misplacing items, but still functioning independently in most areas.",
      solution: "Engage in memory exercises, maintain social connections, and consider cognitive training programs. Consult with a healthcare provider for baseline cognitive assessments."
    },
    {
      title: "Mild Demented",
      symptoms: "Noticeable memory and cognitive impairment, but still mostly independent.",
      examples: "Difficulty remembering names, misplacing items, or occasionally forgetting appointments or conversations.",
      solution: "Work with healthcare providers to develop a care plan. Consider medications that may slow progression. Implement memory aids and establish routines to support daily living."
    },
    {
      title: "Moderate Demented",
      symptoms: "More severe cognitive and functional decline, requiring increasing levels of support.",
      examples: "Forgetting the names of family members or caregivers, getting lost in familiar places, needing help with personal care.",
      solution: "Ensure a safe living environment. Explore assisted living options or in-home care services. Participate in support groups and consider legal and financial planning for the future."
    }
  ];

  return (
    <div className="predict-container">
      <h1 className="predict-title">Predict Alzheimer's Disease</h1>
      
      <section className="alzheimer-stages">
        <h2>Stages of Alzheimer's Disease</h2>
        <div className="stages-grid">
          {alzheimerStages.map((stage, index) => (
            <div key={index} className="stage-card">
              <h3>{stage.title}</h3>
              <p><strong>Symptoms:</strong> {stage.symptoms}</p>
              <p><strong>Examples:</strong> {stage.examples}</p>
              <p><strong>Solution:</strong> {stage.solution}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="analysis-section">
        <div className="analysis-card">
          <h2>Alzheimer's MRI Analysis</h2>
          <form onSubmit={handleImageSubmit}>
            <div>
              <label htmlFor="mri-image">Upload MRI Image</label>
              <input
                id="mri-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="MRI Preview" />
              </div>
            )}
            <button type="submit" disabled={!image || isLoading}>
              {isLoading ? 'Analyzing...' : 'Analyze MRI'}
            </button>
          </form>
          {alzheimerPrediction && (
            <div className="result">
              <h3>Alzheimer's Analysis Result:</h3>
              <p>{alzheimerPrediction}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Predict;

