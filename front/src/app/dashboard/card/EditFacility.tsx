import {Facility} from "../FacilityCard";
import {Dialog} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useDispatch} from "react-redux";
import {fetchFacilities} from "../../facilitiesSlice";
import {Tags} from "../create/Tags";

interface EditFacilityProps {
    facility: Facility;
    open: boolean;

    onClose(): void;
}

export function EditFacility(props: EditFacilityProps) {
    const dispatch = useDispatch()

    return (<Dialog open={props.open} onClose={() => props.onClose()}>
        <header className="card-header">
            <div className="card-header-left">
                <span className="card-header-title">Реддактирование объекта</span>
            </div>
            <div className="card-header-right">
                <button className="close-button" onClick={props.onClose}>
                    <FontAwesomeIcon icon={faX} size="xl"/>
                </button>
            </div>
        </header>
        <Tags confirm={async (body) => {
            console.log(body)
            await fetch(`/api/facilities/${props.facility.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: body
            })
            dispatch(fetchFacilities() as any)
            props.onClose()
        }} facility={props.facility}/>
    </Dialog>)
}