import {useDispatch} from "react-redux";
import React from "react";
import {setCheckedCategory} from "../../reducer";
import {BaseCategoryState} from "./CategoryProps";
import {Checkbox} from "@mui/material";
import {pink} from "@mui/material/colors";

// import {checkCategory, uncheckCategory} from "../../reducer";

interface EnumCategoryProps {
    name: string;
    value: Map<string, boolean>;
}

export function EnumCategory(props: EnumCategoryProps) {
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        dispatch(setCheckedCategory({category: props.name, value, isChecked: event.target.checked}))
    };

    return (
        <div className="Category">
            <h2>{props.name}</h2>
            {
                Array.from(props.value.keys()).map((value, index) => {
                    return (
                        <div className="checkbox-container">
                            <Checkbox id={`checkbox-${index}`} key={index} name={value}
                                      sx={{
                                          color: '#49A078',
                                          '&.Mui-checked': {
                                              color: '#49A078',
                                          }
                                      }}
                                      onChange={(event) => handleChange(event, value)}/>
                            <label htmlFor={`checkbox-${index}`} className="checkbox-label">{value}</label>
                        </div>
                    )
                })
            }
        </div>
    );
}