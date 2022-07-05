import { createStackNavigator } from '@react-navigation/stack';
import { OnBoarding } from '/screens/OnBoarding';

const OnBoardingStack = createStackNavigator();

export const OnBoardingNavigator = () => {

    return (
        <OnBoardingStack.Navigator screenOptions={{ headerShown: false }}>
            <OnBoardingStack.Screen name='OnBoardingScreen' component={OnBoarding} />
        </OnBoardingStack.Navigator>
    )
}