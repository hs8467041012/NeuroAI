from flask import Flask, request, render_template
import pickle
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)

# Load the pre-trained model
with open('decision_tree_model.pkl', 'rb') as file:
    model = pickle.load(file)

CLASS_NAMES = ['Mild_Demented', 'Moderate_Demented', 'Non_Demented', 'Very_Mild_Demented']

def preprocess_image(image):
    # Resize image to 224x224
    image = image.resize((224, 224))  
    image_array = np.array(image)
    image_array = image_array / 255.0  # Normalize pixel values
    image_array = image_array.reshape(1, 224, 224, 3)  # Assuming 3-channel (RGB) images
    return image_array

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', error='No file part')
        file = request.files['file']
        if file.filename == '':
            return render_template('index.html', error='No selected file')
        
        if file:
            image_bytes = file.read()
            image = Image.open(io.BytesIO(image_bytes))
            
            # Process image and make prediction
            processed_image = preprocess_image(image)
            prediction = model.predict(processed_image)
            result = CLASS_NAMES[prediction[0]]
            
            # Convert the image to base64 for embedding
            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode()
            
            return render_template('index.html', result=result, image=img_str)
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
