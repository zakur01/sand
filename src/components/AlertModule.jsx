import './AlertModule.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function AlertModule() {
  const { User, isAuthenticated } = useSelector((state) => state.auth);
  // const [hidden, setHidden] = useState(false);
  // function onClick() {
  //   setHidden(true);
  // }
  return (
    <div className="alert_module scale-in-center">
      <div className="alert_module-container">
        <div className="alert_module-content">
          {/* <h1>Привет, {User}...</h1> */}
          {isAuthenticated ? (
            <h1>Привет, {User}...</h1>
          ) : (
            <h1>Вы не вошли в аккаунт!</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlertModule;
