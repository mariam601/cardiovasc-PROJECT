// Store uploaded files data
let uploadedFiles = {
    medicalScans: [],
    labResults: []
};

// Preview file when selected
function setupFileInputs() {
    const medicalScanInput = document.getElementById('medicalScan');
    const labResultsInput = document.getElementById('labResults');
    const previewSection = document.getElementById('filePreviewSection');
    const previewGrid = document.getElementById('previewGrid');
    
    function handleFiles(files, type) {
        const fileArray = Array.from(files);
        
        fileArray.forEach(file => {
            if (file.size > 10 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Max size 10MB`);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: e.target.result,
                    uploadType: type
                };
                
                if (type === 'scan') {
                    uploadedFiles.medicalScans.push(fileData);
                } else {
                    uploadedFiles.labResults.push(fileData);
                }
                
                updatePreview();
            };
            reader.readAsDataURL(file);
        });
    }
    
    function updatePreview() {
        const allFiles = [...uploadedFiles.medicalScans, ...uploadedFiles.labResults];
        
        if (allFiles.length === 0) {
            previewSection.style.display = 'none';
            return;
        }
        
        previewSection.style.display = 'block';
        previewGrid.innerHTML = '';
        
        allFiles.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            if (file.type.startsWith('image/')) {
                previewItem.innerHTML = `
                    <img src="${file.data}" alt="${file.name}">
                    <div class="remove-file" onclick="removeFile(${index})">
                        <i class="fas fa-times"></i>
                    </div>
                    <div class="file-name">${file.name.substring(0, 15)}${file.name.length > 15 ? '...' : ''}</div>
                `;
            } else {
                previewItem.innerHTML = `
                    <div class="pdf-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div class="remove-file" onclick="removeFile(${index})">
                        <i class="fas fa-times"></i>
                    </div>
                    <div class="file-name">${file.name.substring(0, 15)}${file.name.length > 15 ? '...' : ''}</div>
                `;
            }
            
            previewGrid.appendChild(previewItem);
        });
    }
    
    medicalScanInput.addEventListener('change', (e) => {
        handleFiles(e.target.files, 'scan');
        medicalScanInput.value = '';
    });
    
    labResultsInput.addEventListener('change', (e) => {
        handleFiles(e.target.files, 'lab');
        labResultsInput.value = '';
    });
}

function removeFile(index) {
    const allFiles = [...uploadedFiles.medicalScans, ...uploadedFiles.labResults];
    const fileToRemove = allFiles[index];
    
    if (fileToRemove.uploadType === 'scan') {
        uploadedFiles.medicalScans = uploadedFiles.medicalScans.filter((_, i) => i !== index);
    } else {
        const labIndex = index - uploadedFiles.medicalScans.length;
        uploadedFiles.labResults = uploadedFiles.labResults.filter((_, i) => i !== labIndex);
    }
    
    updatePreviewDisplay();
}

function updatePreviewDisplay() {
    const allFiles = [...uploadedFiles.medicalScans, ...uploadedFiles.labResults];
    const previewSection = document.getElementById('filePreviewSection');
    const previewGrid = document.getElementById('previewGrid');
    
    if (allFiles.length === 0) {
        previewSection.style.display = 'none';
        return;
    }
    
    previewSection.style.display = 'block';
    previewGrid.innerHTML = '';
    
    allFiles.forEach((file, idx) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        if (file.type.startsWith('image/')) {
            previewItem.innerHTML = `
                <img src="${file.data}" alt="${file.name}">
                <div class="remove-file" onclick="removeFile(${idx})">
                    <i class="fas fa-times"></i>
                </div>
                <div class="file-name">${file.name.substring(0, 15)}${file.name.length > 15 ? '...' : ''}</div>
            `;
        } else {
            previewItem.innerHTML = `
                <div class="pdf-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="remove-file" onclick="removeFile(${idx})">
                    <i class="fas fa-times"></i>
                </div>
                <div class="file-name">${file.name.substring(0, 15)}${file.name.length > 15 ? '...' : ''}</div>
            `;
        }
        
        previewGrid.appendChild(previewItem);
    });
}

function runAnalysis() {
    // Get all form values
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const apHi = document.getElementById('apHi').value;
    const apLo = document.getElementById('apLo').value;
    const cholesterol = document.getElementById('cholesterol').value;
    const glucose = document.getElementById('glucose').value;
    const smoke = document.getElementById('smoke').value;
    const alco = document.getElementById('alco').value;
    const active = document.getElementById('active').value;
    
    // Validation
    if (!age || !gender || !height || !weight || !apHi || !apLo || !cholesterol || !glucose || !smoke || !alco || !active) {
        alert('⚠️ Please fill all required fields before running the analysis.');
        return;
    }
    
    // Calculate BMI
    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    
    // Simple risk calculation logic
    let riskScore = 0;
    let riskFactors = [];
    
    if (age > 60) { riskScore += 25; riskFactors.push("Age > 60"); }
    else if (age > 50) { riskScore += 15; riskFactors.push("Age > 50"); }
    else if (age > 40) { riskScore += 8; riskFactors.push("Age > 40"); }
    
    if (apHi > 140 || apLo > 90) { riskScore += 25; riskFactors.push("High Blood Pressure"); }
    else if (apHi > 130 || apLo > 85) { riskScore += 15; riskFactors.push("Elevated Blood Pressure"); }
    
    if (cholesterol == 3) { riskScore += 25; riskFactors.push("High Cholesterol"); }
    else if (cholesterol == 2) { riskScore += 12; riskFactors.push("Borderline Cholesterol"); }
    
    if (glucose == 3) { riskScore += 20; riskFactors.push("High Glucose"); }
    else if (glucose == 2) { riskScore += 10; riskFactors.push("Elevated Glucose"); }
    
    if (smoke == 1) { riskScore += 15; riskFactors.push("Smoker"); }
    if (alco == 1) { riskScore += 5; riskFactors.push("Alcohol Consumption"); }
    if (active == 0) { riskScore += 10; riskFactors.push("Inactive Lifestyle"); }
    
    if (bmi > 30) { riskScore += 10; riskFactors.push("Obese (BMI > 30)"); }
    else if (bmi > 25) { riskScore += 5; riskFactors.push("Overweight (BMI 25-30)"); }
    
    riskScore = Math.min(riskScore, 100);
    
    let result = riskScore > 50 ? 1 : 0;
    let resultText = riskScore > 50 ? "CVD Detected" : "Normal";
    
    // Create prediction object with files
    const prediction = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        bmi: bmi,
        apHi: apHi,
        apLo: apLo,
        cholesterol: cholesterol,
        glucose: glucose,
        smoke: smoke,
        alco: alco,
        active: active,
        riskScore: riskScore,
        result: result,
        resultText: resultText,
        riskFactors: riskFactors,
        medicalScans: uploadedFiles.medicalScans.map(f => ({ name: f.name, type: f.type, data: f.data })),
        labResults: uploadedFiles.labResults.map(f => ({ name: f.name, type: f.type, data: f.data })),
        doctorAdvice: "Awaiting doctor's review"
    };
    
    // Save to localStorage
    let predictions = JSON.parse(localStorage.getItem('patientPredictions')) || [];
    predictions.unshift(prediction);
    localStorage.setItem('patientPredictions', JSON.stringify(predictions));
    
    // Clear uploaded files
    uploadedFiles = { medicalScans: [], labResults: [] };
    
    // Redirect to result page
    window.location.href = `result-summary.html?id=${prediction.id}`;
}

// Initialize file inputs on page load
document.addEventListener('DOMContentLoaded', function() {
    setupFileInputs();
});