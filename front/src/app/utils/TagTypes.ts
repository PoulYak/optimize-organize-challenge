export type TagValue = string | number | boolean | Date | undefined;

export enum TagType {
    Boolean = "b",
    Date = "d",
    Enum = "e",
    Number = "n",
    String = "s",
}

export const tagTypeNames: { [key: string]: string } = {
    [TagType.Enum]: "Выбор",
    [TagType.String]: "Текст",
    [TagType.Number]: "Число",
    [TagType.Boolean]: "Да/нет",
    [TagType.Date]: "Дата"
}

export interface Tag {
    id: number;
    name: string;
    type: TagType;
    required: boolean;
    options?: string[];
}