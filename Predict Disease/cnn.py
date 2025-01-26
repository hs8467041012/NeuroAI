import streamlit as st
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model

# Load your trained model
MODEL_PATH = 'cnn_model_fold_1.h5'  # Replace with the actual path to your model
model = load_model(MODEL_PATH)

# Define class names
CLASS_NAMES = ['Mild_Demented', 'Moderate_Demented', 'Non_Demented', 'Very_Mild_Demented']

# Streamlit page setup
st.set_page_config(page_title="Alzheimer's Prediction", page_icon="🧠")
st.title("Alzheimer's Disease Prediction from MRI Images")
st.write("""
    Upload an MRI image to predict the type of Alzheimer's disease.
""")

# File uploader
uploaded_image = st.file_uploader("Choose an MRI image...", type=["jpg", "jpeg", "png"])

if uploaded_image is not None:
    # Open and display the uploaded image
    image = Image.open(uploaded_image)
    st.image(image, caption="Uploaded MRI Image", use_column_width=True)

    # Preprocess the image for the model
    image = image.resize((128, 128))  # Resize to 128x128
    image_array = np.array(image)

    # Convert to grayscale if necessary
    if image_array.ndim == 3:  # If RGB or RGBA
        image_array = np.mean(image_array, axis=-1)  # Convert to grayscale (mean of color channels)

    # Normalize the image and add batch/channel dimensions
    image_array = image_array / 255.0  # Normalize pixel values to [0, 1]
    image_array = np.expand_dims(image_array, axis=(0, -1))  # Add batch and channel dimensions

    # Input shape for the model: (1, 128, 128, 1)
    try:
        prediction = model.predict(image_array)
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        predicted_class = CLASS_NAMES[predicted_class_index]

        # Display the prediction result
        st.write(f"**Prediction**: The person is predicted to have: **{predicted_class}** Alzheimer's Disease.")
    except Exception as e:
        st.error(f"Error during prediction: {str(e)}")

# Sidebar for additional information
st.sidebar.header("About")
st.sidebar.write("""
    This app uses a machine learning model to predict the type of Alzheimer's disease based on MRI images.
    The model was trained using grayscale MRI images of size 128x128 pixels.
""")
