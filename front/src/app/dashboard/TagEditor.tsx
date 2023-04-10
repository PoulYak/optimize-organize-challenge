import {Dialog} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faRemove, faX} from "@fortawesome/free-solid-svg-icons";
import React, {FormEvent, useState} from "react";
import {Tag, TagType, tagTypeNames} from "../TagTypes";
import {useDispatch} from "react-redux";
import {fetchTags} from "../reducer";

interface DialogProps {
    open: boolean;

    onClose(): void;
}

interface CardDialogProps {
    tags: Tag[];

    open: boolean;

    onClose(): void;
}

function TagCreator(props: DialogProps) {
    const [name, setName] = useState("");
    const [type, setType] = useState(TagType.String);
    const [required, setRequired] = useState(false);
    const [rawOptions, setRawOptions] = useState("");
    const dispatch = useDispatch();

    const create = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (type === TagType.Enum && rawOptions.split("\n").length < 2) {
            alert("Должно хотя бы два выбора!")
            return
        }
        await fetch("/api/tags/", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                name,
                type,
                required,
                options: rawOptions.split("\n")
            })
        })
        dispatch(fetchTags() as any)
        props.onClose()
    };

    return (<Dialog open={props.open}>
        <header className="card-header">
            <div className="card-header-left">
                <span className="card-header-title">Создание аттрибута</span>
            </div>
            <div className="card-header-right">
                <button className="close-button" onClick={() => props.onClose}>
                    <FontAwesomeIcon icon={faX} size="xl"/>
                </button>
            </div>
        </header>
        <form onSubmit={(e) => create(e)}>
            <table>
                <tbody>
                <tr>
                    <td>Имя</td>
                    <td><input type="text" required value={name}
                               onChange={(e) => setName(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>Тип</td>
                    <td><select value={type as string}
                                onChange={(event) => {
                                    console.log(event.target.value)
                                    setType(event.target.value as TagType);
                                }}>
                        {
                            Object.values(TagType).map(value => {
                                return <option key={value} value={value}>{tagTypeNames[value]}</option>
                            })
                        }
                    </select></td>
                </tr>
                <tr>
                    <td>Обязательность</td>
                    <td>
                        <input type="checkbox" checked={required}
                               onChange={event => setRequired(event.target.checked)}/>
                    </td>
                </tr>
                {
                    type === TagType.Enum ? (
                        <tr>
                            <td>Варианты</td>
                            <td>
                                <textarea required value={rawOptions} onChange={(e) => setRawOptions(e.target.value)}
                                          placeholder="По одному в строку"/>
                            </td>
                        </tr>
                    ) : null
                }
                <tr>
                    <td/>
                    <td>
                        <button className="pretty-button" type="submit">
                            Создать
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>

    </Dialog>)
}


export function TagEditor(props: CardDialogProps) {
    const [tagCreatorOpen, setTagCreatorOpen] = useState(false);
    const dispatch = useDispatch()

    return (<Dialog open={props.open}>
        <header className="card-header">
            <div className="card-header-left">
                <span className="card-header-title">Редактирование аттрибутов</span>
            </div>
            <div className="card-header-right">
                <button className="close-button" onClick={props.onClose}>
                    <FontAwesomeIcon icon={faX} size="xl"/>
                </button>
            </div>
        </header>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Тип</th>
                    <th>Обязательность</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.tags.map(value => {
                        return (<tr key={value.id}>
                            <td>
                                {value.name}
                            </td>
                            <td>
                                {tagTypeNames[value.type]}
                            </td>
                            <td>
                                <input type="checkbox" checked={value.required} disabled/>
                            </td>
                            <td>
                                <button className="icon-button" onClick={async () => {
                                    await fetch(`/api/tags/${value.id}/`, {
                                        method: "DELETE"
                                    })
                                    dispatch(fetchTags() as any)
                                }}>
                                    <FontAwesomeIcon icon={faRemove}/>
                                </button>
                            </td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
            <button className="icon-button-wide" onClick={() => setTagCreatorOpen(true)}>
                <FontAwesomeIcon icon={faPlus}/>
            </button>
            <TagCreator open={tagCreatorOpen} onClose={() => setTagCreatorOpen(false)}/>
        </div>
    </Dialog>)
}