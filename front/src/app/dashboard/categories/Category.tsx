import React from "react";
import {EnumCategory} from "./EnumCategory";
import {CategoryProps, CategoryType} from "./CategoryProps";
import NumberCategory from "./NumberCategory";


export function Category(props: CategoryProps) {
    switch (props.category.type) {
        case CategoryType.EnumCategory:
            return EnumCategory({
                id: props.category.id,
                name: props.category.name,
                value: props.category.value as Map<string, boolean>
            });
        case CategoryType.NumberCategory:
            return NumberCategory({
                name: props.category.name,
                value: props.category.value as [number, number],
                borders: [0, 100],
            })
        default:
            return (<div></div>)
    }
}
