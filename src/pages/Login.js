import React, { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { RedBnb, White } from '../theme/Colors';
import { isAdmin } from '../services/AuthService';
import Background from '../assets/login-background.jpg';
import { login } from '../services/FirebaseAuthService';
import { SecondaryButtonBnb, LinkButton } from '../views/buttons/Buttons';
import {
  CCard,
  CButton,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';

const Login = () => {
  const history = useHistory();

  const mainDivStyle = {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const leftCardStyle = {
    opacity: 0.9,
  };

  const rightCardStyle = {
    ...leftCardStyle,
    width: '44%',
    color: White,
    background: RedBnb,
  };

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      const token = await login(email, password);
      if (!(await isAdmin(token))) {
        throw { message: 'You are not a fucking admin' };
      }
      sessionStorage.setItem('token', token);
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const LoginButton = () => {
    return (
      <CButton className="px-4" style={{ background: RedBnb, color: White }} onClick={() => handleLogin()}>
        Login
      </CButton>
    );
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={mainDivStyle}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4" style={leftCardStyle}>
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">{LoginButton()}</CCol>
                      <CCol xs="6" className="text-right">
                        {LinkButton('Forgot password?')}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="py-5 d-md-down-none" style={rightCardStyle}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">{SecondaryButtonBnb('Register Now!')}</Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
