import "/src/assets/login.css";

const Login = () => {
    return (
        <div>
            <form className = "loginForm">
                <div>
                    <input className = "loginFormInput" type = "text" placeholder = "Логин"></input>
                </div>
                <div>
                    <input className = "loginFormInput" type = "password" placeholder = "Пароль"></input>
                </div>
                <div>
                    <button className = "loginFormBtn" type = "submit">Войти</button>
                </div>

            </form>
        </div>
    );
};
export default Login