import {Facility, statusNames} from "../FacilityCard";
import {css, Dialog, DialogTitle, Paper} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faX} from "@fortawesome/free-solid-svg-icons";
import {InfoPage} from "./InfoPage";
import React, {useState} from "react";
import {MapPage} from "./MapPage";
import {SolutionsPage} from "./SolutionsPage";
import {AssignmentsPage} from "./AssignmentsPage";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {CalendarPage} from "./CalendarPage";
import {EditFacility} from "./EditFacility";

interface CardDialogProps {
    cardOpened: number | null;

    onClose(): void;
}

enum CardDialogTab {
    Info = "Информация",
    Map = "Карта",
    Solutions = "Решения",
    Assignments = "Поручения",
    Calendar = "Календарь"
}

export function CardDialog(props: CardDialogProps) {
    const isAdmin = useSelector((state: RootState) => state.roleReducer.isAdmin)
    const [editFacilityOpen, setEditFacilityOpen] = useState(false);
    const facilities = useSelector((state: RootState) => state.facilitiesReducer.facilities)
    const facility = facilities[props.cardOpened || 0]
    const [tab, setTab] = useState(CardDialogTab.Info);

    return (<Dialog classes={{paperWidthXl: "overflow", root: "card-dialog-root"}} maxWidth={"xl"}
                    open={props.cardOpened !== null} scroll="body">
        {facility ? (<div className="card-dialog">
            <div className={"card-tabs"}>
                {
                    Object.entries(CardDialogTab).map(value => {
                        return <button className={`card-tab${value[1] == tab ? " selected" : ""}`}
                                       key="value"
                                       onClick={event => setTab((CardDialogTab as any)[value[0]])}>{value[1]}</button>
                    })
                }
            </div>
            <div className="card-main">
                <header className="card-header">
                    <div className="card-header-left">
                        <span className="card-header-title">{facility.address}</span>
                        <span className="card-header-status">{statusNames[facility.obj_status || ""]}</span>
                    </div>
                    <div className="card-header-right">
                        {isAdmin ? <button className="pretty-button" onClick={() => setEditFacilityOpen(true)}>
                            <FontAwesomeIcon icon={faPencil}/>
                            Изменить объект
                        </button>: null}
                        <button className="close-button" onClick={props.onClose}>
                            <FontAwesomeIcon icon={faX} size="xl"/>
                        </button>
                    </div>
                </header>
                <div className="card-container">
                    {
                        (() => {
                            switch (tab) {
                                case CardDialogTab.Info:
                                    return <InfoPage facility={facility}/>;
                                case CardDialogTab.Map:
                                    return <MapPage position={{
                                        lng: facility.lng,
                                        lat: facility.lat,
                                    }}/>;
                                case CardDialogTab.Solutions:
                                    return <SolutionsPage facility={facility}/>;
                                case CardDialogTab.Assignments:
                                    return <AssignmentsPage facility={facility}/>;
                                case CardDialogTab.Calendar:
                                    return <CalendarPage facility={facility}/>;
                            }
                        })()
                    }
                </div>
            </div>
            <EditFacility facility={facility} open={editFacilityOpen} onClose={() => setEditFacilityOpen(false)}/>
        </div>) : null
        }
    </Dialog>)
}