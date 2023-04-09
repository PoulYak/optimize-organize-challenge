import {Facility, MediaType} from "../FacilityCard";
import {TagValue} from "../../TagTypes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faUpload} from "@fortawesome/free-solid-svg-icons";
import {Carousel} from "react-responsive-carousel";

interface InfoPageProps {
    facility: Facility
}

function toString(value: TagValue) { // string | number | boolean | Date | undefined;
    if (typeof value === "boolean") {
        return value ? "Да" : "Нет";
    }
    return (value ? value.toString() : "")
}

function shrinkText(text: string) {
    if (text.length > 20) {
        return text.substring(0, 20) + "...";
    } else {
        return text;
    }
}


export function InfoPage(props: InfoPageProps) {
    return (<div className="InfoPage">
        <div className="attribute-container">
            <table>
                <tbody>
                <tr>
                    <th>Атрибут</th>
                    <th>Значение</th>
                </tr>
                <tr>
                    <td>Регион</td>
                    <td>{props.facility.region}</td>
                </tr>
                <tr>
                    <td>Район</td>
                    <td>{props.facility.district}</td>
                </tr>
                <tr>
                    <td>Тип Строения</td>
                    <td>{props.facility.facility_type}</td>
                </tr>
                <tr>
                    <td>Площадь</td>
                    <td>{props.facility.area}</td>
                </tr>
                <tr>
                    <td>Собственник</td>
                    <td>{props.facility.owner}</td>
                </tr>
                <tr>
                    <td>Фактический пользователь</td>
                    <td>{props.facility.fact_user}</td>
                </tr>
                {
                    (props.facility.tags.map(value => {
                        return toString(value.value) != "" ? (<tr>
                            <td>{value.name}</td>
                            <td>{toString(value.value)}</td>
                        </tr>) : null
                    }))
                }
                </tbody>
            </table>
        </div>
        <div className="media-container">
            <div className="image-container">
                <div className="label-icon-container">
                    <h2>Фото</h2>
                    <button className="icon-button">
                        <FontAwesomeIcon icon={faUpload}/>
                    </button>
                </div>
                <Carousel width="400px" showThumbs={false} showArrows={true}>
                    {
                        props.facility.media.filter(value => value.type === MediaType.Picture).map((value, index) => {
                            return (<div key={index}>
                                <img src={value.path} alt={value.name}/>
                            </div>)
                        })
                    }
                </Carousel>
            </div>
            <div className="documents-container">
                <div className="label-icon-container">
                    <h2>Документы</h2>
                    <button className="icon-button">
                        <FontAwesomeIcon icon={faUpload}/>
                    </button>
                </div>
                <ol>
                    {
                        props.facility.media.filter(value => value.type === MediaType.Document).map((value, index) => {
                            return (<li key={index} >
                                <div className="label-icon-container">
                                    <span title={value.name}>{shrinkText(value.name)}</span>
                                    <form method="get" action={`http://127.0.0.1:8000/${value.path}`}>
                                        <button className="icon-button" type="submit">
                                            <FontAwesomeIcon icon={faDownload}/>
                                        </button>
                                    </form>
                                </div>
                            </li>)
                        })
                    }
                </ol>
            </div>
        </div>
    </div>)
}


/*
region: string;
district: string;
address: string;
facility_type: string;
status: string;
area: number;
owner: string;
fact_user: string;
 */