import React, { useState , useEffect , useReducer, useContext, useRef} from 'react';
import AuthContext from "../../Store/AuthContext"
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'

const EmailReducer = (state,action)=>{
    if(action.type === "Input_User"){
        return {value:action.val , isValid: action.val.includes('@')};
    };
    if(action.type === "Input_Blur"){
        return {value:state.value , isValid : state.value.includes('@')};
    }
    return {value:'', isValid:false };
};

const passwordReducer = (state,action)=>{
    if(action.type === "Input_User"){
        return {value:action.val , isValid:action.val.trim().length > 6}
    }
    if(action.type === "Input_Blur"){
        return {value:state.value , isValid : state.value.trim().length > 6}
    }
    return {value: '' , isValid: false};
};

const Login = (props) => {
//   const [enteredEmail, setEnteredEmail] = useState('');
//   const [emailIsValid, setEmailIsValid] = useState();
//   const [enteredPassword, setEnteredPassword] = useState('');
//   const [passwordIsValid, setPasswordIsValid] = useState();

    const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState, dispatchEmail] = useReducer(EmailReducer,{
    value:'', isValid:null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{
    value:'', isValid:null
  });

    const {isValid : emailIsValid} = emailState;
    const {isValid : passwordIsValid} = passwordState;

    useEffect(()=>{
        const indetifier = setTimeout(()=>{
            console.log('Checking Validity');
            setFormIsValid(emailIsValid && passwordIsValid);
            
        },500);
        return ()=>{
                console.log('Cleanup');
                clearTimeout(indetifier);
            };
    },[emailIsValid,passwordIsValid]);


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:'Input_User',val:event.target.value});
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({val:event.target.value , type:'Input_User'});

    // setFormIsValid(
    //   passwordState.isValid && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type:'Input_Blur'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'Input_Blur'})

  };

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
        ctx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
        emailInputRef.current.focus();
    }else{
        passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-Mail"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlue={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="Password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlue={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
