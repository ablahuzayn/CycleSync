import React, { useState } from 'react';
import { Calendar, Activity, Coffee, Moon, Pill, Home } from 'lucide-react';
import { Card } from './components/ui/Card';
import { CardContent } from './components/ui/CardContent';
import { CardHeader } from './components/ui/CardHeader';
import { CardTitle } from './components/ui/CardTitle';

const CycleSync = () => {
  const [currentPhase, setCurrentPhase] = useState('menstrual');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [cycleDay, setCycleDay] = useState(1);

  const symptoms = [
    { id: 'cramps', label: 'Cramps' },
    { id: 'mood', label: 'Mood Changes' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'bloating', label: 'Bloating' },
    { id: 'vomiting', label: 'Vomiting' },
    { id: 'diarrhea', label: 'Diarrhea' },
  ];

  const symptomNutrition = {
    cramps: ['Magnesium-rich foods', 'Anti-inflammatory foods', 'Omega-3 rich foods'],
    mood: ['Vitamin B6-rich foods', 'Complex carbohydrates', 'Tryptophan-rich foods'],
    fatigue: ['Iron-rich foods', 'Vitamin B12 foods', 'High-protein snacks'],
    bloating: ['Potassium-rich foods', 'Natural diuretics', 'Probiotic foods'],
    vomiting: ['Clear broths', 'Ginger tea', 'Bland foods', 'Electrolyte drinks'],
    diarrhea: ['BRAT diet', 'Electrolyte-rich foods', 'Probiotic foods'],
  };

  const symptomExercise = {
    cramps: ['Gentle stretching', 'Yoga', 'Light walking'],
    mood: ['Meditation', 'Dance therapy', 'Group fitness classes'],
    fatigue: ['Short, low-intensity walks', 'Restorative yoga', 'Gentle swimming'],
    bloating: ['Core-strengthening exercises', 'Walking', 'Light Pilates'],
    vomiting: ['Rest', 'Minimal movement', 'Light stretching when able'],
    diarrhea: ['Rest', 'Hydration', 'Gentle walking when stable'],
  };

  const symptomStress = {
    cramps: ['Heat therapy', 'Meditation', 'Gentle massage'],
    mood: ['Journaling', 'Art therapy', 'Music relaxation'],
    fatigue: ['Power naps', 'Mindfulness', 'Calm environments'],
    bloating: ['Deep breathing', 'Relaxation techniques', 'Comfortable clothing'],
    vomiting: ['Quiet rest', 'Hydration', 'Soft music'],
    diarrhea: ['Hydration', 'Rest', 'Calm environment'],
  };

  const symptomPills = {
    cramps: ['Ibuprofen', 'Naproxen', 'Acetaminophen'],
    mood: ['Vitamin B6 supplements', 'Omega-3 fatty acids', 'St. John\'s Wort'],
    fatigue: ['Iron supplements', 'Vitamin B12', 'Multivitamins'],
    bloating: ['Simethicone', 'Digestive enzymes', 'Probiotics'],
    vomiting: ['Antiemetic medications', 'Pepto-Bismol', 'Dramamine'],
    diarrhea: ['Imodium', 'Probiotics', 'Electrolyte supplements'],
  };

  const symptomHomeRemedies = {
    cramps: ['Heating pad', 'Ginger tea', 'Chamomile tea'],
    mood: ['Lavender essential oil', 'Meditation apps', 'Journaling'],
    fatigue: ['Magnesium supplements', 'Power naps', 'Hydration'],
    bloating: ['Peppermint tea', 'Fennel seeds', 'Abdominal massage'],
    vomiting: ['Ginger ale', 'Peppermint tea', 'Cool compress'],
    diarrhea: ['Banana', 'Rice water', 'Chamomile tea'],
  };

  const phases = {
    menstrual: {
      nutrition: ['Iron-rich foods', 'Complex carbs', 'Omega-3 fatty acids'],
      exercise: ['Light walking', 'Gentle yoga', 'Swimming'],
      stress: ['Meditation', 'Warm baths', 'Journal writing'],
    },
    follicular: {
      nutrition: ['Fermented foods', 'Leafy greens', 'Anti-inflammatory foods'],
      exercise: ['High-intensity workouts', 'Strength training', 'Dancing'],
      stress: ['Group exercise', 'Creative activities', 'Social connection'],
    },
    ovulatory: {
      nutrition: ['Fiber-rich foods', 'Antioxidants', 'Lean proteins'],
      exercise: ['Running', 'Cycling', 'HIIT workouts'],
      stress: ['Outdoor activities', 'Team sports', 'New challenges'],
    },
    luteal: {
      nutrition: ['Magnesium-rich foods', 'B-vitamins', 'Healthy fats'],
      exercise: ['Pilates', 'Low-impact cardio', 'Stretching'],
      stress: ['Deep breathing', 'Progressive relaxation', 'Nature walks'],
    },
  };

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms((prev) => {
      const newSymptoms = prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId];
      console.log(newSymptoms); // Log the new list of selected symptoms
      return newSymptoms;
    });
  };

  const getRecommendations = () => {
    let recommendations = { ...phases[currentPhase] };

    if (selectedSymptoms.length > 0) {
      const symptomTips = {
        nutrition: selectedSymptoms.flatMap(
          (symptom) => symptomNutrition[symptom] || []
        ),
        exercise: selectedSymptoms.flatMap(
          (symptom) => symptomExercise[symptom] || []
        ),
        stress: selectedSymptoms.flatMap(
          (symptom) => symptomStress[symptom] || []
        ),
        pills: selectedSymptoms.flatMap((symptom) => symptomPills[symptom] || []),
        homeRemedies: selectedSymptoms.flatMap(
          (symptom) => symptomHomeRemedies[symptom] || []
        ),
      };

      recommendations.nutrition = [
        ...new Set([...recommendations.nutrition, ...symptomTips.nutrition]),
      ];
      recommendations.exercise = [
        ...new Set([...recommendations.exercise, ...symptomTips.exercise]),
      ];
      recommendations.stress = [
        ...new Set([...recommendations.stress, ...symptomTips.stress]),
      ];
      recommendations.pills = [...new Set(symptomTips.pills)];
      recommendations.homeRemedies = [
        ...new Set(symptomTips.homeRemedies),
      ];
    }

    console.log(recommendations); // Log recommendations to see if they're being populated
    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div
      style={{
        minHeight: '100vh', // Full height of the viewport
        width: '100%',      // Full width of the viewport
        backgroundColor: '#fbe0e6', // Background color
        display: 'flex',     // Flexbox to align content
        flexDirection: 'column',  // Stack the content vertically
        justifyContent: 'center',  // Center vertically
        alignItems: 'center',  // Center horizontally
        padding: 0,         // No padding for full background
        position: 'absolute', // Ensure the background fills the full screen
        top: 0,              // Align to the top of the screen
        left: 0,             // Align to the left of the screen
      }}
    >
      <div style={{ textAlign: 'center', paddingBottom: '24px' }}>
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#8b1f6a',  // Dark pink font color
            marginBottom: '8px',
          }}
        >
          CycleSync
        </h1>
        <p style={{ color: '#8b1f6a' }}>Your Personal Menstrual Health Companion</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        <Card
          style={{
            border: '1px solid #f3c6d1',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardHeader
            style={{ backgroundColor: '#fcd6e1', borderRadius: '8px 8px 0 0' }}
          >
            <CardTitle
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#8b1f6a', // Dark pink font color
              }}
            >
              <Calendar style={{ height: '20px', width: '20px', color: '#d66b93' }} />
              Cycle Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ paddingBottom: '16px' }}>
              <div>
                <label
                  style={{ display: 'block', marginBottom: '8px', color: '#8b1f6a' }} // Dark pink
                >
                  Current Phase
                </label>
                <select
                  value={currentPhase}
                  onChange={(e) => setCurrentPhase(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderColor: '#f3c6d1',
                    borderRadius: '4px',
                    outlineColor: '#d66b93',
                  }}
                >
                  {Object.keys(phases).map((phase) => (
                    <option key={phase} value={phase}>
                      {phase.charAt(0).toUpperCase() + phase.slice(1)} Phase
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{ display: 'block', marginBottom: '8px', color: '#8b1f6a' }} // Dark pink
                >
                  Cycle Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="28"
                  value={cycleDay}
                  onChange={(e) => setCycleDay(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderColor: '#f3c6d1',
                    borderRadius: '4px',
                    outlineColor: '#d66b93',
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          style={{
            border: '1px solid #f3c6d1',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardHeader
            style={{ backgroundColor: '#fcd6e1', borderRadius: '8px 8px 0 0' }}
          >
            <CardTitle
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#8b1f6a', // Dark pink font color
              }}
            >
              <Activity style={{ height: '20px', width: '20px', color: '#d66b93' }} />
              Symptom Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => handleSymptomToggle(symptom.id)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: selectedSymptoms.includes(symptom.id)
                      ? '#d66b93'
                      : '#fcd6e1',
                    color: selectedSymptoms.includes(symptom.id)
                      ? 'white'
                      : '#8b1f6a', // Dark pink
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {symptom.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#8b1f6a' }}>Nutrition</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {recommendations.nutrition.map((item, idx) => (
                <li key={idx} style={{ color: '#8b1f6a' }}>{item}</li> // Dark pink font color
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#8b1f6a' }}>Exercise</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {recommendations.exercise.map((item, idx) => (
                <li key={idx} style={{ color: '#8b1f6a' }}>{item}</li> // Dark pink font color
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#8b1f6a' }}>Stress Relief</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {recommendations.stress.map((item, idx) => (
                <li key={idx} style={{ color: '#8b1f6a' }}>{item}</li> // Dark pink font color
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CycleSync;
