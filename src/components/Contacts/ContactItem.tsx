import { useState} from 'react';
import { ListGroup} from 'react-bootstrap';



const ContactItem = (props: any) => {
    const [scrollTop, setScrollTop] = useState(0);
    
    // const handleScroll = (event: any) => {
    //     setScrollTop(event.currentTarget.scrollTop);
    // };

    return (
        <div 
            // onScroll={handleScroll}
        >
            <ListGroup style={{ width: '40rem', margin: '12px' }}>
                <ListGroup.Item> {props.user.name}, {props.user.email}, {props.user.phone}
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default ContactItem;