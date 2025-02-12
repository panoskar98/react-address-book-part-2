import { useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DataContext from "../DataContext"
import MapWithPin from "./MapWithPin"

function ContactPreview() {
    const { contacts, setContacts } = useContext(DataContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const target = contacts.find(c => c.id === Number(id))
    console.log(target.address.geo)
    const handleDelete = (event) => {
        setContacts(contacts.filter(c => c.id !== Number(event.target.value)))
        navigate("/contacts")
    }

    return(
        <div className="contact-preview">
             <h1>{target.name}</h1>
             <ul>
                <li>City: {target.address.city}</li>
                <li>Street: {target.address.street}</li>
                <li>Zipcode: {target.address.zipcode}</li>
             </ul>
             <div className="preview-buttons">
                <button onClick={() => navigate(`/editcontact/${target.id}`)}>Edit</button>
                <button value={target.id} onClick={handleDelete}>Delete</button>
             </div>
             <div className="map-area">
             <MapWithPin longitude={target.address.geo.lng} latitude={target.address.geo.lat} />
             </div>
        </div>
    )
}
export default ContactPreview