import * as Yup from 'yup';

export const singIn = Yup.object({
    email: Yup.string().email().required("Please Fill Up Email"),
    password: Yup.string().min(3).required("Please Enter your Password")
})