import * as React from 'react';
import styles from '../form.module.css'
import { useNavigate } from "react-router-dom";

function Thankyou() {
    const navigate = useNavigate();
    const returnToHomePage = (event: React.MouseEvent<HTMLButtonElement>): void =>{
        navigate('/')
    } 
  return (
    <>
      <div className={styles.thankyou}>
        <h1>Thank You</h1>
        <div>Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai</div>
        <button onClick={returnToHomePage} className={styles.backButton}>
            Go Back to Homepage
        </button>
      </div>
    </>
  );
}

export default Thankyou;
