import streamlit as st
import pickle
import numpy as np
from PIL import Image
from sklearn.tree import DecisionTreeClassifier

# Load the model (replace with the actual path to your model)
MODEL_PATH = 'decision_tree_model.pkl'

# Load the trained model
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

# Define class names
CLASS_NAMES = ['Mild_Demented', 'Moderate_Demented', 'Non_Demented', 'Very_Mild_Demented']

# Streamlit page setup
st.set_page_config(page_title="Alzheimer's Prediction", page_icon="🧠")

# Title and instructions
st.title("Alzheimer's Disease Prediction from MRI Images")
st.write("""
    This is a simple web application that predicts the type of Alzheimer's disease a person might have.
    Upload an MRI image to get a prediction.
    """)

# File uploader for MRI image
uploaded_image = st.file_uploader("Choose an MRI image...", type=["jpg", "jpeg", "png"])

if uploaded_image is not None:
    # Open and display the uploaded image
    image = Image.open(uploaded_image)
    st.image(image, caption="Uploaded MRI Image", use_column_width=True)

    # Convert image to the format required by the model (this may involve resizing, normalization, etc.)
    # For simplicity, assume the model requires a 2D array (e.g., features extracted from the MRI image)
    # Normally, you would need to preprocess the image (resize, extract features) to match the model input format.
    
    # Placeholder: Convert the image to a numpy array (ensure you use the correct preprocessing steps)
    image_array = np.array(image)  # Placeholder preprocessing step (use the actual preprocessing steps)
    
    # Make prediction (you may need to preprocess the image properly before prediction)
    prediction = model.predict(image_array.reshape(1, -1))  # Reshaping if necessary
    predicted_class = CLASS_NAMES[prediction[0]]

    # Display result
    st.write(f"**Prediction**: The person is predicted to have: **{predicted_class}** Alzheimer's Disease.")

    # Optionally, save the result image with the prediction text overlay
    # This step depends on your desired output, for example:
    result_image = image.copy()
    result_image = np.array(result_image)
    # Add text overlay (this requires using PIL or OpenCV for image manipulation)

    # For simplicity, showing the result text
    st.image(result_image, caption=f"Prediction: {predicted_class}", use_column_width=True)

# Sidebar for additional info or settings (optional)
st.sidebar.header("About")
st.sidebar.write("""
    This app uses a machine learning model to predict the type of Alzheimer's disease based on MRI images.
    The model was trained using a Decision Tree Classifier.
""")
