import {Facility, statusNames} from "../FacilityCard";
import {css, Dialog, Paper} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faX} from "@fortawesome/free-solid-svg-icons";
import {InfoPage} from "./InfoPage";
import React, {useState} from "react";
import {MapPage} from "./MapPage";
import {SolutionsPage} from "./SolutionsPage";
import {AssignmentsPage} from "./AssignmentsPage";

interface CardDialogProps {
    cardOpened: Facility | null;

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
    const [tab, setTab] = useState(CardDialogTab.Info);

    return (<Dialog classes={{paperWidthXl: "overflow", root:"card-dialog-root"}} maxWidth={"xl"} open={props.cardOpened !== null}>
        <div className="card-dialog">
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
                        <span className="card-header-title">{props.cardOpened?.address}</span>
                        <span className="card-header-status">{statusNames[props.cardOpened?.obj_status || ""]}</span>
                    </div>
                    <div className="card-header-right">
                        <button className="pretty-button">
                            <FontAwesomeIcon icon={faPencil}/>
                            Изменить объект
                        </button>
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
                                    return props.cardOpened ? <InfoPage facility={props.cardOpened}/> : null;
                                case CardDialogTab.Map:
                                    return props.cardOpened ? <MapPage position={{
                                        lng: props.cardOpened.lng,
                                        lat: props.cardOpened.lat,
                                    }}/> : null;
                                case CardDialogTab.Solutions:
                                    return props.cardOpened ? <SolutionsPage facility={props.cardOpened}/> : null;
                                case CardDialogTab.Assignments:
                                    return props.cardOpened ? <AssignmentsPage facility={props.cardOpened}/> : null;
                                case CardDialogTab.Calendar:
                                    return <div/>;
                            }
                        })()
                    }
                </div>
            </div>
        </div>
    </Dialog>)
}