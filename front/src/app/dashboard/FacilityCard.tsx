import logo from '../../logo.svg';

export interface Facility {
    id: number;
    region: string;
    district: string;
    address: string;
    facility_type: string;
    status: string;
    area: number;
    owner: string;
    fact_user: string;
    media: Media[];
    tags: Tag[];
    solutions: Solution[];
}

enum MediaType {
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

interface Solution {
    id: number;
    assignee: string;
    deadline: number;
    description: string;
}

export interface FacilityCardProps {
    facility: Facility
}

export function FacilityCard(props: FacilityCardProps) {
    const { facility } = props;

    let x: any
    let picture = facility.media.find(value => value.type === MediaType.Picture);
    if (picture === undefined) {
        x = logo
    } else {
        x = `${picture.path}`
    }


    return (
        <div className="FacilityCard">
            <img src={x} className="Card-image" alt="Image"/>
            <p>{facility.address}</p>
            <p className="status">{facility.status}</p>
        </div>
    );
}