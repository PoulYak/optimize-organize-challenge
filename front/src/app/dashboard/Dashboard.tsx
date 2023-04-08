import React, {useEffect, useState} from "react";
import {Badge} from "./Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Category} from "./categories/Category";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {CategoryType, toStrings} from "./categories/CategoryProps";
import CreateDialog from "../Tags";
import {Grid} from "@mui/material";
import {Facility, FacilityCard} from "./FacilityCard";
import {Tag} from "../TagTypes";
import {initTags} from "../reducer";
import defaultTags, {tagNames} from "../defaultTags";

function Dashboard() {
    const [open, setOpen] = useState(false);
    const categories = useSelector((state: RootState) => state.rootReducer.categories)
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchFacilities() {
            const response = await fetch("/api/facilities/")
            const body = await response.json()
            setFacilities(body.facilities)
            console.log(facilities)
        }

        async function fetchTags() {
            const response = await fetch("/api/tags/")
            const body = await response.json()
            const _tags: Tag[] = body.tags;
            const tags = [...defaultTags, ..._tags]
            dispatch(initTags({ tags, facilities }))
        }

        fetchFacilities().then(fetchTags)
    }, []);


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("xssss")
    }

    const voidHandler = () => {

    };

    const logout = async () => {
        console.log(await fetch("/api/logout"))
    };

    const handleClose = () => {
        setOpen(false)
    };

    const filter = (facility: Facility) => {
        for (const category of categories) {
            console.log(category.name)
            const val = facility.tags.find(value => value.name === category.name)?.value || (facility as any)[tagNames[category.id]]
            if (category.type === CategoryType.EnumCategory) {
                const map = category.value as Map<string, boolean>
                if (Array.from(map.values()).every(value => !value)) continue;
                if (val === undefined) return false;
                console.log(Array.from(map.entries()).filter(value => value[1]))
                if (!Array.from(map.entries()).filter(value => value[1]).some(
                    value => value[0] == val
                )) return false
            }
        }
        return true
    };

    return (
        <div className="Dashboard">
            <div className="header">
                <form className="search-bar-wrapper" onSubmit={handleSearch}>
                    <div className="search-bar">
                        <input type="text" onSelect={voidHandler}/>
                    </div>
                    <button type="submit" className="search-btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" color="#f8f9fd"/>
                    </button>
                </form>
                <div className="logout-btn-container">
                    <button className="logout-btn" onClick={logout}>Выйти</button>
                </div>
            </div>
            <div className="container">
                <div className="filter-container">
                    {
                        categories.map((value) => {
                            return (
                                <Category category={value}/>
                            )
                        })
                    }
                </div>
                <div className="main-container">
                    <div className="tags-container">
                        {
                            categories.flatMap(category => toStrings(category)).map(name => {
                                return <Badge name={name}/>
                            })
                        }
                    </div>
                    <div className="cards-container">
                        <Grid className="cards-grid" columns={3} container>
                            {
                                facilities.filter(filter).map(value => {
                                    return <Grid item><FacilityCard facility={value} key={value.id}/></Grid>
                                })
                            }
                        </Grid>
                    </div>
                </div>
                <div className="right-container">
                    <h2>Право</h2>
                    <button className="pretty-button">
                        <FontAwesomeIcon icon={faPlus} size="2xl"/>
                        Добавить объект по xml
                    </button>
                    <button className="pretty-button" onClick={() => setOpen(true)}>
                        <FontAwesomeIcon icon={faPlus} size="2xl"/>
                        Добавить объект
                    </button>
                </div>
            </div>
            <CreateDialog open={open} onClose={handleClose}/>
        </div>
    )
}

export default Dashboard