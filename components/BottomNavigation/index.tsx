import * as React from 'react';
import type { BottomNavigationProps, BottomNavigationRoute } from 'react-native-paper';
import { BottomNavigation } from 'react-native-paper';

export type BottomNavRoute = BottomNavigationRoute;

export type BottomNavigationBarProps<Route extends BottomNavRoute = BottomNavRoute> = Omit<
  BottomNavigationProps<Route>,
  'navigationState' | 'onIndexChange' | 'renderScene'
> & {
  routes: Route[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  renderScene: BottomNavigationProps<Route>['renderScene'];
};

const BottomNavigationBar = <Route extends BottomNavRoute = BottomNavRoute>({
  routes,
  index,
  defaultIndex = 0,
  onIndexChange,
  renderScene,
  ...rest
}: BottomNavigationBarProps<Route>) => {
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
  const activeIndex = index ?? internalIndex;

  const handleIndexChange = React.useCallback(
    (newIndex: number) => {
      if (index === undefined) {
        setInternalIndex(newIndex);
      }
      onIndexChange?.(newIndex);
    },
    [index, onIndexChange]
  );

  return (
    <BottomNavigation
      navigationState={{ index: activeIndex, routes }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      {...rest}
    />
  );
};

export default BottomNavigationBar;
