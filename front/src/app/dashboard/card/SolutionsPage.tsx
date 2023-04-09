import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Facility, Solution} from "../FacilityCard";
import {useState} from "react";
import {CreateTask} from "./CreateTask";

interface SolutionsPageProps {
    facility: Facility,
}

export function SolutionsPage(props: SolutionsPageProps) {
    const [createOpen, setCreateOpen] = useState(false);

    const solutions: Solution[] = props.facility.solutions


    return (<div className="SolutionsPage">
        <table>
            <thead>
                <tr>
                    <th>Решение</th>
                    <th>Дедлайн</th>
                    <th>Ответственный</th>
                </tr>
            </thead>
            <tbody>
            {
                solutions.map(value => {
                    return (<tr key={value.id}>
                        <td>{value.description}</td>
                        <td>{new Date(value.deadline * 1000).toDateString()}</td>
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
                    title="решения" endpoint="/api/solutions/"/>
    </div>)
}