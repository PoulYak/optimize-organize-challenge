import React, {useEffect, useState} from "react";
import {Badge} from "./Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Category} from "./categories/Category";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {CategoryType, toStrings} from "./categories/CategoryProps";
import CreateDialog from "./create/Tags";
import {Grid} from "@mui/material";
import {Facility, FacilityCard} from "./FacilityCard";
import {Tag} from "../TagTypes";
import {initTags, setCheckedCategory} from "../reducer";
import defaultTags, {tagNames} from "../defaultTags";
import {CardDialog} from "./card/CardDialog";
import {UploadDialog} from "./create/UploadXml";

function Dashboard() {
    const [search, setSearch] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState<Facility | null>(null);
    const categories = useSelector((state: RootState) => state.rootReducer.categories)
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchFacilities() {
            const response = await fetch("/api/facilities/")
            const body = await response.json()
            setFacilities(body.facilities)
        }

        async function fetchTags() {
            const response = await fetch("/api/tags/")
            const body = await response.json()
            const _tags: Tag[] = body.tags;
            const tags = [...defaultTags, ..._tags]
            dispatch(initTags({tags, facilities}))
        }

        fetchFacilities().then(fetchTags)
    }, []);


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const voidHandler = () => {

    };

    const logout = async () => {
        await fetch("/api/logout/", {
            method: "POST"
        })
    };

    const handleClose = () => {
        setCreateOpen(false)
    }

    const filter = (facility: Facility) => {
        if (search !== "" && !facility.address.toLowerCase().includes(search.toLowerCase())) return false;
        for (const category of categories) {
            const val = facility.tags.find(value => value.name === category.name)?.value || (facility as any)[tagNames[category.id]]
            if (category.type === CategoryType.EnumCategory) {
                const map = category.value as Map<string, boolean>
                if (Array.from(map.values()).every(value => !value)) continue;
                if (val === undefined) return false;
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
                        <input type="text" value={search} name="search_text" onSelect={voidHandler}
                               onChange={event => setSearch(event.target.value)}/>
                    </div>
                    <button type="submit" className="search-btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" color="#f8f9fd"/>
                    </button>
                </form>
                <div className="logout-btn-container">
                    <button className="pretty-button" onClick={logout}>Выйти</button>
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
                            search !== "" ? <Badge name={search} onClick={() => setSearch("")}/> : null
                        }
                        {
                            categories.flatMap(category => toStrings(category)
                                .map(value => ({category, value})))
                                .map(value => {
                                    return <Badge name={value.value} onClick={() => {
                                        if (value.category.type === CategoryType.EnumCategory) {
                                            console.log(value)
                                            console.log(value.value.split(":").pop() || "")
                                            dispatch(setCheckedCategory({
                                                category: value.category.name,
                                                value: value.value.split(":").pop() || "",
                                                isChecked: false
                                            }))
                                        }
                                    }}/>
                                })
                        }
                    </div>
                    <div className="cards-container">
                        <Grid className="cards-grid" columns={3} container rowGap={0}>
                            {
                                facilities.filter(filter).map(value => {
                                    return <Grid item><FacilityCard facility={value} key={value.id} onClick={() => setCardOpen(value)}/></Grid>
                                })
                            }
                        </Grid>
                    </div>
                </div>
                <div className="right-container">
                    <h2>Право</h2>
                    <button className="pretty-button" onClick={() => setUploadOpen(true)}>
                        <FontAwesomeIcon icon={faPlus} size="2xl"/>
                        Добавить объект по xml
                    </button>
                    <button className="pretty-button" onClick={() => setCreateOpen(true)}>
                        <FontAwesomeIcon icon={faPlus} size="2xl"/>
                        Добавить объект
                    </button>
                </div>
            </div>
            <CreateDialog open={createOpen} onClose={handleClose}/>
            <UploadDialog open={uploadOpen} onClose={() => setUploadOpen(false)}/>
            <CardDialog cardOpened={cardOpen} onClose={() => setCardOpen(null)}/>
        </div>
    )
}

export default Dashboard