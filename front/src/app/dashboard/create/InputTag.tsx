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