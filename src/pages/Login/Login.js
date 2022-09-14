import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [valid, setValid] = useState(true);

  const navigate = useNavigate();

  // const loginValue = useRef();
  // const emailValue = useRef();

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePwInput = (e) => {
    setPw(e.target.value);
  };

  const handleKeyup = () => {
    return !email.includes("@") || pw.length < 5
      ? setValid(false)
      : setValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pw);
    const body = {
      email: email,
      password: pw,
    };

    fetch("http://localhost:8000/users/login", {
      // 모든 상황에서 응답 본문과 헤더의 내용을 보지 못하도록 차단 합니다. mode :"no-cors"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.access_token);
      });

    // navigate("/main");
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <header>
          <h1>Justgram</h1>
        </header>
        <div>
          <form className="loginForm">
            <input
              id="emailInput"
              type="text"
              value={email}
              onKeyUp={handleKeyup}
              placeholder="이메일"
              onChange={handleEmailInput}
            />
            <input
              value={pw}
              type="password"
              placeholder="비밀번호"
              onKeyUp={handleKeyup}
              onChange={handlePwInput}
            />
            <button
              type="submit"
              className={valid ? "" : "disabled"}
              id="login"
              onClick={handleSubmit}
            >
              로그인
            </button>
          </form>
        </div>
        <div className="link">
          <Link to="/signup">회원가입 하시겠습니까?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
