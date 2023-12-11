import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import classes from "../components/components.module.css"
import ModelInput from "../components/ModelInput";
import { deleteGenre, createGenre, updateGenre } from "../http/dbAPI";


const AdminGenre = ({object, refresh, mode, ...props}) => {

    const [name, setName] = useState()


    const deleteG = () => {
        deleteGenre(object.id)
        alert('Genre was deleted')
        refresh()
    }

    const create = async () => {
        if(name == undefined){
            alert('Enter all values')
        }
        else{
            await createGenre(name)
            alert('Genre was created')
            refresh()
        }
    }

    const save = async  () => {
        await updateGenre(object.id,name)
        alert('Genre was saved')
    }

    useEffect(()=>{
        async function setData(){
            setName(object.name)
        }
        setData();
    },[])


    return(
        <ModelInput>
            {object.id}
            <input type = 'text' value = {name} onChange={(e)=>setName(e.target.value)} placeholder="name"/>
            {
                mode=='create'?(
                    <Button onClick={e => create(e)}>Create new</Button>
                ):
                (
                    <div>
                        <Button onClick={e => save(e)}>Save</Button>
                        <Button onClick={e => deleteG(e)}>Delete</Button>
                    </div>
                )
            }
        </ModelInput>
    )
}

export default AdminGenre