import {ChangeEvent, ChangeEventHandler, FormEventHandler, useState} from "react"
import {RequestOptions} from "http";
import {fetchLogin} from "./roleSlice";
import {useDispatch} from "react-redux";

interface Credentials {
    login: string;
    password: string;
}

function LoginForm() {
    const [formData, setFormData] =  useState<Credentials>({
        login: '',
        password: '',
    })
    const dispatch = useDispatch()
    const handleChange: ChangeEventHandler<HTMLFormElement> = event => {
        const { name, value } = event.target
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        const data = await fetch("/api/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        dispatch(fetchLogin() as any)
        console.log(data)
    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="login" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" required />
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default LoginForm