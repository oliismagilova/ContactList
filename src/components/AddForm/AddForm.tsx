import {Form, Button} from 'react-bootstrap';
import { useState  } from 'react';


const AddForm = (props: any) => {

    const [newContact, setNewContact] = useState({
        id: 1, name: '', email: '', phone: ''
    });

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setNewContact({...newContact, [event.target.name]: event.target.value})
    }

    const {id, name, email, phone} = newContact;

    const handleSubmit = (event: React.SyntheticEvent):void => {
        event.preventDefault();
        props.add(id, name, email, phone);
       props.close();
    }
    return (
        <Form onSubmit={handleSubmit}> 
            <Form.Group> 
                <Form.Control 
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange= {onInputChange}
                required />
            </Form.Group>
            <br/>
            <Form.Group> 
                <Form.Control 
                type='text'
                placeholder='Email'
                name='email'
                value={email}
                onChange=  {onInputChange}
                required />

            </Form.Group>
            <br/>
            <Form.Group> 
                <Form.Control 
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange= {onInputChange}
                required />
            </Form.Group>
            <br/>
            <Button variant='success' className='me-1' type='submit'>  Add </Button>
            <Button variant="secondary" onClick={props.close}> Close </Button>
        </Form>
    )
}

export default AddForm;