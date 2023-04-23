// @ts-nocheck

"use client";
import dayjs, { Dayjs } from "dayjs"; // Import de Dayjs et son type Dayjs
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Slider,
  Stack,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Event } from "@/types";
import { LoadingButton } from "@mui/lab";
import supabase from "../../supabase";
import { useAuthContext } from "@/app/context";

type Props = {
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Form({ setEvents, setOpen }: Props) {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false); // Ajout du type boolean
  const [error, setError] = useState<string | null>(null); // Ajout du type string | null
  const [event, setEvent] = useState<Event>({
    user_id: undefined,
    date: undefined,
    duration: 1,
    locations: [],
    symptomes: [],
    medications: [],
    count: 0,
  });

  const handleChange = (index: number, key: keyof Event) => {
    // Ajout de l'index et du type générique keyof Event
    if (event[key].includes(index)) {
      setEvent((prevState) => ({
        // Utilisation de prevState
        ...prevState,
        [key]: prevState[key].filter((x) => x !== index), // Utilisation de prevState
      }));
      return;
    }
    setEvent((prevState) => ({
      // Utilisation de prevState
      ...prevState,
      [key]: [...prevState[key], index], // Utilisation de prevState
    }));
  };

  const saveEvent = async () => {
    setError(null);
    setLoading(true);
    if (!event.date) {
      setError("You must provide a date.");
      return;
    }
    try {
      const newEvent = { ...event, user_id: user?.id }; // Ajout de l'opérateur de faculté
      const { data, error } = await supabase
        .from<Event>("events")
        .insert(newEvent); // Ajout du type générique Event
      if (data) {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEvent((prevState) => ({
      // Utilisation de prevState
      ...prevState,
      date: dayjs().format(), // Formatage de la date avec Dayjs
    }));
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 275, maxWidth: 600, mx: "auto", px: 2, py: 1, my: 2 }}
    >
      <CardContent>
        <Grid sx={{ mb: 3 }}>
          <h2>Add a new crisis</h2>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <p>When was that migraine?</p>
            <DateTimePicker
              label="Date & time"
              onChange={(newValue) =>
                setEvent({
                  ...event,
                  date: dayjs(newValue.toString()).format(),
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <p>How long did it last?</p>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <span>0</span>
              <Slider
                defaultValue={1}
                step={1}
                min={0}
                max={72}
                valueLabelDisplay="auto"
                onChange={(e) => {
                  const inputElement = e.target as HTMLInputElement;
                  setEvent({
                    ...event,
                    duration: parseInt(inputElement.value),
                  });
                }}
              />
              <span>72h</span>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <p>Evaluate your pain (from 0 to 10)</p>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <span>0</span>
              <Slider
                defaultValue={1}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                onChange={(e) => {
                  const inputElement = e.target as HTMLInputElement;
                  setEvent({
                    ...event,
                    count: parseInt(inputElement.value),
                  });
                }}
              />
              <span>10</span>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <p>Symptomes</p>
            <Grid>
              {config.symptomes.map((x, y) => (
                <FormControlLabel
                  key={y}
                  control={
                    <Checkbox
                      name={x}
                      checked={event.symptomes.includes(y)}
                      onChange={() => handleChange(y, "symptomes")}
                    />
                  }
                  label={x}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p>Location</p>
            <Grid>
              {config.locations.map((x, y) => (
                <FormControlLabel
                  key={y}
                  control={
                    <Checkbox
                      name={x}
                      checked={event.locations.includes(y)}
                      onChange={() => handleChange(y, "locations")}
                    />
                  }
                  label={x}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p>Medications</p>
            <Grid>
              {config.medications.map((x, y) => (
                <FormControlLabel
                  key={y}
                  control={
                    <Checkbox
                      name={x}
                      checked={event.medications.includes(y)}
                      onChange={() => handleChange(y, "medications")}
                    />
                  }
                  label={x}
                />
              ))}
            </Grid>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error" color="error">
                {error || "Error"}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              disabled={loading}
              style={{ marginRight: "6px" }}
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              onClick={saveEvent}
            >
              Save
            </Button>
            {loading && <LoadingButton loading />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
