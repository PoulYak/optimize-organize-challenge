import React, {ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState} from 'react';
import '../App.css';
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from 'react-datepicker';
import {Tag, TagType, TagValue} from "./TagTypes";
import {useDispatch, useSelector} from "react-redux";
import {setTagValue, tagsSlice, TagsState} from "./tagsSlice";
import {RootState} from "./store";
import defaultTags, {tagNames} from "./defaultTags";
import {Dialog, DialogTitle} from "@mui/material";



interface TagProps {
    tag: Tag;
}

function InputTag(props: TagProps) {
    const tag = props.tag;

    const tagValue = useSelector((state: RootState) => state.tagsReducer.state.get(tag.id));
    const dispatch = useDispatch();

    const onChange = (value: TagValue) => {
        dispatch(setTagValue({ id: tag.id, value }));
    };

    switch (tag.type) {
        case TagType.Date:
            return <div>
                <DatePicker id={`input-tag-${tag.id}`} name={tag.name}
                            value={((tagValue || new Date()) as Date).toDateString()}
                            onChange={date => date && onChange(date)}/>
                <label htmlFor={`input-tag-${tag.id}`}>{tag.name}</label>
            </div>

        case TagType.Boolean:
        case TagType.Enum:
            let options = tag.options
            if (tag.type === TagType.Boolean) {
                options = ["Да", "Нет"]
            }
            if (options === undefined) break;

            if (!tag.required) {
                options = ["", ...options]
            }
            return (
                <div>
                    <select id={`input-tag-${tag.id}`} required={tag.required}
                            value={tagValue as string}
                            onChange={event => onChange(event.target.value)}>
                        {
                            options.map(value => {
                                return <option value={value}>{value}</option>
                            })
                        }
                    </select>
                    <label htmlFor={`input-tag-${tag.id}`}>{tag.name}</label>
                </div>
            )
        case TagType.Number:
            return (
                <div>
                    <input id={`input-tag-${tag.id}`} type="number" required={tag.required} name={tag.name}
                           value={tagValue as number}
                           onChange={event => onChange(event.target.value)}/>
                    <label htmlFor={`input-tag-${tag.id}`}>{tag.name}</label>
                </div>
            )
        case TagType.String:
            return (
                <div>
                    <input id={`input-tag-${tag.id}`} type="text" required={tag.required} name={tag.name}
                           value={tagValue as string}
                           onChange={event => onChange(event.target.value)}/>
                    <label htmlFor={`input-tag-${tag.id}`}>{tag.name}</label>
                </div>
            )
    }
    return <div/>
}

interface Fields {
    files: File[]
}

function Tags({ onClose }: { onClose: () => void }) {
    const tagState = useSelector((state: RootState) => state.tagsReducer.state);


    const [fields, setFields] = useState<Fields>({
        files: []
    });
    const [tags, setTags] = useState<Tag[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/tags/")
            const json = await response.json()
            setTags([...defaultTags, ...json.tags])
            console.log(tags)
        }

        fetchData().then()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const promises = fields.files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsBinaryString(file)
                reader.onloadend = function (event) {
                    const result = reader.result
                    resolve({
                        name: file.name,
                        type: file.type.startsWith("image") ? "p" : "d",
                        content: btoa(result as string)
                    })
                }
                reader.onerror = function () {
                    console.log("couldn't read the file")
                    reject()
                }
            })
        });

        const media = await Promise.all(promises)
        console.log(tagState)

        const tagValues = Array.from(tagState.entries());
        const object: {[key: string]: TagValue} = {};
        for (const [key, value] of tagValues.filter(value1 => value1[0] < 0)) {
            object[tagNames[key]] = value;
        }
        const formData = {
            ...object,
            tags: tagValues.filter(value => value[0] >= 0).map(value => {
                return {
                    id: value[0],
                    value: value[1] instanceof Date ? value[1].getTime() : value[1]
                }
            }),
            media
        }

        let body = JSON.stringify(formData);
        console.log(body)
        await fetch("/api/facilities/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        })
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

    return (
        <div className="Tags">
            <form name="asdsd" onSubmit={onSubmit}>
                {
                    tags.map(value => {
                        return <InputTag key={value.id} tag={value}/>
                    })
                }
                <input type="file" accept=".doc,.docx,image/png,image/jpeg" onChange={changeFiles} multiple={true}/>
                <input type="submit"/>
            </form>

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
            <DialogTitle>Создание объекта</DialogTitle>
            <Tags onClose={props.onClose}/>
        </Dialog>
    )
}

export default CreateDialog;
