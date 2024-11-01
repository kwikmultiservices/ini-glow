import React from 'react';
import { User } from '../Interface/MainInterface';
import ContactUs from './ContactUsMain';
import ContactusLog from './ContactusLog';
interface props {
  user:User
}
const SupportLog: React.FC<props> = ({user}) => {
  return (
    <>
    {user?.permission !== "admin" && 
    <ContactUs hidImage4={true}/>
    }
    {user?.permission === "admin" && <ContactusLog/>}
    </>
  
  );
};

export default SupportLog;
