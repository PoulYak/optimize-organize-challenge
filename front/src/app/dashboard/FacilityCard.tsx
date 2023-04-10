import logo from '../../logo.svg';

export const statusNames: { [key: string]: string } = {
    n: "Нет поручений",
    c: "Закрыт",
    w: "В работе",
    d: "Просрочен",
}

export enum FacilityStatus {
    New = "n",
    Closed = "c",
    Working = "w",
    Deadlined = "d",
}

export interface Facility {
    id: number;
    region: string;
    district: string;
    address: string;
    obj_status: FacilityStatus;
    facility_type: string;
    status: string;
    area: number;
    owner: string;
    fact_user: string;
    lat: number;
    lng: number;
    media: Media[];
    tags: Tag[];
    solutions: Solution[];
    assignments: Assignment[];
}

export enum MediaType {
    Picture = "p",
    Document = "d"
}

interface Media {
    path: string;
    name: string;
    type: MediaType;
}

interface Tag {
    id: number;
    name: string;
    type: string;
    required: boolean;
    value: any;
}

export interface Solution {
    id: number;
    assignee: string;
    deadline: number;
    description: string;
}

export enum AssignmentStatus {
    Working = "w",
    Closed = "c",
    Deadlined = "d"
}

export interface Assignment {
    id: number;
    assignee: string;
    deadline: number;
    description: string;
    status: AssignmentStatus;
}

export interface FacilityCardProps {
    facility: Facility

    onClick(): void;
}

export function FacilityCard(props: FacilityCardProps) {
    const {facility} = props;

    let x: any
    let picture = facility.media.find(value => value.type === MediaType.Picture);
    if (picture === undefined) {
        x = logo
    } else {
        x = `${picture.path}`
    }


    return (
        <div onClick={event => props.onClick()} className="FacilityCard">
            <div className="facility-card-body">
                <img src={x} className="Card-image" alt="Image"/>
                <p>{facility.address}</p>
            </div>
            <div className="facility-card-footer">
                <p className="status">{statusNames[facility.obj_status]}</p>
            </div>
        </div>
    );
}