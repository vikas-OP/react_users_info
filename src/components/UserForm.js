import React, {useEffect, useState} from "react"
import csc from "country-state-city" 

const UserForm = ({match}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [line1, setLine1] = useState("")
    const [line2, setLine2] = useState("")
    const [gender, setGender] = useState("")
    const [maritalStatus, setMaritalStatus] = useState("")
    const [favouriteFood, setfavouriteFood] = useState("")
    const [favouriteColor, setFavouriteColor] = useState("")
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])


    const getUserAndUpdateForm = async (id) => {
        let response = await fetch(`https://react-users-vikas.herokuapp.com/users/${id}`)
        if(response.status >= 400){
            return
        }
        response = await response.json()
        const user = response.user
        setName(user.name)
        setEmail(user.email)
        setCity(user.city)
        setCountry(user.country)
        setState(user.state)
        setGender(user.gender)
        setLine1(user.line1)
        setLine2(user.line2)
        setFavouriteColor(user.favouriteColor)
        setfavouriteFood(user.favouriteFood)
        setMaritalStatus(user.maritalStatus)
    }

    useEffect(() => {
        const newCountries = csc.getAllCountries()
        setCountries(newCountries)
        if(match.params.id){
            getUserAndUpdateForm(match.params.id)
        }
    }, [])

    useEffect(() => {
        const newStates = csc.getStatesOfCountry(country)
        setStates(newStates)
    }, [country])

    useEffect(() => {
        const newCities = csc.getCitiesOfState(state)
        setCities(newCities)
    }, [state])

const countryOptions = countries.map((country) => <option key = {country.id} value = {country.id}>{country.name}</option>)

const stateOptions = states.map((state) => <option key = {state.id} value = {state.id}>{state.name}</option>)
const cityOptions = cities.map((city) => <option key = {city.id} value = {city.name}>{city.name}</option>)


const submitForm = async () => {
    if(!(name && email && country && state && city && line1 && line2 && gender && maritalStatus && favouriteFood && favouriteColor)){
        alert("enter all fields")
        return
    }
    const data = {
        name, email, 
        country : csc.getCountryById(country).name,
        state: csc.getStateById(state).name,
        city,
        line1, line2,
        gender,
        maritalStatus, 
        favouriteFood,
        favouriteColor
    }
    let response
    if (match.params.id) {
        response = await fetch(`https://react-users-vikas.herokuapp.com/users/${match.params.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }) 
    }
    else{
        response = await fetch("https://react-users-vikas.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }) 
    }
    response = await response.json()
    alert(response.message)
    setName("")
    setEmail("")
    setFavouriteColor("")
    setGender("")
    setLine1("")
    setLine2("")
    setMaritalStatus("")
    setState("")
    setCity("")
    setCountry("")
    setfavouriteFood("")
}

    return (
        <div className = "container d-flex justify-content-center">
            <form onSubmit = {(e) => {
                e.preventDefault()
                submitForm()
            }}>
                <label htmlFor="name">Name </label>
                <input type="text" id = "name" value = {name} onChange = {(e) => setName(e.target.value)} required className = "form-control inputs" />
                <label htmlFor="email">Email</label>
                <input type="email" id = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} required className = "form-control inputs" />
                <label htmlFor="country">Country</label>
                <select name="country" id="country" value = {country} required 
                className = "form-control inputs" onChange = {(e) => {
                    setCountry(e.target.value)
                }} >
                    <option value={null}>--</option>
                    {countryOptions}
                </select>
                <label htmlFor="state">State</label>
                <select name="state" id="state" value = {state}  required
                className = "form-control inputs" onChange = {(e) => {setState(e.target.value)
                }}>
                    <option value={null}>--</option>
                    {stateOptions}
                </select>
                <label htmlFor="city">city</label>
                <select name="city" id="city" value = {city}  required
                className = "form-control inputs" onChange = {(e) => {setCity(e.target.value)

                }} >
                    <option value={null}>--</option>
                    {cityOptions}
                </select>

                <label htmlFor="line1">Address Line 1</label>
                <input type="text" id = "line1" value = {line1} onChange = {(e) => setLine1(e.target.value)} required className = "form-control inputs" />

                <label htmlFor="line2">Address Line 2</label>
                <input type="text" id = "line2" value = {line2} onChange = {(e) => setLine2(e.target.value)} required className = "form-control inputs" />

                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" value = {gender}  required
                className = "form-control inputs" onChange = {(e) => {setGender(e.target.value)

                }} >
                    <option value={null}>--</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>

                <label htmlFor="maritalStatus">Marital Status</label>
                <select name="maritalStatus" id="maritalStatus" value = {maritalStatus}  required
                className = "form-control inputs" onChange = {(e) => {setMaritalStatus(e.target.value)

                    
                }} >
                    <option value={null}>--</option>
                    <option value="married">Married</option>
                    <option value="not married">Not Married</option>
                </select>

                 <label htmlFor="color">Favourite Color</label>
                <input type="text" id = "color" value = {favouriteColor} onChange = {(e) => setFavouriteColor(e.target.value)} required className = "form-control inputs" />

                 <label htmlFor="food">Favourite Food</label>
                <input type="text" id = "food" value = {favouriteFood} onChange = {(e) => setfavouriteFood(e.target.value)} required className = "form-control inputs" />

                <div className = "d-flex justify-content-center my-2">
                    <button type = "submit" className = "btn btn-primary">Submit</button>
                </div>
            </form>
            
        </div>
    )
}

export default UserForm