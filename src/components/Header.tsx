// @ts-nocheck
"use client";

import * as React from "react";
import { Grid, Switch, FormControlLabel } from "@mui/material";
import Logo from "@/components/Logo";
import { usePathname, useRouter } from "next/navigation";
import AvatarComponent from "./Avatar";
import { useAuthContext } from "@/app/context";

export default function Header({ switchTheme }: { switchTheme: any }) {
  const { user } = useAuthContext();

  const pathname = usePathname();
  return (
    <Grid sx={{ p: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent={pathname === "/" ? "center" : "space-between"}
        alignItems="center"
      >
        <Grid item lg={6}>
          <Logo />
        </Grid>
        <Grid
          xs={6}
          rowSpacing={1}
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          {user && (
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <FormControlLabel
                control={
                  <Switch onChange={switchTheme} name="gilad" color="primary" />
                }
                label="Night mode"
              />
              <AvatarComponent user={user} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
