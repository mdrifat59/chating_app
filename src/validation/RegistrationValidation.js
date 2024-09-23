import * as Yup from 'yup';

export const singUp = Yup.object({
    fullName: Yup.string().min(3).max(10).required("Please Fill Up Your Name"),
    email: Yup.string().email().required("Please Fill Up Email"),
    password: Yup.string().min(6).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Minimum eight characters, at least one letter and one number").required("Please setup password"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'),null],'Passwords must match').required('Please Fill Up Password')
})