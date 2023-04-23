// @ts-nocheck
"use client";

import * as React from "react";
import { useState } from "react";
import { Alert, Button, TextField, Grid } from "@mui/material";
import Image from "next/image";
import doctor from "../../public/doctor.png";
import supabase from "../../supabase";

export default function Landing() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const login = async () => {
    if (!email) alert("Please enter a valid email");
    try {
      setLoading(true);
      let { data, error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (data) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid
      className="Landing"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <h1>Track your migraines, help doctors find a cure</h1>
        <p style={{ maxWidth: "800px", lineHeight: "1.45" }}>
          Our app helps you track your migraine events, and provides a unique
          opportunity for you to help doctors cure migraines.
        </p>
      </Grid>
      <Grid
        item
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ py: 2 }}
      >
        {!success && (
          <div>
            <TextField
              sx={{ mr: 2 }}
              size="small"
              label="me@mail.com"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" onClick={login}>
              Signup
            </Button>
          </div>
        )}
        {success && <Alert severity="info">Please check your mailbox.</Alert>}
      </Grid>
      <Grid item>
        <Image
          style={{
            maxWidth: "700px",
            width: "100%",
            height: "auto",
            margin: "auto",
          }}
          src={doctor}
          alt="doctor"
          className="pointer"
        />
      </Grid>
    </Grid>
  );
}
