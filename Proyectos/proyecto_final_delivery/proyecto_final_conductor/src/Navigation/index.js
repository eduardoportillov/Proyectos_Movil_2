import React, { Component } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import root from '../pages/root';

const Stack = createNativeStackNavigator();

export default function Navigation(props) {
    const { pages } = props;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {Object.keys(pages).map((key) => {
                    return <Stack.Screen
                        name={key}
                        component={pages[key]}
                        options={{ headerShown: false }}
                    />
                })}


            </Stack.Navigator>
        </NavigationContainer>
    )
}

