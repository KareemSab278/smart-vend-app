import { MD3Colors, ProgressBar } from 'react-native-paper';

const Progress = ({ progress }: { progress: number }) => (
  <ProgressBar progress={progress} color={MD3Colors.error50} />
);

export default Progress;