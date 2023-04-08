export type TagValue = string | number | boolean | Date | undefined;

export enum TagType {
    Boolean = "b",
    Date = "d",
    Enum = "e",
    Number = "n",
    String = "s",
}

export interface Tag {
    id: number;
    name: string;
    type: TagType;
    required: boolean;
    options?: string[];
}