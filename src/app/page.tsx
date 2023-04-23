"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import UserHeader from "@/components/User/Header";
import Calendar from "@/components/Calendar";
import Form from "@/components/Form";
import { Event } from "@/types";
import { useAuthContext } from "./context";
import supabase from "../../supabase";

export default function Home() {
  const { user } = useAuthContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", user?.id);

      if (data) {
        setEvents(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  return (
    <Container>
      <Grid container>
        <UserHeader />
      </Grid>
      <Grid container>
        {!open && <Calendar events={events} setOpen={setOpen} />}
        {open && <Form setEvents={setEvents} setOpen={setOpen} />}
      </Grid>
    </Container>
  );
}
