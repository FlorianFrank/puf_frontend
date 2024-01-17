import VersionInfo from "./Utils/VersionInfo";

export { default as Header } from './HeaderFooter/Header';
export { default as Footer } from './HeaderFooter/Footer';
export { default as Navbar } from './HeaderFooter/Navbar';
export { default as Sidebar } from './HeaderFooter/Sidebar';
export { default as Other } from './Utils/Other';
export { default as Spinner } from './Utils/Spinner';
export { default as Notification } from './Utils/Notification';


// Devices
export { default as Devices } from './Devices/Devices';
export { default as Device } from './Devices/Device';

// Tests
export { default as Tests } from './Tests/Tests';
export { default as SearchTests } from './Tests/SearchTests';
export { default as AddTest } from './Tests/AddTest/AddTest';
export { default as ScriptExecution } from './Tests/AddTest/ScriptExecution';
export { default as AddCNTTest } from './Tests/AddTest/AddCNTTest';
export { default as TestDetail } from './Tests/TestDetail';
export { default as TestNavbar } from './Tests/TestNavbar';
export { default as StatusTable } from './Tests/StatusTable';
export { default as StartTest } from './Tests/StartTest';

// Login
export { default as Login } from './Login/Login';

// Evaluation
export { default as Evaluation } from './Evaluation/Evaluation';
export { default as EvaluationsPage } from './Evaluation/EvaluationsPage';
export { default as SelectedTestsEvaluation } from './Evaluation/EvaluationStepper/MeasurementFilter';
export { default as Experiments } from './Evaluation/Results';
export { default as Results } from './Evaluation/Results';
export { default as EvaluationStepper } from './Evaluation/EvaluationStepper/EvaluationStepper';
export { default as UploadMeasurments } from './Upload/UploadMeasurments';
export { default as Upload } from './Upload/Upload';
export { default as UploadStepper } from './Upload/UploadStepper';
export { default as CustomTable } from './Upload/CustomTable';

export { default as EvaluationSelector } from './Evaluation/EvaluationStepper/EvaluationSelector';
export { default as TriggerTask } from './Evaluation/TriggerTask';

// Heatmap
export { default as CreateHeatMap } from './Evaluation/EvaluationResults/Memory/CreateHeatMap';

// Metrics
export { default as Metrics } from './Evaluation/EvaluationResults/Memory/Metrics';
export { default as Uniformity } from './Evaluation/EvaluationResults/Memory/Uniformity';
export { default as UniformityTable } from './Evaluation/EvaluationResults/Memory/UniformityTable';
export { default as Robustness } from './Evaluation/EvaluationResults/Memory/Robustness';
export { default as Uniqueness } from './Evaluation/EvaluationResults/Memory/Uniqueness';
export { default as MemoryComponent } from './Evaluation/EvaluationResults/Memory/MemoryComponent';
export { default as InterHammeingDistancetable } from './Evaluation/EvaluationResults/Memory/InterHammingDistanceTable';
export { default as TestTypeComponent } from './Evaluation/EvaluationResults/Memory/TestTypeComponent';
export {default as RawEvaluation} from './Evaluation/EvaluationResults/CNTs/RawEvaluation/RawEvaluation'