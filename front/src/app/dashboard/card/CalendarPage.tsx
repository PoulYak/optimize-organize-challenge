import {Scheduler} from "@aldabil/react-scheduler";
import {Facility} from "../FacilityCard";
import {ProcessedEvent, SchedulerHelpers} from "@aldabil/react-scheduler/types";
import {scheduler} from "timers/promises";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import React, {FormEvent, Fragment, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import {useDispatch} from "react-redux";
import {fetchFacilities} from "../../facilitiesSlice";

interface CalendarPageProps {
    facility: Facility
}

enum TaskType {
    Solution = "Решение",
    Assignment = "Поручение"
}

export function CustomEditor(scheduler: SchedulerHelpers, facility_id: number) {
    const [desc, setDesc] = useState(scheduler.edited?.title || "");
    const [assignee, setAssignee] = useState("");
    const [taskType, setTaskType] = useState(TaskType.Solution);
    const dispatch = useDispatch()
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const date = scheduler.state["start"].value as Date
        console.log(date)
        const body = {
            facility_id: facility_id,
            description: desc,
            deadline: Math.round(date.getTime() / 1000),
            assignee: assignee
        }
        const endpoint = taskType === TaskType.Solution ? "/api/solutions/" : "/api/assignments/"
        await fetch(endpoint, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        dispatch(fetchFacilities() as any)
        scheduler.onConfirm({
            event_id: `_0`,
            title: desc,
            start: date,
            end: date,
            color:  taskType === TaskType.Solution ? "red" : "blue",
        }, "create")
        scheduler.close()
    }

    return (<div>
        <header className="card-header">
            <div className="card-header-left">
                <span className="card-header-title">Создание</span>
            </div>
            <div className="card-header-right">
                <button className="close-button" onClick={() => scheduler.close()}>
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
                <input type="radio" name="solution" value={TaskType.Solution}
                       checked={taskType === TaskType.Solution}
                       onChange={() => setTaskType(TaskType.Solution)}/>{TaskType.Solution}
                <input type="radio" name="assignment" value={TaskType.Assignment}
                       checked={taskType === TaskType.Assignment}
                       onChange={() => setTaskType(TaskType.Assignment)}/>{TaskType.Assignment}
                <input type="submit"/>
            </form>
        </div>
    </div>)
}

export function CalendarPage(props: CalendarPageProps) {
    const events: ProcessedEvent[] = [
        ...props.facility.solutions.map(value => {
            return {
                event_id: `s${value.id}`,
                title: value.description,
                start: new Date(value.deadline * 1000),
                end: new Date(value.deadline * 1000),
                color: "red",
            }
        }),
        ...props.facility.assignments.map(value => {
            return {
                event_id: `a${value.id}`,
                title: value.description,
                start: new Date(value.deadline * 1000),
                end: new Date(value.deadline * 1000),
                color: "blue",
            }
        }),
    ]
    return <div>
        <Scheduler
            customEditor={(scheduler) => CustomEditor(scheduler, props.facility.id)}
            draggable={false}
            editable={false}
            deletable={false}
            view="month"
            events={events}
        />
    </div>;
}