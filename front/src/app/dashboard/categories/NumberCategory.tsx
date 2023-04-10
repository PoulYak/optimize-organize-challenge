import ReactSlider from 'react-slider';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setNumberCategory} from "../../reducer";

interface NumberCategoryProps {
    name: string;
    value: [number, number];
    borders: [number, number];
}

export default function NumberCategory(props: NumberCategoryProps) {
    const borders = [0, 100]
    const dispatcher = useDispatch();
    const [state, _setState] = useState([0, 100]);

    const setState = (value: number[]) => {
        _setState(value);
        dispatcher(setNumberCategory({category: props.name, value: value as [number, number]}))
        if (value[0] === borders[0] && value[1] === borders[1]) {
            dispatcher(setNumberCategory({category: props.name, value: undefined}))
        }
    }

    return (
        <div className="NumberCategory">
            <h2>{props.name}</h2>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={state}
                onChange={value => setState(value)}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                pearling
            />
            <div className="under-slider-input">
                <input type="number" value={state[0]} min={borders[0]} max={borders[1]} onChange={
                    (event) => {
                        const value = parseInt(event.target.value);
                        if (value >= borders[0] && value <= borders[1] && value <= state[1]) {
                            setState([value, state[1]]);
                        }
                    }
                }/>
                <input type="number" value={state[1]} min={borders[0]} max={borders[1]} onChange={
                    (event) => {
                        const value = parseInt(event.target.value);
                        if (value >= borders[0] && value <= borders[1] && value >= state[0]) {
                            setState([state[0], value]);
                        }
                    }
                }/>
            </div>
        </div>
    )
}