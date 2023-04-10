import {Dialog} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {DomEvent} from "leaflet";
import preventDefault = DomEvent.preventDefault;
import {useDispatch} from "react-redux";
import {fetchFacilities} from "../../facilitiesSlice";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
}

export function UploadDialog(props: DialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch()
    const submit = async () => {
        if (file === null) {
            alert("Выберите файл!")
        } else {
            const filePromise = new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsText(file, "UTF-8")
                reader.onloadend = ev => {
                    const result = reader.result
                    resolve(result as string)
                }
                reader.onerror = ev => {
                    reject()
                }
            })

            await fetch("/api/load_xml/", {
                method: "POST",
                headers: { "Content-type": "application/xml" },
                body: await filePromise
            })
            dispatch(fetchFacilities() as any)
            props.onClose()
        }
    };
    return (<Dialog open={props.open}>
        <header className="card-header">
            <div className="card-header-left">
                <span className="card-header-title">Загрузка XML</span>
            </div>
            <div className="card-header-right">
                <button className="close-button" onClick={props.onClose}>
                    <FontAwesomeIcon icon={faX} size="xl"/>
                </button>
            </div>
        </header>
        <div>
            <input type="file" accept=".xml" onChange={event => setFile(event.target.files ? event.target.files[0] : null)}/>
            <button className="pretty-button" onClick={submit}>Upload</button>
        </div>
    </Dialog>)
}