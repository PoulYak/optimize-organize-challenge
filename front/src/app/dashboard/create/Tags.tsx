import React, {ChangeEventHandler, FormEvent, useEffect, useState} from 'react';
import '../../../App.css';
import "react-datepicker/dist/react-datepicker.css";
import {Tag, TagValue} from "../../TagTypes";
import {useDispatch, useSelector} from "react-redux";
import {setTags} from "../../tagsSlice";
import {RootState} from "../../store";
import defaultTags, {tagNames} from "../../defaultTags";
import {Dialog, DialogTitle} from "@mui/material";
import {InputTag} from "./InputTag";
import {MapTag} from "./MapTag";
import {DomUtil, LatLng} from "leaflet";
import setPosition = DomUtil.setPosition;
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faX} from "@fortawesome/free-solid-svg-icons";
import {fetchFacilities} from "../../facilitiesSlice";
import {getMediaBase64} from "../../utils/fileUtils";


interface Fields {
    files: File[]
    position: LatLng | null
}

function Tags({onClose}: { onClose: () => void }) {
    const tagState = useSelector((state: RootState) => state.tagsReducer.state);
    const [mapOpen, setMapOpen] = useState(false);

    const [fields, setFields] = useState<Fields>({
        files: [],
        position: null,
    });
    const tags = useSelector((state: RootState) => state.tagsReducer.tags)
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/tags/")
            const json = await response.json()
            dispatch(setTags([...defaultTags, ...json.tags]))
            console.log(tags)
        }

        fetchData().then()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (fields.position === null) {
            alert("Выберите локацию!!!")
            return
        }
        const promises = getMediaBase64(fields.files)

        const media = await Promise.all(promises)
        console.log(tagState)

        const tagValues = Array.from(tagState.entries());
        const object: { [key: string]: TagValue } = {};
        for (const [key, value] of tagValues.filter(value1 => value1[0] < 0)) {
            object[tagNames[key]] = value;
        }
        const formData = {
            ...object,
            tags: tagValues.filter(value => value[0] >= 0).map(value => {
                return {
                    id: value[0],
                    value: value[1] instanceof Date ? "07.03.2004 15:23:45" : value[1]
                }
            }),
            media,
            ...fields.position
        }

        let body = JSON.stringify(formData);
        console.log(body)
        await fetch("/api/facilities/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: body
        })
        dispatch(fetchFacilities() as any)
        onClose()
    };
    const changeFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFields(prevState => {
            return {
                ...prevState,
                files: Array.from(event.target.files || [])
            }
        })
    }

    const handleMapClose = (position: LatLng | null) => {
        setMapOpen(false);
        setFields(prevState => {
            return {
                ...prevState,
                position
            }
        })
    };

    return (
        <div className="Tags">
            <form name="asdsd" onSubmit={onSubmit} >
                {
                    tags.map(value => {
                        return <InputTag key={value.id} tag={value}/>
                    })
                }
                <input type="file" accept=".doc,.docx,image/png,image/jpeg" onChange={changeFiles} multiple={true}/>
                <button id="location-btn" type="button" className={"pretty-button"} onClick={() => setMapOpen(true)}>{fields.position ? fields.position.toString() : "Выберите позицию..."}</button>
                <input type="submit"/>
            </form>
            <MapTag open={mapOpen} onClose={handleMapClose}/>
        </div>
    );
}

export interface CreateDialogProps {
    open: boolean;
    onClose: () => void;
}

function CreateDialog(props: CreateDialogProps) {
    return (
        <Dialog open={props.open}>
            <header className="card-header">
                <div className="card-header-left">
                    <span className="card-header-title">Создание объекта</span>
                </div>
                <div className="card-header-right">
                    <button className="close-button" onClick={props.onClose}>
                        <FontAwesomeIcon icon={faX} size="xl"/>
                    </button>
                </div>
            </header>
            <Tags onClose={props.onClose}/>
        </Dialog>
    )
}

export default CreateDialog;
