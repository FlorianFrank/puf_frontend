import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// Icons
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DataObjectIcon from '@mui/icons-material/DataObject';
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone';
import IconButton from '@mui/material/IconButton';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CustomTable } from '../../components';

import { BACKEND_BASE_URL } from '../../config';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <FileUploadIcon />,
    2: <EditIcon />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};
const steps = ['Upload Measurements', 'Edit & Save'];

const UploadStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [files, setFiles] = useState([]);
  const [secondary, setSecondary] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [jsonFile, setJsonFile] = useState(null);

  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if (files) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('uploaded_csv_files', file);
      });
      //handleNext(formData);
    } else {
      console.log('Please select a file to upload');
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleJsonFileSelection = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    setJsonFile(file);
    const reader = new FileReader();

    reader.onload = () => {
      const data = JSON.parse(reader.result);
      console.log(data);
      const filtered = data.measurments.filter((row) =>
        files.some((file) => file.name === row.fileName)
      );
      setJsonData(filtered);
    };

    reader.readAsText(file);
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    borderRadius: 10
  }));

  const createFormDataFromObject = (object) => {
    let formData = new FormData();
    console.log(object);
    Object.entries(object).forEach(([key, value]) => {
      console.log(key, value);
      formData.append(key, value);
    });

    return formData;
  };

  const handleSubmit = async (data) => {
    console.log('Send Post Request to django:');
    console.log('data:', data);
    console.log('files:', files);

    const selectedCSVFiles = files.filter((file) =>
      data.some((row) => file.name === row.fileName)
    );

    let formData = new FormData();

    selectedCSVFiles.forEach((file, index) => {
      console.log(
        '🚀 ~ file: UploadStepper.jsx:242 ~ selectedCSVFiles.forEach ~ file:',
        file
      );
      const measurment = data.filter((row) => file.name === row.fileName);

      if (measurment.length > 0) {
        console.log(
          '🚀 ~ file: UploadStepper.jsx:244  ~ measurment:',
          measurment
        );
        console.log('\nSEND\n');
        formData = createFormDataFromObject({ ...measurment[0], file });
        console.log(
          '🚀 ~ file: UploadStepper.jsx:246 ~ selectedCSVFiles.forEach ~ formData:',
          formData
        );

        try {
          axios
            .post(
              `${BACKEND_BASE_URL}/uploadMeasurmentsApi/uploadMeas/`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            )
            .then((response) => {
              console.log(response);
              console.log('File Uploaded Successfully');
              navigate('/evaluation');
            });
        } catch (error) {
          // Error handling
          console.log(error);
        }
      }
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  startIcon={<UploadFileIcon />}
                  variant="contained"
                  component="label"
                >
                  Upload csv files
                  <input
                    hidden
                    type="file"
                    accept=".csv"
                    multiple
                    onChange={handleFileChange}
                  />
                </Button>
                <Demo>
                  <List>
                    {files.length > 0 && (
                      <div>
                        <Typography
                          sx={{ mt: 4, mb: 2 }}
                          variant="h6"
                          component="div"
                        >
                          Selected CSV files only:
                        </Typography>
                        <ul>
                          {files.map((file) => (
                            <ListItem
                              key={file.name}
                              secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                  <HighlightOffTwoToneIcon color="error" />
                                </IconButton>
                              }
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <InsertDriveFileTwoToneIcon color="success" />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={file.name}
                                secondary={secondary ? 'Secondary text' : null}
                              />
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    )}
                  </List>
                </Demo>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  startIcon={<UploadFileIcon />}
                  variant="contained"
                  component="label"
                >
                  Upload a json file
                  <input
                    hidden
                    type="file"
                    accept=".json"
                    multiple
                    onChange={handleJsonFileSelection}
                  />
                </Button>
                <Demo>
                  <List>
                    {jsonFile && (
                      <div>
                        <Typography
                          sx={{ mt: 4, mb: 2 }}
                          variant="h6"
                          component="div"
                        >
                          Selected JSON file:
                        </Typography>
                        <ul>
                          <ListItem
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <HighlightOffTwoToneIcon color="error" />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar>
                                <DataObjectIcon color="warning" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={jsonFile.name}
                              secondary={secondary ? 'Secondary text' : null}
                            />
                          </ListItem>
                        </ul>
                      </div>
                    )}
                  </List>
                </Demo>
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <CustomTable
            jsonData={jsonData}
            csvFiles={files}
            onSubmit={handleSubmit}
          />
        );

      default:
        return 'Unknown step';
    }
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <br />
            <div sx={{ mt: 10, mb: 4, py: 4 }}>
              {getStepContent(activeStep)}
            </div>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              {activeStep == 1 ? null : (
                <>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    disabled={files.length === 0 || jsonFile == null}
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                  >
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: 'inline-block' }}
                      >
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? 'Finish'
                          : 'Complete Step'}
                      </Button>
                    ))}
                </>
              )}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};

export default UploadStepper;
