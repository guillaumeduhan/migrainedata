"use client";

import * as React from "react";
import { Button, Grid } from "@mui/material";
import AvatarComponent from "../Avatar";
import { useAuthContext } from "@/app/context";
import { useRouter } from "next/navigation";

export default function UserHeader() {
  const router = useRouter();
  const { user, signOut } = useAuthContext();
  const logout = () => {
    signOut();
    router.push("/");
  };
  return (
    <Grid sx={{ my: 6 }} container alignItems="center">
      <Grid item sx={{ mr: 4 }}>
        <AvatarComponent size={"big"} />
      </Grid>
      {user && (
        <Grid item>
          <h1>{user.email}</h1>
          <p style={{ marginBottom: "12px" }}>{user.email}</p>
          <Button className="info border" onClick={logout}>
            Signout
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
