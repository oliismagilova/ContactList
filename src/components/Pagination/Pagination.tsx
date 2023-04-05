import { useMemo } from "react";

export default function Pagination({ contactsPerPage, totalContacts, paginate}:any) {

    const pageNumbers = useMemo(() => Array(Math.ceil(totalContacts/contactsPerPage)).fill(0).map((_, i) => i+1), [totalContacts, contactsPerPage])

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