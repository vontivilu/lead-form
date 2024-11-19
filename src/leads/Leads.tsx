import { useEffect, useState, useMemo, ChangeEvent } from 'react';
import * as React from 'react';
import styles from './leads.module.css';

interface LeadFormValues{
    firstName: string;
    lastName: string;
    email: string;
    citizenship: string;
    linkedIn: string;
    visa_category: string;
    additional_details: string;
    timestamp: string;
}

export default function Leads() {
    const [leads, setLeads] = useState<LeadFormValues[]>([]) //To do: Add interface for type checking
    const [searchByFirstName, setSearchByFirstName] = useState('')

    useEffect(()=>{
        const storedLeads = localStorage.getItem('leads');
        if(storedLeads){
            setLeads(JSON.parse(storedLeads));
        }
    }, [])

    const filteredLeads = useMemo(()=>{
        return leads.filter(item =>{
            return item.firstName.toLowerCase().indexOf(searchByFirstName.toLocaleLowerCase()) > -1;
        })
    }, [searchByFirstName, leads])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>)=>{
        setSearchByFirstName(e.target.value);
    }

  return (
    <>
        <div className={styles.container}>
            <div className={styles.sidebar}>
                {/* To do: Replace alma title with logo and gradient background */}
                <div>alma</div>
                <ul>
                    <li><a href="#">Leads</a></li>
                    <li><a href="/settings">Settings</a></li>
                </ul>
            </div>
            <div className={styles.content}>
                <h1>Leads</h1>
                <input type="text" className={styles.searchField} placeholder="Search by First Name" 
                onChange={handleSearch}/>
                {leads.length===0 ? <div><i>No leads available</i></div> : 
                <table className={styles.leadsTable}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Sumbitted</td>
                            <td>Status</td>
                            <td>Country</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredLeads && filteredLeads.map((lead, index)=>{
                                return <tr key={index}>
                                    {/* To do: Check for empty values */}
                                    <td>{lead?.firstName} {lead?.lastName}</td>
                                    <td>{lead?.timestamp}</td>
                                    <td>Pending</td>
                                    <td>{lead?.citizenship}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                }
            </div>
        </div>
    </>
  );
}
