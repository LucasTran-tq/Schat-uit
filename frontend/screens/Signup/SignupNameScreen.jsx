import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import SigninScreenComponent from '../../components/Signin/SigninScreenComponent'
import { FontAwesome5 } from '@expo/vector-icons'
import { Formik } from 'formik'
import { SignupSchema } from '../../validation'
import { SignupNameTheme } from '../../themes/Signup/SignupNameTheme'

function ScreenSignupName({ navigation }) {
    const handleSubmit = () => {
        console.log(firstName, lastName)
    }
    return (
        <View style={SignupNameTheme.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('WaittingScreen')
                }}
            >
                <FontAwesome5
                    name='arrow-left'
                    size={20}
                    style={SignupNameTheme.arrowLeftIcon}
                />
            </TouchableOpacity>

            <SigninScreenComponent />

            <Formik
                initialValues={{ firstName: '', lastName: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                {({
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    dirty,
                    isValid,
                }) => (
                    <View>
                        <View>
                            <Text style={SignupNameTheme.firstName}>
                                Họ và tên đệm
                            </Text>

                            <TextInput
                                style={SignupNameTheme.firstNameInput}
                                placeholder='Nhập họ và tên đệm của bạn'
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                            {errors.firstName && touched.firstName ? (
                                <Text style={SignupNameTheme.message}>
                                    {errors.firstName}
                                </Text>
                            ) : null}
                        </View>

                        <View>
                            <Text style={SignupNameTheme.lastName}>Tên</Text>

                            <TextInput
                                style={SignupNameTheme.lastNameInput}
                                placeholder='Nhập tên của bạn'
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                            {errors.lastName && touched.lastName ? (
                                <Text style={SignupNameTheme.message}>
                                    {errors.lastName}
                                </Text>
                            ) : null}
                        </View>

                        <View style={SignupNameTheme.buttonContainer}>
                            <Button
                                title='Tiếp theo'
                                sytle={SignupNameTheme.button}
                                onPress={() =>
                                    navigation.navigate(
                                        'SignupPhoneScreen',
                                        values
                                    )
                                }
                                disabled={!dirty || !isValid}
                                type='submit'
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default ScreenSignupName
