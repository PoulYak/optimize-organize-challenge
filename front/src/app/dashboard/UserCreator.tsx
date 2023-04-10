import {Dialog} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import React, {FormEvent, useEffect, useState} from "react";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
}

export function UserCreator(props: DialogProps) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [workgroup, setWorkgroup] = useState("");
    const [role, setRole] = useState("a");
    const [workgroups, setWorkgroups] = useState<string[]>([]);

    useEffect(() => {
        async function fetchWorkgroups() {
            const response = await fetch('/api/workgroups/')
            const body = await response.json()
            setWorkgroups(body.work_groups.map((value: any) => value.name))
        }

        fetchWorkgroups().then()
    }, []);


    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch("/api/users/", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                workgroup,
                role
            })
        })
    };
    return (<Dialog open={props.open}>
        <header className="card-header">
            <div className="card-header-left">
                <span className="card-header-title">Создание пользователя</span>
            </div>
            <div className="card-header-right">
                <button className="close-button" onClick={props.onClose}>
                    <FontAwesomeIcon icon={faX} size="xl"/>
                </button>
            </div>
        </header>
        <div>
            <form onChange={submit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Имя</td>
                        <td><input type="text" value={name} required onChange={e => setName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Почта</td>
                        <td><input type="email" value={email} required onChange={e => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Рабочая группа</td>
                        <td>
                            <select value={workgroup} required onChange={e => setWorkgroup(e.target.value)}>
                                {
                                    workgroups.map(value => {
                                        return <option value={value}>{value}</option>
                                    })
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Роль</td>
                        <td>
                            <select value={role} required onChange={e => setRole(e.target.value)}>
                                <option value="a">Администратор</option>
                                <option value="b">Пользователь</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td/>
                        <td>
                            <button className="pretty-button" type="submit">
                                Создать
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </Dialog>)
}