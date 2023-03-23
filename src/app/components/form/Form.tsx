import { TextField,Button } from '@mui/material'
import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import context from '../../../database/dataContextApi';
import { addUser, UserData } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

const initUser: UserData = {
    id: nanoid(21),
    name: '',
    birthDay: new Date().toISOString().slice(0, 10),
    email: '',
    age: null,
}

export default function () {
    const classes = useStyles(); 
    const dispatch = useDispatch()
    const [user,setUser] = useState<UserData>(initUser)

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(addUser(user))
        setUser(initUser)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target 
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    
  return (
    <div className={classes.root}>
        <form className={classes.form}>
            <TextField
                name='name'
                className={classes.textField}
                id="outlined-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
                value={user.name}
                onChange={handleChange}
            />
            <TextField
                name='birthday'
                className={classes.textField}
                id="outlined-multiline-flexible"
                label="Birthday"
                multiline
                maxRows={4}
                value={user.birthDay}
                onChange={handleChange}
            />
            <TextField
                name='age'
                className={classes.textField}
                id="outlined-multiline-flexible"
                label="Age"
                multiline
                maxRows={4}
                value={user.age}
                onChange={handleChange}
            />
            <TextField
                name='email'
                className={classes.textField}
                id="outlined-multiline-flexible"
                label="Email"
                multiline
                maxRows={4}
                value={user.email}
                onChange={handleChange}
            />
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </form>
        <Button onClick={() => context.toggleDarkMode('dark-mode:toggle')}>Toggle dark mode</Button>
    </div>
  )
}

const useStyles = makeStyles({
    root: {
        padding: 30
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        margin: '20px 0 !important',
        width: '400px',
    }
  });
