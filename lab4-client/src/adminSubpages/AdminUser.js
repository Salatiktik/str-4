import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import classes from "../components/components.module.css"
import ModelInput from "../components/ModelInput";
import { deleteUser, createUser, updateUser } from "../http/dbAPI";


const AdminUser = ({object, refresh, mode, ...props}) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState ()


    const deleteU = () => {
        deleteUser(object.id)
        alert('User was deleted')
        refresh()
    }

    const create = async () => {
        if(email == undefined || password == undefined){
            alert('Enter all values')
        }
        else{
            await createUser(email, password, 'ADMIN')
            alert('User was created')
            refresh()
        }
    }

    const save = async  () => {
        await updateUser(object.id, email, password, 'ADMIN')
        alert('User was saved')
    }

    useEffect(()=>{
        async function setData(){
            setEmail(object.email)
            setPassword(object.password)
        }
        setData();
    },[])


    return(
        <ModelInput>
            {object.id}
            <input type = 'text' value = {email} onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
            <input type = 'password' value = {password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <input type = 'text' value='ADMIN' disabled/>
            {
                mode=='create'?(
                    <Button onClick={e => create(e)}>Create new</Button>
                ):
                (
                    <div>
                        <Button onClick={e => save(e)}>Save</Button>
                        <Button onClick={e => deleteU(e)}>Delete</Button>
                    </div>
                )
            }
        </ModelInput>
    )
}

export default AdminUser