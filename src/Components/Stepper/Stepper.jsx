import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Adress from '../Adress/Adress';
import Ordersummary from '../Ordersummary/Ordersummary';
import Payment from '../Payment/Payment';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from "react-router-dom";
// import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const steps = ['Adress', 'Order Summary', 'Payment'];

export default function HorizontalLinearAlternativeLabelStepper() {

  // const location = useLocation();
  // React.useEffect(() => {
  //   if(location.state && location.state.toastMessage) {
  //     toast.success(location.state.toastMessage)
  //   }
  // },[location.state]);


  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    // const submit = value;
    // if(!SubmitAddress) {
    //   toast.error("Please Submit Address")
    // }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    alert("Order Placed Successfully!");
    navigate('/home')
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <Adress/>
            {/* <ToastContainer/> */}
          </div>
        );
      case 1:
        return (
          <div>
            <Ordersummary userId="677faab42ae0ccd71481090e" />
          </div>
        );
      case 2:
        return (
          <div>
            <Payment/>
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2, mb: 1 }}>
        {getStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleReset}>Place order</Button>
        ) : (
          <Button onClick={handleNext}>
            {activeStep === steps.length - 2 ? 'Next' : 'Deliver here'}
          </Button>
         
        )}
      </Box>

    </Box>
  );
}
