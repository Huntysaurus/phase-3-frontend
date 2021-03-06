import React from "react";
import { useState } from "react";
import EditPlant from "./EditPlant";

function PlantCard({ user, plantOwner, plantName, plantImage, plantDescription, plantLight, plantCare, plantAge, onDeletePlant, id, onUpdatePlant}) {
    const [isEditing, setIsEditing] = useState(false)
    const [updateButton, setUpdateButton] = useState(false)


    function handleDeleteClick(){
        fetch(`http://localhost:9292/plants/${id}`, {
            method: "DELETE",
        })
        onDeletePlant(id)
    }

    function handleUpdatePlant(updatedPlant){
        console.log(updatedPlant)
        setIsEditing(false)
        setUpdateButton(false)
        onUpdatePlant(updatedPlant)
    }

    function handleUpdateClick() {
        setIsEditing((isEditing) => !isEditing)
        setUpdateButton((updateButton => !updateButton))
    }

    return (
        <>
            {isEditing ? (
                <EditPlant
                plantImage={plantImage}
                plantName={plantName}
                plantAge={plantAge}
                plantDescription={plantDescription}
                id={id}
                onUpdatePlant={handleUpdatePlant}
                />
            ) : (
                <div style={{marginLeft:"25%", marginRight:"auto", marginBottom:"1%"}}>
                    <h2>{plantName}</h2>
                    <img style={{width:"20rem"}} src={plantImage} alt={plantName}/>
                    <h3>{plantDescription}</h3>
                    <ul>
                    <li>{plantLight}</li>
                    <li>{plantCare}</li>
                    <li>Age: {plantAge}</li>
                    </ul>

                </div>
                )}

                {plantOwner === user.id ? (
                <div style={{marginLeft:"25%", marginRight:"auto", marginBottom:"5%"}}>
                    <button onClick={handleDeleteClick}>delete plant</button>
                    <button onClick={handleUpdateClick}>{updateButton ? 'Cancel' : 'Update'}</button>
                </div>) : ( null)
            }
        </>
    )

}


export default PlantCard