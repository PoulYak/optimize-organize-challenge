import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Assignment, AssignmentStatus, Facility, statusNames} from "../FacilityCard";
import {useState} from "react";
import {CreateTask} from "./CreateTask";

interface AssignmentsPageProps {
    facility: Facility,
}

export function AssignmentsPage(props: AssignmentsPageProps) {
    const [createOpen, setCreateOpen] = useState(false);

    const assignments: Assignment[] = props.facility.assignments
    return (<div className="SolutionsPage">
        <table>
            <thead>
                <tr>
                    <th>Решение</th>
                    <th>Дедлайн</th>
                    <th>Статус</th>
                    <th>Ответственный</th>
                </tr>
            </thead>
            <tbody>
            {
                assignments.map(value => {
                    return (<tr>
                        <td>{value.description}</td>
                        <td>{new Date(value.deadline * 1000).toDateString()}</td>
                        <td>{statusNames[value.status]}</td>
                        <td>{value.assignee}</td>
                    </tr>)
                })
            }
            </tbody>
        </table>
        <div className="plus-btn-container">
            <button className="icon-button-wide" onClick={() => setCreateOpen(true)}>
                <FontAwesomeIcon icon={faPlus} size="lg"/>
            </button>
        </div>
        <CreateTask open={createOpen} onClose={() => setCreateOpen(false)} facility_id={props.facility.id}
                    title="поручения" endpoint="/api/assignments/"/>
    </div>)
}