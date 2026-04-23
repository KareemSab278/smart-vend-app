import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Easing } from "react-native-reanimated";
import { styles } from "./Styles";
const PAGE_TITLES = ['Today\'s Catalogue', 'Hungry?', 'Find your flavor', 'Need a drink?', 'Treat yourself', 'Craving something?', 'What will it be?'];
  

export const CataloguePageTitle = () => {
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const titleAnimation = useRef(new Animated.Value(1)).current;

  const animateTitleSwap = useCallback(() => {
    Animated.timing(titleAnimation, {
      toValue: 0,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setActiveTitleIndex((prev) => (prev + 1) % PAGE_TITLES.length);
      Animated.timing(titleAnimation, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }, [titleAnimation]);


    useEffect(() => {
      const interval = setInterval(animateTitleSwap, 7000);
      return () => clearInterval(interval);
    }, [animateTitleSwap]);


    return (
        <Animated.Text
          style={[
            styles.title,
            { opacity: titleAnimation },
          ]}
        >
          {PAGE_TITLES[activeTitleIndex]}
        </Animated.Text>
    )
};