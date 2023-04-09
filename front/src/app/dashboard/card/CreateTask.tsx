import {Dialog} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import React, {FormEvent, useState} from "react";
import DatePicker from "react-datepicker";

interface CreateTaskProps {
    open: boolean;

    onClose(): void;

    facility_id: number;
    title: string;
    endpoint: string;
}

export function CreateTask(props: CreateTaskProps) {
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(new Date());
    const [assignee, setAssignee] = useState("");

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {
            facility_id: props.facility_id,
            description: desc,
            deadline: date.getTime() / 1000,
            assignee: assignee
        }
        await fetch(props.endpoint, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        props.onClose()
    };

    return (
        <Dialog open={props.open}>
            <header className="card-header">
                <div className="card-header-left">
                    <span className="card-header-title">Создание {props.title}</span>
                </div>
                <div className="card-header-right">
                    <button className="close-button" onClick={props.onClose}>
                        <FontAwesomeIcon icon={faX} size="xl"/>
                    </button>
                </div>
            </header>
            <div>
                <form name="create-form" onSubmit={onSubmit}>
                    <input type="text" name="description" required value={desc}
                           onChange={event => setDesc(event.target.value)}/>
                    <input type="text" name="assignee" required value={assignee}
                           onChange={event => setAssignee(event.target.value)}/>
                    <DatePicker onChange={date1 => date1 && setDate(date1)} selected={date}/>
                    <input type="submit"/>
                </form>
            </div>
        </Dialog>
    )
}