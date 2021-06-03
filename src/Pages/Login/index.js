import React, { useState, useContext } from "react";
import jwt from "jsonwebtoken";
import { TextField, Button, Paper, Grid, Typography } from "@material-ui/core";
import { Link, useHistory, withRouter } from "react-router-dom";
import { paperStyle, btnS, btnStyle } from "./style";
import Axios from "../../Config/axios";
import { api } from "../../Config/host";
import { AuthContext } from "../../Auth/Auth-Provider";

const Login = () => {
  const history = useHistory();
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {setAuthenticated} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios().post(api + "/login", user);
      sessionStorage.setItem("Token", response.data.token);
      const token = jwt.decode(response.data.token);
      setAuthenticated(true);
      history.push(`/cliente/${token._id}`);
    } catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        const rest = err.response.data.message;
        setAuthenticated(false);
        setError(rest);
      } else {
        setError("Erro inesperado!");
      }
    }
  };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <img
              width="200"
              alt="frexco-Logo"
              src="https://frexco-images-prd.s3.amazonaws.com/uploads/2020/10/26/339c1848-47e9-4c4a-ba67-1f952737345b.png"
            />

            <p>
              Acesse a sua conta para comprar frutas, verduras e legumes direto
              do campo para você.
            </p>
          </Grid>
          <form onSubmit={handleSubmit}>
            {error}
            <TextField
              type="email"
              id="Email"
              variant="outlined"
              label="Email"
              fullWidth
              required
              style={btnStyle}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <TextField
              type="password"
              id="password"
              variant="outlined"
              label="Password"
              fullWidth
              required
              style={btnStyle}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Typography>
              <Link to="#">Esqueceu sua senha ?</Link>
            </Typography>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnS}
              fullWidth
            >
              Sign In
            </Button>

            <Typography text>
              É a sua primeira vez na nossa nova loja? O cadastro é fácil,
              rápido e só tem três passos.
            </Typography>
            <Button
              href="/create"
              style={btnS}
              color="primary"
              variant="contained"
              fullWidth
            >
              Criar conta
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default withRouter(Login);
