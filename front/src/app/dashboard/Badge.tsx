import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

interface TagProps {
    name: string;
    onClick?(): void
}

export function Badge(props: TagProps) {
    return (
        <button className="Badge" onClick={() => props.onClick && props.onClick()}>
            <p>{props.name}</p>
            <FontAwesomeIcon icon={faX} size="xs"/>
        </button>
    );
}