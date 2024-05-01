import { useLocation } from 'react-router-dom';
import ReqForTutor from '../ReqForTutor/ReqForTutor';

const EditTuitionJob = () => {
  const location = useLocation();
  const { job } = location.state || {};

  if (!job) {
    return null;
  }

  return <ReqForTutor jobToEdit={job} />;
};
export default EditTuitionJob;
