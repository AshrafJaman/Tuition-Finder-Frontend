import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './TutorRegi.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useLocation } from 'react-router-dom';
const TutorRegi = () => {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [personal, setPersonal] = useState('');
  const [education, setEducation] = useState('');
  const [tuition, setTuition] = useState({});
  const [tutorId, setTutorId] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.querySelector('body').classList.remove('no__scroll');
  }, []);

  useEffect(() => {
    if (location.state) {
      setPersonal(location.state.personal);
      setEducation(location.state.education);
      setTuition(location.state.tuition);
      setTutorId(location.state._id);
      setIsEditing(true);
    }
  }, [location.state]);

  return (
    <div className="tutorRegi">
      <Navigation></Navigation>

      {step === 1 && <Step1 count={setStep} personal={personal} setPersonal={setPersonal} />}
      {step === 2 && <Step2 education={education} setEducation={setEducation} count={setStep} />}
      {step === 3 && (
        <Step3
          personal={personal}
          education={education}
          tuition={tuition}
          count={setStep}
          isEditing={isEditing}
          tutorId={tutorId}
        />
      )}
      {step === 4 && <Step4 />}
    </div>
  );
};

export default TutorRegi;
