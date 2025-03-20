"use client";
import { useState, useEffect } from "react";
import FilterSidebar from "@/components/common/FilterSidebar";
import "../public/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import MobileMenu from "@/components/headers/MobileMenu";
import RootContext from "@/context/RootContext";
import BackToTop from "@/components/common/BackToTop";
import { usePathname } from "next/navigation"; // Import usePathname
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import i18n

export default function RootLayout({ children }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const pathname = usePathname(); // Get pathname directly

  useEffect(() => {
    // Check for `private` in localStorage
    if (typeof window !== "undefined") {
      const isPrivateValue = localStorage.getItem("private");
      setIsPrivate(isPrivateValue === "true");
    }

    // Import scripts only on the client side
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if needed
      });

      // Initialize WOW.js
      const { WOW } = require("wowjs");
      const wow = new WOW({
        mobile: false,
        live: false,
      });
      wow.init();
    }
  }, [pathname]);

  const handleLogin = () => {
    const { username, password } = loginState;
    if (username === "admin" && password === "delibike2024") {
      localStorage.setItem("private", "true");
      setIsPrivate(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({ ...prevState, [name]: value }));
  };

  if (!isPrivate) {
    return (
        <html lang="en">
        <body>
        <div className="login-container" style={styles.loginContainer}>
          <h1>Добро пожаловать в DeliBike</h1>
          <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginState.username}
              onChange={handleChange}
              style={styles.input}
          />
          <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginState.password}
              onChange={handleChange}
              style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>
        </div>
        </body>
        </html>
    );
  }

  return (
      <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,87.5,100..900;1,87.5,100..900&display=swap"
            rel="stylesheet"/>
      </head>
      <body>
      <I18nextProvider i18n={i18n}>
        <RootContext>
          <MobileMenu/>
          <div className="boxcar-wrapper">{children}</div>
          <FilterSidebar/>
        </RootContext>
        <BackToTop/>
      </I18nextProvider>
      </body>
      </html>
  );
}

const styles = {
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    width: "300px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};