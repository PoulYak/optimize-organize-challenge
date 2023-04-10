import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {Tag, TagType, TagValue} from "../../TagTypes";
import {setTagValue} from "../../tagsSlice";
import DatePicker from "react-datepicker";
import React from "react";

export interface TagProps {
    tag: Tag;
}

export function InputTag(props: TagProps) {
    const tag = props.tag;

    const tagValue = useSelector((state: RootState) => state.tagsReducer.state.get(tag.id));
    const dispatch = useDispatch();

    const onChange = (value: TagValue) => {
        dispatch(setTagValue({id: tag.id, value}));
    };

    const x = (() => {
        switch (tag.type) {
            case TagType.Date:
                return <td>
                    <DatePicker id={`input-tag-${tag.id}`} name={tag.name}
                                value={((tagValue || new Date()) as Date).toDateString()}
                                onChange={date => date && onChange(date)}/>
                </td>

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
                    <select id={`input-tag-${tag.id}`} required={tag.required}
                            value={tagValue as string}
                            onChange={event => onChange(event.target.value)}>
                        {
                            options.map(value => {
                                return <option value={value}>{value}</option>
                            })
                        }
                    </select>
                )
            case TagType.Number:
                return (
                    <input id={`input-tag-${tag.id}`} type="number" required={tag.required} name={tag.name}
                           value={tagValue as number}
                           onChange={event => onChange(event.target.value)}/>
                )
            case TagType.String:
                return (
                    <input id={`input-tag-${tag.id}`} type="text" required={tag.required} name={tag.name}
                           value={tagValue as string}
                           onChange={event => onChange(event.target.value)}/>
                )
        }
    })()

    return (<tr>
        <td>
            <label>{tag.name}{tag.required ? "*" : ""}</label>
        </td>
        <td>
            {
                x
            }
        </td>
    </tr>)
}