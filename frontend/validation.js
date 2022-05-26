import * as Yup from 'yup'

// const formatString = /^[a-zA-Z ']{1,25}$/
const formatString =
    /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ']+$/

const formatNumber =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(25, 'Vui lòng nhập dưới 25 ký tự')
        .matches(formatString, 'Vui lòng nhập đúng định dạng')
        .required('Vui lòng nhập Họ và tên đệm'),
    lastName: Yup.string()
        .max(25, 'Vui lòng nhập dưới 25 ký tự')
        .matches(formatString, 'Vui lòng nhập đúng định dạng')
        .required('Vui lòng nhập tên'),
})

export const SigninSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        // .required('Vui lòng nhập số điện thoại')
        .matches(formatNumber, 'Vui lòng không nhập ký tự đặc biệt'),
    // .max(9, 'Vui lòng nhập đúng 9  chữ số, không bao gồm chữ số 0 ở đầu'),
    // .typeError("That doesn't look like a phone number")
    // .positive("A phone number can't start with a minus")
    // .integer("A phone number can't include a decimal point")
    // .min(8),
})
