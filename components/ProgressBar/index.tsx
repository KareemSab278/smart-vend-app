import { MD3Colors, ProgressBar } from 'react-native-paper';

const NATIVE_COLORS: { [key: string]: string } = {
  'red': MD3Colors.error50,
  'light-purple': MD3Colors.primary80,
  'white': MD3Colors.primary100,
  'grey': MD3Colors.secondary50,
  'purple': MD3Colors.primary50,
}

const Progress = ({ progress, color }: { progress: number, color: string }) => (

  <ProgressBar progress={progress} color={NATIVE_COLORS[color] || NATIVE_COLORS['grey']} />
);

export default Progress;