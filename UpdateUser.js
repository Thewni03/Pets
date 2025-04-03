import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function UpdateUser() {

  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() =>{
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5008/dogs/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);
  
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5008/dogs/${id}`, {
        Petname: String(inputs.Petname),
        Species: String(inputs.Species),
        Age: Number(inputs.Age),
        Gender: String(inputs.Gender),
        Breed: String(inputs.Breed),
        Bday: Date(inputs.Bday),
        Address: String(inputs.Address),
        Num: Number(inputs.Num),
        
      })
      .then((res) => res.data);
  };

  const handleChange =(e)=>{
    setInputs((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>
    history("/petdetails"));
  };

  


  
  return (
    <div>
      <h1>Update pet details</h1>
      <form onSubmit={handleSubmit}>
          <label>Pet name</label>
          <br />
          <input type="text" name="Petname" onChange={handleChange} value={inputs.Petname} required></input>
          <br></br>
          <br></br>
          <label>Species</label>
          <input type="text" name="Species" onChange={handleChange} value={inputs.Species} required></input>
          <br></br>
          <br></br>
          <label>Age</label>
          <input type="Number" name="Age" onChange={handleChange} value={inputs.Age} required></input>
          <br></br>
          <br></br>
          <label>Gender</label>
          <input type="text" name="Gender" onChange={handleChange} value={inputs.Gender} required></input>
          <br></br>
          <br></br>
          <label>Breed</label>
          <input type="text" name="Breed" onChange={handleChange} value={inputs.Breed} required></input>
          <br></br>
          <br></br>
          <label>Date Of Birth</label>
          <input type="date" name="Bday" onChange={handleChange} value={inputs.Bday} required ></input>
          <br></br>
          <br></br>
          <label>Address</label>
          <input type="text" name="Address" onChange={handleChange} value={inputs.Address} required></input>
          <br></br>
          <br></br>
          <label>Mobile Number of the owner</label>
          <input type="Number" name="Num" onChange={handleChange} value={inputs.Num} required></input>
          <br></br>
          <br></br>
          <button>Submit</button>
        </form>

    </div>
  )
}

export default UpdateUser
