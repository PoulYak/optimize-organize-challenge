import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {setCheckedCategory} from "../../reducer";
import {BaseCategoryState} from "./CategoryProps";
import {Checkbox, Grid} from "@mui/material";
import {pink} from "@mui/material/colors";
import {RootState} from "../../store";

// import {checkCategory, uncheckCategory} from "../../reducer";

interface EnumCategoryProps {
    id: number;
    name: string;
    value: Map<string, boolean>;
}

export function EnumCategory(props: EnumCategoryProps) {
    const dispatch = useDispatch();
    const selector = useSelector((state: RootState) => state.rootReducer.categories.find(c => c.name === props.name)?.value as Map<string, boolean>)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        dispatch(setCheckedCategory({category: props.name, value, isChecked: event.target.checked}))
    };

    return (
        <div className="Category">
            <h2>{props.name}</h2>
            <Grid container>
                {
                    Array.from(props.value.keys()).map((value, index) => {
                        return (
                            <Grid item className="checkbox-container">
                                <Checkbox id={`checkbox-${props.id}-${index}`} key={index} name={value}
                                          checked={selector.get(value)}
                                          sx={{
                                              color: '#49A078',
                                              '&.Mui-checked': {
                                                  color: '#49A078',
                                              }
                                          }}
                                          onChange={(event) => handleChange(event, value)}/>
                                <label htmlFor={`checkbox-${props.id}-${index}`} className="checkbox-label">{value}</label>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    );
}