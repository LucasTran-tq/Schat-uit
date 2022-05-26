import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SignupScreenComponentTheme } from '../../themes/Signup/SignupScreenComponentTheme'

const SignupSuccessComponent = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Text style={SignupScreenComponentTheme.text}>Đăng ký thành công</Text>
            <View style={SignupScreenComponentTheme.wrapper}>
                <Text style={SignupScreenComponentTheme.paragraph}>
                    Bạn đã có tài khoản SChat?
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={SignupScreenComponentTheme.signup}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupSuccessComponent
