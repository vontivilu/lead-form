import * as React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import styles from './form.module.css';
import { useNavigate } from "react-router-dom";

interface LeadFormValues{
    firstName: string;
    lastName: string;
    email: string;
    citizenship: string;
    linkedIn: string;
    visa_category: string;
    additional_details: string;
}

function App() {
    const [leadsList, setLeads] = React.useState<LeadFormValues[]>([]);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LeadFormValues>();

    // Wrapper function to get the event object/form data
    const onHandleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formDataObject = new FormData(e.target as HTMLFormElement);
        handleSubmit(onSubmit)();
    }

    const onSubmit: SubmitHandler<LeadFormValues> = (data) =>{
        // Adding timestamp to lead item
        const leadWithTimestamp = {
        ...data,
        timestamp: new Date()
        }

        // To do: Set up Redux for state management
        const storedLeads = localStorage.getItem('leads');
        if (storedLeads) {
            let myLeads = [...JSON.parse(storedLeads)];
            myLeads.push(leadWithTimestamp);
            localStorage.setItem('leads', JSON.stringify(myLeads));
        } else{
            localStorage.setItem('leads', JSON.stringify([leadWithTimestamp]));
        }

        setLeads(prevLeads => [...prevLeads, leadWithTimestamp]);
        navigate("/thankyou");
    }

  return (
    <>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Get An Assessment Of Your Immigration Case</h1>
            </div>
            <form onSubmit={onHandleSubmit} className={styles.form}>
                <div className={styles.section}>
                    <h2>Want to understand your visa options?</h2>
                    <p>Submit the form below and our team of experienced attorneys will review your application
                        and send a preliminary assessment of your case based on your goals.
                    </p>
                </div>
                {/* To do: Validations can extend to maxLength for all fields, can also leverage Regex */}
                <div className={styles.field}>
                    <input 
                    id="firstName"
                    type="text"
                    {...register("firstName",{
                        required: "First name is required",
                        minLength: {
                            value: 3,
                            message: "First name must be at least 3 characters"
                        }
                    })}
                    className={`${styles.input} ${errors.firstName ? styles.errorInput : ""}`}
                    placeholder="First Name"
                    aria-label="firstName"
                    />
                    {errors.firstName && (
                        <span className={styles.errorMessage}>
                            {errors.firstName.message}
                        </span>
                    )}
                </div>
                <div className={styles.field}>
                    <input 
                    id="lastName"
                    type="text"
                    {...register("lastName",{
                        required: "Last name is required",
                        minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters"
                        }
                    })}
                    className={`${styles.input} ${errors.lastName ? styles.errorInput : ""}`}
                    placeholder="Last Name"
                    aria-label="lastName"
                    />
                    {errors.lastName && (
                        <span className={styles.errorMessage}>
                            {errors.lastName.message}
                        </span>
                    )}
                </div>
                <div className={styles.field}>
                    <input 
                    id="email"
                    type="text"
                    {...register("email",{
                        required: "Email is required",
                        minLength: {
                            value: 10,
                            message: "Email must be at least 10 characters"
                        }
                    })}
                    className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
                    placeholder="Email"
                    aria-label="email"
                    />
                    {errors.email && (
                        <span className={styles.errorMessage}>
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className={styles.field}>
                    <select 
                    id="citizenship"
                    {...register("citizenship" ,{ required: true })}
                    defaultValue=""
                    className={`${styles.select} ${errors.citizenship ? styles.errorInput : ""}`}
                    aria-label="country of citizenship"
                    >
                        <option value="" disabled>Country of Citizenship</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                        <option value="China">China</option>
                        <option value="India">India</option>
                    </select>
                    {errors.citizenship && (
                        <span className={styles.errorMessage}>
                            Country of Citizenship is required
                        </span>
                    )}
                </div>
                <div className={styles.field}>
                    <input 
                    id="linkedIn"
                    type="text"
                    {...register("linkedIn",{
                        required: "LinkedIn/Personal Website URL is required",
                        minLength: {
                            value: 10,
                            message: "URL must be at least 10 characters"
                        }
                    })}
                    className={`${styles.input} ${errors.linkedIn ? styles.errorInput : ""}`}
                    placeholder="LinkedIn/Personal Website URL"
                    aria-label="linkedIn"
                    />
                    {errors.linkedIn && (
                        <span className={styles.errorMessage}>
                            {errors.linkedIn.message}
                        </span>
                    )}
                </div>
                <div className={styles.section}>
                        <h2>Visa category of interest?</h2>
                </div>
                <div className={styles.field}>
                    {/* To do: Convert this into list and iterate over */}
                        <ul>
                            <li>
                                <input {...register('visa_category')} type="checkbox" name="o1" value="O-1"/>
                                <label htmlFor="o1">O-1</label>
                            </li>
                            <li>
                                <input {...register('visa_category')} type="checkbox" name="eb1a" value="EB-1A"/>
                                <label htmlFor="eb1a">EB-1A</label>
                            </li>
                            <li>
                                <input {...register('visa_category')} type="checkbox" name="eb2niw" value="EB-2 NIW"/>
                                <label htmlFor="eb2niw">EB-2 NIW</label>
                            </li>
                            <li>
                                <input {...register('visa_category')} type="checkbox" name="idk" value="I don't know"/>
                                <label htmlFor="idk">I don't know</label>
                            </li>
                        </ul>
                </div>
                <div className={styles.section}>
                        <h2>How can we help you?</h2>
                        <div className={styles.field}>
                            <textarea 
                            {...register('additional_details')}
                            id="additional_details"
                            className={styles.input}
                            placeholder="What is your current status and when does it expire?"
                            aria-label="how can we hel you?"
                            />
                        </div>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Submit
                </button>
            </form>
        </div>
    </>
  );
}

export default App;
