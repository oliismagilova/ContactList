import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ContactItem from './ContactItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regFaHeart } from '@fortawesome/free-regular-svg-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AddForm from '../AddForm/AddForm';
import Pagination from '../Pagination/Pagination'

export interface User {
    id: number
    name: string
    email: string
    phone: string
    isFavorite?: boolean
}
//adding comment to test 

const Contacts = () => {
    const [data, setData] = useState<User[]>([])
    const [colorButton] = useState('fcdf03')
    const [show, setShow] = useState<boolean>(false)
    const [favourites, setFavourites] = useState<User[]>([]);
    const [searchValue, setValue] = useState<string>('')
    const [favShow, setFavShow] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [contactsPerPage] = useState<number>(7)


    const isFind = (user: User, search: string) => {
        const { name, phone, email } = user
        return (
            name.toLowerCase().includes(searchValue.toLowerCase()) ||
            phone.includes(search) ||
            email.toLowerCase().includes(searchValue.toLowerCase())
        )
    }

    const onFilter = (array: User[], searchValue: string) => {
        return array.filter((item) => isFind(item, searchValue))
    }
    const handleFavClose = () => {
        setFavShow(false);
    }

    const handleRemove = (name: string): void => {
        const newData = data.filter((item) => item.name !== name);
        setData(newData);
    }

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }
    const addNewContact = (
        id: number,
        name: string,
        email: string,
        phone: string,
    ) => {
        setData([...data, { id, name, email, phone }])
    }
    const addToFavourite = (
        id: number,
        name: string,
        email: string,
        phone: string,
    ): void => {
        if (!clicked) {
            setFavourites([...favourites.filter(item => item.name !== name), { id, name, email, phone, isFavorite: true }])

            setData((prev) =>
                prev.map((user) => {
                    if (user.name === name) {
                        return { ...user, isFavorite: true }
                    }
                    return user
                })
            )
            setClicked(true);
        } else {
            setFavourites(item => {
                return item.filter(fav => fav.name !== name)
            })
            setData((prev) =>
                prev.map((user) => {
                    if (user.name === name) {
                        return { ...user, isFavorite: false }
                    }
                    return user
                }),
            )
            setClicked(false);

        }
    }

    const handleFavShow = () => {
        setFavShow(true);
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((value) => value.json())
            .then((data) => setData(data))
    }, [])

    const lastContactIndex = currentPage * contactsPerPage;
    const firstContactIndex = lastContactIndex - contactsPerPage;
    const currentCountry = data.slice(firstContactIndex, lastContactIndex)

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Control type='text' placeholder="Search" style={{ width: '200px', position: 'relative', left: '85%', margin: '13px' }}
                        value={searchValue} onChange={(event) => setValue(event.currentTarget.value)}
                    />
                </Form.Group>
            </Form>
            {!favShow ?
                <>
                    <h2 className='mb-3' style={{ marginLeft: '35%' }}>List of Contacts</h2>
                    {onFilter(currentCountry, searchValue).map((user: any) => {
                        return (
                            <ul style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                            >
                                <ContactItem user={user} key={user.id} />
                                <FontAwesomeIcon
                                    size="2xl"
                                    icon={user.isFavorite ? solidFaHeart : regFaHeart}
                                    style={{ color: colorButton, padding: '12px' }}
                                    type="button"
                                    onClick={() =>
                                        addToFavourite(user.id, user.name, user.email, user.phone)
                                    }

                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    size="2xl"
                                    type="button"
                                    style={{ padding: '12px' }}
                                    onClick={() => handleRemove(user.name)}
                                />
                            </ul>

                        )
                    })}
                    <Button style={{ width: 'fit-content', position: 'relative', left: '35%', margin: '12px' }}
                        onClick={handleFavShow}> Show Favourites </Button>
                    <Button
                        style={{ width: 'fit-content', position: 'relative', left: '35%' }}
                        onClick={handleShow}
                    >
                        Add New Contact
                    </Button>
                    <Pagination contactsPerPage={contactsPerPage} totalContacts={data.length} paginate={paginate} />

                </> :
                <>
                    <h2 className='mb-3' style={{ marginLeft: '35%' }}>List of Favorites</h2>
                    {onFilter(favourites, searchValue).map((user: any) => {
                        return (
                            <ul style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                            >
                                <ContactItem user={user} key={user.id} />
                            </ul>

                        )
                    }
                    )}
                    <Button variant="secondary" onClick={handleFavClose} style={{ width: '65px', position: 'relative', left: '68%' }}> Back </Button>
                </>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title> Add New Contact </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm add={addNewContact} close={handleClose} />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    )
}

export default Contacts;
