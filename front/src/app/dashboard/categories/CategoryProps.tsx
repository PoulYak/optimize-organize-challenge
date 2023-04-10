export enum CategoryType {
    EnumCategory = "EnumCategory",
    BooleanCategory = "BooleanCategory",
    NumberCategory = "NumberCategory",
}

export interface BaseCategoryState {
    id: number;
    name: string;
    type: CategoryType;
    value?: Map<string, boolean> | boolean | string | [number, number];
}

export function toStrings(state: BaseCategoryState) {
    switch (state.type) {
        case CategoryType.EnumCategory:
            return toStringsEnum(state.name, state.value as Map<string, boolean>);
        case CategoryType.BooleanCategory:
            return toStringsBoolean(state.name, state.value as boolean | undefined);
        case CategoryType.NumberCategory:
            return toStringsNumber(state.name, state.value as [number, number] | undefined);
        // default:
        //     return [];
    }
}

function toStringsEnum(name: string, value: Map<string, boolean>) {
    return Array.from(value.entries()).filter(entry => entry[1]).map((entry) => `${name}:${entry[0]}`);
}

function toStringsBoolean(name: string, value: boolean | undefined) {
    if (value == undefined) {
        return [];
    }
    return [`${name}:${value ? "Да" : "Нет"}`];
}

function toStringsNumber(name: string, value: [number, number] | undefined) {
    if (value == undefined) {
        return [];
    }
    return [`${name}[${value[0]}-${value[1]}]`];
}

export interface CategoryProps {
    category: BaseCategoryState;
}