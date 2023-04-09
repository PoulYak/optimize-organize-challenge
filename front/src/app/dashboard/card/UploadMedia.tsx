import {Dialog} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {DomEvent} from "leaflet";
import preventDefault = DomEvent.preventDefault;
import {getMediaBase64} from "../../utils/fileUtils";
import {fetchFacilities} from "../../facilitiesSlice";
import {useDispatch} from "react-redux";

export interface DialogProps {
    open: boolean;
    onClose: () => void;

    type: string;
    id: number;
    content_type: string;
}


export function UploadDialog(props: DialogProps) {
    const [files, setFiles] = useState<File[]>([]);
    const dispatch = useDispatch()

    const submit = async () => {
        if (files.length === 0) {
            alert("Выберите файл!")
        } else {
            const promises = getMediaBase64(files)

            const media = await Promise.all(promises)


            const body = {
                media: media.map(value => ({
                    ...value,
                    [`${props.type}_id`]: props.id,
                }))
            }



            await fetch("/api/media/", {
                method: "POST",
                body: JSON.stringify(body)
            })
            dispatch(fetchFacilities() as any)
            props.onClose()
        }
    };
    return (<Dialog open={props.open}>
        <header className="card-header">
            <div className="card-header-left">
                <span className="card-header-title">Загрузка файла</span>
            </div>
            <div className="card-header-right">
                <button className="close-button" onClick={props.onClose}>
                    <FontAwesomeIcon icon={faX} size="xl"/>
                </button>
            </div>
        </header>
        <div>
            <input type="file" accept={props.content_type} multiple
                   onChange={event => setFiles(event.target.files ? Array.from(event.target.files) : [])}/>
            <button className="pretty-button" onClick={submit}>Upload</button>
        </div>
    </Dialog>)
}