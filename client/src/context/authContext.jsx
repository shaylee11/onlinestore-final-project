import * as React from "react";

export const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const [user,setUser] = React.useState(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const userString = localStorage.getItem("user");
    if(userString) {
      const loggedUser =  JSON.parse(userString);
      setUser(loggedUser);
    }
  },[])

  const handleLogin = async (auth) => {
    if (!auth.email || !auth.password) return;

    const res = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    const data = await res.json();

    if(!res.ok) {
      console.log(data.message);
      setError(data.message)
      return false;
    }
    if(res.ok) {
      console.log(data.message);
      setUser(data);
      setError("");
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    }
  };

  const handleLogout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleSignup = async (auth) => {
    const res = await fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    const data = await res.json();

    if(!res.ok) {
      console.log(data.message);
      setError(data.message);
      return false;
    }
    if(res.ok) {
      console.log(data.message);
      setUser(data);
      setError("");
    //   localStorage.setItem("user", JSON.stringify(data));
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{ error,user, handleLogin, handleSignup, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
