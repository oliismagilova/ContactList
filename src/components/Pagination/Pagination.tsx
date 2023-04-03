
export default function Pagination({ contactsPerPage, totalContacts, paginate}:any) {
    const pageNumbers=[];

    for (let i=1; i<=Math.ceil(totalContacts/contactsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul style={{position:'relative', left: '26%'}} className="pagination">{pageNumbers.map(number => (
                <li className="page-item" key={number}>
                    <a className="page-link" onClick={()=> paginate(number)}> {number}</a>
                </li>
            ))}</ul>
        </div>
    );
}