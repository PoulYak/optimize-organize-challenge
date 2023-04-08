import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

interface TagProps {
    name: string;
}

export function Badge(props: TagProps) {
    return (
        <div className="Badge">
            <p>{props.name}</p>
            <FontAwesomeIcon icon={faX} size="xs"/>
        </div>
    );
}